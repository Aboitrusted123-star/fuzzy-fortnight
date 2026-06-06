import cv2
import numpy as np
import os
import json
import time
from peekscan_vision import PeekScanVision

def run_benchmarks(test_dir, report_path):
    detector = PeekScanVision()
    files = sorted([f for f in os.listdir(test_dir) if f.endswith(".png")])
    
    results_list = []
    total = len(files)
    success_count = 0
    
    for f in files:
        path = os.path.join(test_dir, f)
        img = cv2.imread(path)
        
        start_time = time.time()
        results, source = detector.detect_and_decode(img)
        end_time = time.time()
        
        status = "SUCCESS" if results else "FAILED"
        if results:
            success_count += 1
            
        results_list.append({
            "file": f,
            "status": status,
            "source": source,
            "time_ms": round((end_time - start_time) * 1000, 2),
            "data": results[0]["data"] if results else None
        })
        
    report = {
        "timestamp": time.ctime(),
        "total": total,
        "success": success_count,
        "accuracy": round(success_count / total * 100, 2),
        "results": results_list
    }
    
    with open(report_path, "w") as f:
        json.dump(report, f, indent=4)
        
    print(f"Benchmark complete. Accuracy: {report['accuracy']}%")
    print(f"Report saved to {report_path}")

if __name__ == "__main__":
    run_benchmarks("/home/team/shared/peekscan-vision/test_images", "/home/team/shared/peekscan-vision/benchmark_report.json")
