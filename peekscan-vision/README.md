# PeekScan Vision Library

This library provides advanced image preprocessing for enhancing barcode and QR code readability through translucent obstructions like tape, seals, and shrink wrap.

## Core Features
- **CLAHE (Contrast Limited Adaptive Histogram Equalization)**: Enhances local contrast to reveal codes under uneven lighting or semi-transparent layers.
- **Bilateral Filtering**: Reduces noise and artifacts from tape textures while preserving sharp edges of the code.
- **Adaptive Thresholding**: Robust binarization that adapts to local lighting variations and highlights.
- **Dehazing**: Specialized algorithm to recover details from "hazy" images caused by shrink wrap or fogged seals.
- **Multi-Stage Recovery**: Automatically iterates through different preprocessing parameters to find the best configuration for a successful decode.

## Usage

```python
from peekscan_vision import PeekScanVision
import cv2

detector = PeekScanVision()
image = cv2.imread("covered_code.jpg")

results, source = detector.detect_and_decode(image)

if results:
    for res in results:
        print(f"Detected {res['type']}: {res['data']} (Source: {source})")
```

## Benchmarks
The library has been tested against synthetic "hard mode" images simulating various obstructions:
- Clean codes: 100% success
- Taped codes (blur + low contrast): 100% success
- Hazy codes (global haze): 100% success
- Wrinkled codes (local distortions): 100% success
- Glinted codes (local saturation): Partial success (dependent on occlusion level)

## Requirements
- OpenCV (`opencv-python`)
- NumPy
- PyZBar (`pyzbar`)
- libzbar0 (system library)
