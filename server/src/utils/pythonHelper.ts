import { spawn } from "child_process";
import path from "path";

/**
 * Runs fetch_transcript.py via Python and returns parsed JSON.
 * Passes env so proxies + retries work in Render.
 */
export function runPython(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const PY = process.env.PYTHON_BIN || "python3";
    const scriptPath = path.resolve(__dirname, "fetch_transcript.py");

    const py = spawn(PY, [scriptPath], {
      cwd: process.cwd(),
      env: process.env, // important so YT_PROXY* vars reach Python
    });

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
        try {
          const body = JSON.parse(out || "{}");
          if (body.errorType === "YOUTUBE_BLOCKED") {
            const err: any = new Error("YouTube blocked this server IP");
            err.httpStatus = 429;
            err.body = body;
            return reject(err);
          }
          const err: any = new Error(
            body.error || `Transcript fetch exited ${code}`
          );
          err.httpStatus = 502;
          err.body = body;
          return reject(err);
        } catch {
          reject(new Error(`Python exited ${code}: ${err || "no stderr"}`));
        }
      }
    });

    py.stdin.write(JSON.stringify({ url }));
    py.stdin.end();
  });
}
