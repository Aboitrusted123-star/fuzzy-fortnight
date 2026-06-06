import qrcode
import barcode
from barcode.writer import ImageWriter
import cv2
import numpy as np
import os
import io

def generate_test_images(output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    def create_qr(data):
        qr = qrcode.QRCode(version=1, box_size=10, border=4)
        qr.add_data(data)
        qr.make(fit=True)
        img = np.array(qr.make_image(fill_color="black", back_color="white").convert('RGB'))
        return cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    def create_barcode(data, type='code128'):
        if type == 'code128':
            bc_class = barcode.get_barcode_class('code128')
        elif type == 'upca':
            bc_class = barcode.get_barcode_class('upca')
        elif type == 'ean13':
            bc_class = barcode.get_barcode_class('ean13')
        else:
            bc_class = barcode.get_barcode_class('code128')
        
        rv = io.BytesIO()
        bc_class(data, writer=ImageWriter()).write(rv)
        rv.seek(0)
        img_arr = np.frombuffer(rv.read(), np.uint8)
        img = cv2.imdecode(img_arr, cv2.IMREAD_COLOR)
        return img

    codes = [
        ("QR", create_qr("PeekScan-QR-Test")),
        ("C128", create_barcode("PS-12345678", 'code128')),
        ("UPCA", create_barcode("123456789012", 'upca')),
        ("EAN13", create_barcode("1234567890123", 'ean13')),
    ]

    def apply_obstruction(img, obs_type):
        h, w, _ = img.shape
        if obs_type == "clear_tape":
            # Blurry center strip
            overlay = img.copy()
            cv2.rectangle(overlay, (0, h//3), (w, 2*h//3), (200, 200, 200), -1)
            img = cv2.addWeighted(img, 0.8, overlay, 0.2, 0)
            img[h//3:2*h//3, :] = cv2.GaussianBlur(img[h//3:2*h//3, :], (7, 7), 0)
        elif obs_type == "frosted_tape":
            overlay = img.copy()
            cv2.rectangle(overlay, (0, h//4), (w, 3*h//4), (230, 230, 230), -1)
            img = cv2.addWeighted(img, 0.5, overlay, 0.5, 0)
            img[h//4:3*h//4, :] = cv2.GaussianBlur(img[h//4:3*h//4, :], (15, 15), 0)
        elif obs_type == "shrink_wrap_tight":
            # High frequency noise and some glare lines
            noise = np.random.normal(0, 10, img.shape).astype(np.uint8)
            img = cv2.add(img, noise)
            for _ in range(3):
                y = np.random.randint(0, h)
                cv2.line(img, (0, y), (w, y+np.random.randint(-20, 20)), (255, 255, 255), 2)
        elif obs_type == "shrink_wrap_wrinkled":
            # Local distortions
            for _ in range(30):
                x, y = np.random.randint(0, w-30), np.random.randint(0, h-30)
                img[y:y+30, x:x+30] = np.roll(img[y:y+30, x:x+30], np.random.randint(-8, 8), axis=0)
        elif obs_type == "glint_overhead":
            # More realistic glint: smaller and slightly transparent at edges
            overlay = img.copy()
            cv2.circle(overlay, (w//2, h//2), min(w,h)//8, (255, 255, 255), -1)
            img = cv2.addWeighted(img, 0.7, overlay, 0.3, 0)
            img = cv2.GaussianBlur(img, (21, 21), 0)
        elif obs_type == "glint_side":
            overlay = img.copy()
            cv2.ellipse(overlay, (w, h//2), (w//4, h//6), 0, 0, 360, (255, 255, 255), -1)
            img = cv2.addWeighted(img, 0.7, overlay, 0.3, 0)
            img = cv2.GaussianBlur(img, (31, 31), 0)
        elif obs_type == "dim_light":
            img = (img.astype(np.float32) * 0.2).astype(np.uint8)
        elif obs_type == "tamper_seal":
            # Semi-opaque pattern
            pattern = np.zeros((h, w, 3), dtype=np.uint8)
            for i in range(0, h, 20):
                cv2.line(pattern, (0, i), (w, i), (100, 100, 100), 2)
            img = cv2.addWeighted(img, 0.7, pattern, 0.3, 0)
        
        return img

    obstructions = [
        "clear_tape", "frosted_tape", "shrink_wrap_tight", "shrink_wrap_wrinkled",
        "glint_overhead", "glint_side", "dim_light", "tamper_seal"
    ]

    count = 1
    for code_name, code_img in codes:
        # Clean version
        cv2.imwrite(os.path.join(output_dir, f"{count:02d}_{code_name}_clean.png"), code_img)
        count += 1
        
        # Apply obstructions
        for obs in obstructions:
            obs_img = apply_obstruction(code_img.copy(), obs)
            cv2.imwrite(os.path.join(output_dir, f"{count:02d}_{code_name}_{obs}.png"), obs_img)
            count += 1

generate_test_images("/home/team/shared/peekscan-vision/test_images")
print("Generated 36 test images.")
