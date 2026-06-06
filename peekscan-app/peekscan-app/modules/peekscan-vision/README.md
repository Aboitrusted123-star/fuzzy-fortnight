# PeekScan Vision Native Module

This module provides high-performance image preprocessing for barcode scanning using OpenCV C++.

## Structure
- `cpp/`: Core C++ vision pipeline (`PeekScanVision.h/cpp`) and VisionCamera plugin template.
- `android/`: Kotlin wrapper for Expo Modules API.
- `ios/`: Swift wrapper for Expo Modules API.
- `index.ts`: TypeScript interface.

## Integration for Mobile Engineer

### 1. Link OpenCV
You need to add OpenCV to your project's native dependencies.
- **Android**: Add `implementation project(':opencv')` or include the OpenCV SDK in `build.gradle`.
- **iOS**: Add `opencv2.framework` to your Xcode project.

### 2. Register Frame Processor Plugin
If using `react-native-vision-camera`, you should register the `PeekScanFrameProcessorPlugin` in your native app initialization.

### 3. Usage in React Native
To use this module in your `CameraView` component, import the service and call it within the frame processor.

```typescript
import { useFrameProcessor } from 'react-native-vision-camera';
import { VisionPipeline } from '../services/VisionPipeline';

// ... inside your component
const frameProcessor = useFrameProcessor((frame) => {
  'worklet';
  
  // Note: For best performance, we use a C++ Frame Processor Plugin
  // which is faster than calling a JS native module async.
  // The provided C++ code includes a template for this.
}, []);
```

### 4. Synthetic Test Suite
To verify the vision logic without a physical device, you can use the C++ test utility against the synthetic images generated in the vision prototype:

```bash
# From the modules/peekscan-vision/cpp directory
g++ PeekScanVision.cpp test_vision.cpp -o test_vision $(pkg-config --cflags --libs opencv4)
./test_vision /home/team/shared/peekscan-vision/test_images/03_hazy.png
```

This will confirm that the preprocessing stages (CLAHE, Dehazing, etc.) correctly reveal the code for the decoder.
