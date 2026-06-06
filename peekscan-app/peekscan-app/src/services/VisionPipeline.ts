import { type Frame } from 'react-native-vision-camera';
import PeekScanVisionModule from '../../modules/peekscan-vision';

export interface PreprocessingOptions {
  claheEnabled: boolean;
  dehazeEnabled: boolean;
  unsharpMaskEnabled: boolean;
  sharpenAmount: number;
}

export interface ScanResult {
  data: string;
  type: string;
  source: string;
}

export const VisionPipeline = {
  /**
   * Scans a frame using the native vision pipeline.
   * This is designed to be used within useFrameProcessor.
   */
  async scanFrame(frame: Frame, options: PreprocessingOptions): Promise<ScanResult | null> {
    'worklet';
    
    // In a real build, we would use the native frame processor plugin:
    // const result = __peekscan(frame, options); 
    // For now, we provide the bridge to the module's scanImage if needed for single shots
    
    return null;
  },

  /**
   * Preprocesses a frame using the specified options.
   */
  async preprocessFrame(frame: Frame, options: PreprocessingOptions): Promise<Frame> {
    'worklet';
    return frame;
  },

  /**
   * Decodes a barcode from a preprocessed frame.
   */
  async decodeBarcode(frame: Frame): Promise<string | null> {
    'worklet';
    return null;
  }
};
