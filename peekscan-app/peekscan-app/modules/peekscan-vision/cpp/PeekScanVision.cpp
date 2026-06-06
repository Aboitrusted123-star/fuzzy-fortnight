#include "PeekScanVision.h"

namespace peekscan {

PeekScanVision::PeekScanVision() {
    clahe = cv::createCLAHE(3.0, cv::Size(8, 8));
}

PeekScanVision::~PeekScanVision() {}

cv::Mat PeekScanVision::dehaze(const cv::Mat& gray, int neighborhood) {
    cv::Mat dark_channel;
    cv::Mat kernel = cv::getStructuringElement(cv::MORPH_RECT, cv::Size(neighborhood, neighborhood));
    cv::erode(gray, dark_channel, kernel);

    double min_val, max_val;
    cv::minMaxLoc(dark_channel, &min_val, &max_val);
    double A = max_val;
    if (A == 0) A = 1.0;

    cv::Mat t;
    dark_channel.convertTo(t, CV_32F);
    t = 1.0f - 0.95f * (t / (float)A);
    cv::max(t, 0.1f, t);

    cv::Mat gray_f;
    gray.convertTo(gray_f, CV_32F);
    
    cv::Mat recovered = (gray_f - (float)A) / t + (float)A;
    cv::Mat result;
    recovered.convertTo(result, CV_8U);
    return result;
}

cv::Mat PeekScanVision::preprocess(const cv::Mat& image, 
                                  double clahe_clip, 
                                  int adaptive_block, 
                                  int adaptive_c, 
                                  bool use_dehaze,
                                  bool glint_reduction) {
    cv::Mat gray;
    if (image.channels() == 3) {
        cv::cvtColor(image, gray, cv::COLOR_BGR2GRAY);
    } else {
        gray = image.clone();
    }

    if (glint_reduction) {
        cv::Mat background;
        cv::Mat kernel = cv::getStructuringElement(cv::MORPH_RECT, cv::Size(21, 21));
        cv::morphologyEx(gray, background, cv::MORPH_CLOSE, kernel);
        cv::GaussianBlur(background, background, cv::Size(51, 51), 0);
        cv::addWeighted(gray, 1, background, -1, 255, gray);
        cv::normalize(gray, gray, 0, 255, cv::NORM_MINMAX);
    }

    if (use_dehaze) {
        gray = dehaze(gray);
    }

    clahe->setClipLimit(clahe_clip);
    cv::Mat enhanced;
    clahe->apply(gray, enhanced);

    cv::Mat denoised;
    cv::bilateralFilter(enhanced, denoised, 9, 75, 75);

    cv::Mat sharp_kernel = (cv::Mat_<float>(3,3) << -1, -1, -1, -1, 9, -1, -1, -1, -1);
    cv::Mat sharpened;
    cv::filter2D(denoised, sharpened, -1, sharp_kernel);

    cv::Mat binary;
    cv::adaptiveThreshold(sharpened, binary, 255, cv::ADAPTIVE_THRESH_GAUSSIAN_C, 
                         cv::THRESH_BINARY, adaptive_block, adaptive_c);
    return binary;
}

std::vector<PeekScanVision::DecodeResult> PeekScanVision::try_decode(const cv::Mat& img) {
    std::vector<DecodeResult> results;
    std::string data = qr_detector.detectAndDecode(img);
    if (!data.empty()) {
        results.push_back({"QRCODE", data});
    }
    return results;
}

std::pair<std::vector<PeekScanVision::DecodeResult>, std::string> 
PeekScanVision::detect_and_decode(const cv::Mat& image) {
    // 1. Try original
    auto res = try_decode(image);
    if (!res.empty()) return {res, "original"};

    // 2. Iterative preprocessing
    struct Strategy { bool dehaze; bool glint; };
    std::vector<Strategy> strategies = {
        {false, false}, {true, false}, {false, true}, {true, true}
    };

    for (const auto& s : strategies) {
        for (double c : {2.0, 5.0}) {
            for (int b : {15, 31, 61, 91}) {
                cv::Mat processed = preprocess(image, c, b, 2, s.dehaze, s.glint);
                res = try_decode(processed);
                if (!res.empty()) {
                    return {res, "glint_" + std::to_string(s.glint) + "_dehaze_" + std::to_string(s.dehaze)};
                }
                
                cv::Mat inverted;
                cv::bitwise_not(processed, inverted);
                res = try_decode(inverted);
                if (!res.empty()) {
                    return {res, "inverted_glint_" + std::to_string(s.glint)};
                }
            }
        }
    }

    return {{}, ""};
}

} // namespace peekscan
