/*
 * PeekScanFrameProcessor.cpp
 * 
 * This is a template for the VisionCamera Frame Processor Plugin.
 * The Mobile App Engineer should integrate this into the native build.
 */

#include <jsi/jsi.h>
#include <VisionCamera/FrameProcessorPlugin.h>
#include <VisionCamera/Frame.h>
#include "PeekScanVision.h"

namespace peekscan {

using namespace facebook;
using namespace mrousavy;

class PeekScanFrameProcessorPlugin: public FrameProcessorPlugin {
public:
  PeekScanFrameProcessorPlugin() : FrameProcessorPlugin("peekscan") {}

  jsi::Value callback(jsi::Runtime& runtime,
                      const jsi::Value& thisValue,
                      const jsi::Value* arguments,
                      size_t count) override {
    if (count < 1) {
      return jsi::Value::undefined();
    }

    auto frame = arguments[0].asObject(runtime).asHostObject<Frame>(runtime);
    
    // Convert VisionCamera Frame to cv::Mat
    // This is platform-dependent and usually handled by VisionCamera's internal helpers
    // or by accessing the underlying buffer (YUV/RGB).
    cv::Mat mat; 
    // Example: mat = frame->toMat(); 

    // Run our vision pipeline
    auto result = detector.detect_and_decode(mat);

    // Convert results to JSI Array of Objects
    jsi::Object jsiResult(runtime);
    jsi::Array codes(runtime, result.first.size());
    
    for (size_t i = 0; i < result.first.size(); i++) {
      jsi::Object code(runtime);
      code.setProperty(runtime, "type", jsi::String::createFromUtf8(runtime, result.first[i].type));
      code.setProperty(runtime, "data", jsi::String::createFromUtf8(runtime, result.first[i].data));
      codes.setValueAtIndex(runtime, i, code);
    }
    
    jsiResult.setProperty(runtime, "codes", codes);
    jsiResult.setProperty(runtime, "source", jsi::String::createFromUtf8(runtime, result.second));

    return jsi::Value(std::move(jsiResult));
  }

private:
  PeekScanVision detector;
};

} // namespace peekscan
