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
          console.error("[Python JSON parse error]", e.message);
          reject(new Error("Failed to parse Python JSON: " + e.message));
        }
      } else {
        // Log everything when Python fails
        console.error("[Python exited with code]", code);
        console.error("[Python stdout]", out);
        console.error("[Python stderr]", err);

        try {
          const body = JSON.parse(out || "{}");
          if (body.errorType === "YOUTUBE_BLOCKED") {
            const blockedErr: any = new Error("YouTube blocked this server IP");
            blockedErr.httpStatus = 429;
            blockedErr.body = body;
            return reject(blockedErr);
          }
          const genErr: any = new Error(
            body.error || `Transcript fetch exited ${code}`
          );
          genErr.httpStatus = 502;
          genErr.body = body;
          return reject(genErr);
        } catch (e: any) {
          // Fall back if JSON parse fails
          console.error("[Python JSON parse failed]", e.message);
          reject(new Error(`Python exited ${code}: ${err || "no stderr"}`));
        }
      }
    });

    py.stdin.write(JSON.stringify({ url }));
    py.stdin.end();
  });
}
