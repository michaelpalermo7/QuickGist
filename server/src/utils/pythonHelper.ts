import { spawn } from "child_process";
import path from "path";

/**
 * Spawns the Python helper to fetch a transcript and returns parsed JSON.
 * @param url YouTube video URL
 * @returns Promise<any> Parsed JSON like: { videoId, segments: [{ text, start, duration }] }
 */
export function runPython(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const PY = process.env.PYTHON_BIN || "python3";

    const scriptPath = path.resolve(__dirname, "../fetch_transcript.py");

    // spawn so Python can handle heavy parsing
    const py = spawn(PY, [scriptPath], { cwd: process.cwd() });

    let out = "";
    let err = "";

    py.stdout.on("data", (d) => (out += d.toString()));
    py.stderr.on("data", (d) => (err += d.toString()));
    py.on("close", (code) => {
      if (code === 0) {
        try {
          // ensure we fail fast if Python emits invalid JSON
          resolve(JSON.parse(out));
        } catch (e: any) {
          // to clarify parsing issues
          reject(new Error("Failed to parse Python JSON: " + e.message));
        }
      } else {
        // capture Python errors for debugging
        reject(new Error(`Python exited ${code}: ${err || "no stderr"}`));
      }
    });

    // send input so Python knows what to fetch
    py.stdin.write(JSON.stringify({ url }));
    py.stdin.end();
  });
}
