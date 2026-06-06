#include "PeekScanVision.h"
#include <iostream>

int main(int argc, char** argv) {
    if (argc < 2) {
        std::cout << "Usage: " << argv[0] << " <image_path>" << std::endl;
        return -1;
    }

    std::string image_path = argv[1];
    cv::Mat image = cv::imread(image_path);
    if (image.empty()) {
        std::cerr << "Could not open or find the image: " << image_path << std::endl;
        return -1;
    }

    peekscan::PeekScanVision detector;
    auto result = detector.detect_and_decode(image);

    if (result.first.empty()) {
        std::cout << "Best Stage: " << result.second << std::endl;
        std::cout << "No code detected." << std::endl;
    } else {
        std::cout << "Best Stage: " << result.second << std::endl;
        for (const auto& res : result.first) {
            std::cout << "Type: " << res.type << ", Data: " << res.data << std::endl;
        }
    }

    return 0;
}
