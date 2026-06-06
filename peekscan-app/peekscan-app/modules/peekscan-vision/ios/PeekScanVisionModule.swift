import ExpoModulesCore

public class PeekScanVisionModule: Module {
  public func definition() -> ModuleDefinition {
    Name("PeekScanVision")

    Function("scanImage") { (base64: String) -> [String: Any] in
      // Bridge to C++ would go here
      return [
        "success": true,
        "codes": []
      ]
    }
  }
}
