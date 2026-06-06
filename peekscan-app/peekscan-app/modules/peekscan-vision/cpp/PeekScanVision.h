#ifndef PEEKSCAN_VISION_H
#define PEEKSCAN_VISION_H

#include <opencv2/opencv.hpp>
#include <vector>
#include <string>

namespace peekscan {

class PeekScanVision {
public:
    PeekScanVision();
    virtual ~PeekScanVision();

    cv::Mat dehaze(const cv::Mat& gray, int neighborhood = 15);
    
    cv::Mat preprocess(const cv::Mat& image, 
                      double clahe_clip = 3.0, 
                      int adaptive_block = 11, 
                      int adaptive_c = 2, 
                      bool use_dehaze = false,
                      bool glint_reduction = false);

    struct DecodeResult {
        std::string type;
        std::string data;
    };

    std::pair<std::vector<DecodeResult>, std::string> detect_and_decode(const cv::Mat& image);

private:
    cv::Ptr<cv::CLAHE> clahe;
    cv::QRCodeDetector qr_detector;
    
    std::vector<DecodeResult> try_decode(const cv::Mat& img);
};

} // namespace peekscan

#endif // PEEKSCAN_VISION_H
