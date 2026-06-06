import cv2
import os
import time
import json
from peekscan_vision import PeekScanVision

def run_benchmark(test_dir, output_json, output_html):
    detector = PeekScanVision()
    files = sorted([f for f in os.listdir(test_dir) if f.endswith(".png")])
    
    results = []
    total = len(files)
    success_count = 0
    
    print(f"Benchmarking {total} images...")
    
    for f in files:
        path = os.path.join(test_dir, f)
        img = cv2.imread(path)
        
        start_time = time.time()
        decode_results, source = detector.detect_and_decode(img)
        end_time = time.time()
        
        duration_ms = (end_time - start_time) * 1000
        status = "SUCCESS" if decode_results else "FAILED"
        
        if decode_results:
            success_count += 1
            
        # Parse metadata from filename
        parts = f.replace(".png", "").split("_")
        code_type = parts[1] if len(parts) > 1 else "Unknown"
        obstruction = "_".join(parts[2:]) if len(parts) > 2 else "None"
        
        results.append({
            "file": f,
            "code_type": code_type,
            "obstruction": obstruction,
            "status": status,
            "source": source,
            "time_ms": round(duration_ms, 2),
            "data": decode_results[0]["data"] if decode_results else None
        })
        print(f"Processed {f}: {status} ({duration_ms:.2f}ms)")

    accuracy = (success_count / total) * 100
    report = {
        "summary": {
            "total": total,
            "success": success_count,
            "accuracy": round(accuracy, 2),
            "avg_time_ms": round(sum(r["time_ms"] for r in results) / total, 2)
        },
        "results": results
    }
    
    with open(output_json, 'w') as f_json:
        json.dump(report, f_json, indent=4)
        
    # Generate HTML
    html_content = f"""
    <html>
    <head>
        <title>PeekScan Vision Benchmark Report</title>
        <style>
            body {{ font-family: sans-serif; margin: 20px; }}
            table {{ border-collapse: collapse; width: 100%; }}
            th, td {{ border: 1px solid #ddd; padding: 8px; text-align: left; }}
            th {{ background-color: #f2f2f2; }}
            tr:nth-child(even) {{ background-color: #f9f9f9; }}
            .SUCCESS {{ color: green; font-weight: bold; }}
            .FAILED {{ color: red; font-weight: bold; }}
            .summary {{ background: #eee; padding: 15px; border-radius: 5px; margin-bottom: 20px; }}
        </style>
    </head>
    <body>
        <h1>PeekScan Vision Benchmark Report</h1>
        <div class="summary">
            <h2>Summary</h2>
            <p>Total Images: {report['summary']['total']}</p>
            <p>Success: {report['summary']['success']}</p>
            <p>Accuracy: {report['summary']['accuracy']}%</p>
            <p>Avg Time: {report['summary']['avg_time_ms']}ms</p>
        </div>
        <table>
            <tr>
                <th>File</th>
                <th>Code Type</th>
                <th>Obstruction</th>
                <th>Status</th>
                <th>Strategy</th>
                <th>Time (ms)</th>
            </tr>
    """
    
    for r in results:
        html_content += f"""
            <tr>
                <td>{r['file']}</td>
                <td>{r['code_type']}</td>
                <td>{r['obstruction']}</td>
                <td class="{r['status']}">{r['status']}</td>
                <td>{r['source']}</td>
                <td>{r['time_ms']}</td>
            </tr>
        """
        
    html_content += """
        </table>
    </body>
    </html>
    """
    
    with open(output_html, 'w') as f_html:
        f_html.write(html_content)
        
    print(f"Benchmark report saved to {output_json} and {output_html}")

if __name__ == "__main__":
    test_dir = "/home/team/shared/peekscan-vision/test_images"
    output_json = "/home/team/shared/peekscan-vision/benchmark_report.json"
    output_html = "/home/team/shared/peekscan-vision/benchmark_report.html"
    run_benchmark(test_dir, output_json, output_html)
