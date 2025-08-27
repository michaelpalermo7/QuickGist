// src/utils/pythonHelper.ts
import { spawn } from "child_process";
import path from "path";

export function runPython(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const PY = process.env.PYTHON_BIN || "python3";

    // Adjust this to where fetch_transcript.py actually lives:
    // If your structure is: server/
    //   src/
    //     utils/pythonHelper.ts  (this file)
    //   fetch_transcript.py
    // then:
    const scriptPath = path.resolve(__dirname, "../fetch_transcript.py");

    const py = spawn(PY, [scriptPath], { cwd: process.cwd() });

    let out = "";
    let err = "";

    py.stdout.on("data", (d) => (out += d.toString()));
    py.stderr.on("data", (d) => (err += d.toString()));
    py.on("close", (code) => {
      if (code === 0) {
        try {
          resolve(JSON.parse(out));
        } catch (e: any) {
          reject(new Error("Failed to parse Python JSON: " + e.message));
        }
      } else {
        reject(new Error(`Python exited ${code}: ${err || "no stderr"}`));
      }
    });

    py.stdin.write(JSON.stringify({ url }));
    py.stdin.end();
  });
}
