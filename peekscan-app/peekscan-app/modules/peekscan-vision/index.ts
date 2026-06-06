import { NativeModule, requireNativeModule } from 'expo-modules-core';

interface PeekScanVisionModule extends NativeModule {
  scanImage(base64: String): Promise<{
    success: boolean;
    codes: { type: string; data: string }[];
  }>;
}

export default requireNativeModule<PeekScanVisionModule>('PeekScanVision');
