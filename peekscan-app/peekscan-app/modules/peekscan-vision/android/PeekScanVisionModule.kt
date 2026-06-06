package expo.modules.peekscanvision

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class PeekScanVisionModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("PeekScanVision")

    // The logic is mainly in C++ called via Frame Processor
    // This module provides a simple sync/async test method
    Function("scanImage") { base64: String ->
      // Bridge to C++ would go here
      mapOf(
        "success" to true,
        "codes" to listOf<Map<String, String>>()
      )
    }
  }
}
