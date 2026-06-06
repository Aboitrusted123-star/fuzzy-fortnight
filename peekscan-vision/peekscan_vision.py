import cv2
import numpy as np
from pyzbar.pyzbar import decode
import os

class PeekScanVision:
    def __init__(self):
        self.qr_detector = cv2.QRCodeDetector()

    def dehaze(self, gray, neighborhood=15):
        kernel = np.ones((neighborhood, neighborhood), np.uint8)
        dark_channel = cv2.erode(gray, kernel)
        A = float(np.max(dark_channel))
        if A == 0: A = 1.0
        t = 1.0 - 0.95 * (dark_channel / A)
        t = np.maximum(t, 0.1)
        recovered = (gray.astype(np.float32) - A) / t + A
        return np.uint8(np.clip(recovered, 0, 255))

    def inpaint_glint(self, gray, threshold=240):
        # Create a mask of saturated areas
        _, mask = cv2.threshold(gray, threshold, 255, cv2.THRESH_BINARY)
        # Dilate mask to cover the edges of the glint
        kernel = np.ones((5, 5), np.uint8)
        mask = cv2.dilate(mask, kernel, iterations=2)
        # Inpaint
        inpainted = cv2.inpaint(gray, mask, 3, cv2.INPAINT_TELEA)
        return inpainted

    def mask_glint(self, gray, threshold=245):
        mask = gray > threshold
        gray_masked = gray.copy()
        gray_masked[mask] = 127 # Neutral gray
        return gray_masked

    def preprocess(self, image, clahe_clip=3.0, adaptive_block=11, adaptive_c=2, use_dehaze=False, glint_reduction=False, use_inpaint=False, use_masking=False):
        if len(image.shape) == 3:
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        else:
            gray = image.copy()

        if use_masking:
            gray = self.mask_glint(gray)

        if use_inpaint:
            gray = self.inpaint_glint(gray)

        if glint_reduction:
            # Better glint/illumination compensation
            # Estimate background using a large morphological closing
            kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (41, 41))
            background = cv2.morphologyEx(gray, cv2.MORPH_CLOSE, kernel)
            background = cv2.GaussianBlur(background, (81, 81), 0)
            
            # Divide to normalize illumination (Retinex-like)
            background = np.maximum(background, 1)
            gray = cv2.divide(gray, background, scale=255)
            gray = cv2.medianBlur(gray, 3)
            gray = cv2.normalize(gray, None, 0, 255, cv2.NORM_MINMAX)

        if use_dehaze:
            gray = self.dehaze(gray)

        clahe = cv2.createCLAHE(clipLimit=clahe_clip, tileGridSize=(8, 8))
        enhanced = clahe.apply(gray)
        
        # Better noise reduction for low light
        denoised = cv2.bilateralFilter(enhanced, 9, 75, 75)
        
        kernel = np.array([[-1,-1,-1], [-1,9,-1], [-1,-1,-1]])
        sharpened = cv2.filter2D(denoised, -1, kernel)

        binary = cv2.adaptiveThreshold(
            sharpened, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
            cv2.THRESH_BINARY, adaptive_block, adaptive_c
        )
        return binary

    def try_decode(self, img):
        # Try pyzbar
        results = decode(img)
        if results:
            return [{"type": r.type, "data": r.data.decode("utf-8")} for r in results]
        
        # Try OpenCV QRCodeDetector
        data, points, _ = self.qr_detector.detectAndDecode(img)
        if data:
            return [{"type": "QRCODE", "data": data}]
            
        return []

    def detect_and_decode(self, image):
        # 1. Try original
        res = self.try_decode(image)
        if res: return res, "original"

        # 2. Try iterative preprocessing
        # Strategies: (use_dehaze, glint_reduction, use_inpaint, use_masking)
        strategies = [
            (False, False, False, False), # standard
            (True, False, False, False),  # dehaze only
            (False, True, False, False),  # glint reduction only
            (False, False, True, False),  # inpaint only
            (False, False, False, True),  # masking only
            (True, True, False, False),   # dehaze + glint
            (True, False, True, False),   # dehaze + inpaint
            (False, True, False, True),   # glint + masking
        ]
        
        for dehaze_flag, glint_flag, inpaint_flag, mask_flag in strategies:
            for clip in [2.0, 5.0]: 
                for block in [11, 21, 51, 91]: # Included smaller and larger blocks
                    processed = self.preprocess(image, clahe_clip=clip, adaptive_block=block, 
                                              use_dehaze=dehaze_flag, glint_reduction=glint_flag, 
                                              use_inpaint=inpaint_flag, use_masking=mask_flag)
                    res = self.try_decode(processed)
                    if res:
                        return res, f"g{glint_flag}_d{dehaze_flag}_i{inpaint_flag}_m{mask_flag}_c{clip}_b{block}"
                    
                    # Try with inversion
                    res = self.try_decode(cv2.bitwise_not(processed))
                    if res:
                        return res, f"inv_g{glint_flag}_d{dehaze_flag}_i{inpaint_flag}_m{mask_flag}_c{clip}_b{block}"

        # 3. Try Morphological (Erosion for 1D barcodes)
        for clip in [3.0, 5.0]:
            processed = self.preprocess(image, clahe_clip=clip, adaptive_block=31)
            # Thicken vertical bars
            thickened = cv2.erode(processed, np.ones((1, 2), np.uint8), iterations=1)
            res = self.try_decode(thickened)
            if res: return res, f"thickened_c{clip}"
            
            # Thicken more
            thickened = cv2.erode(processed, np.ones((1, 3), np.uint8), iterations=1)
            res = self.try_decode(thickened)
            if res: return res, f"thickened_v2_c{clip}"

        return [], None

def run_benchmarks(test_dir):
    detector = PeekScanVision()
    files = sorted([f for f in os.listdir(test_dir) if f.endswith(".png")])
    
    total = len(files)
    success = 0
    
    print(f"{'File':<20} | {'Status':<10} | {'Source':<20}")
    print("-" * 55)
    
    for f in files:
        path = os.path.join(test_dir, f)
        img = cv2.imread(path)
        results, source = detector.detect_and_decode(img)
        
        status = "SUCCESS" if results else "FAILED"
        if results:
            success += 1
            
        print(f"{f:<20} | {status:<10} | {str(source):<20}")
        
    print("-" * 55)
    print(f"Total Success: {success}/{total} ({success/total*100:.1f}%)")

if __name__ == "__main__":
    test_dir = "/home/team/shared/peekscan-vision/test_images"
    if not os.path.exists(test_dir):
        print(f"Error: {test_dir} does not exist.")
    else:
        run_benchmarks(test_dir)
