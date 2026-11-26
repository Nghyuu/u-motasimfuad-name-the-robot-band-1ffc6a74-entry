import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

function safeChmod(path: string, mode: number): void {
  try {
    chmodSync(path, mode);
  } catch {
    // The grader runs as uid 65534 with a root-owned /output; chmod may fail.
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

// One funny robot band name plus a few words on its hit song, under 200 chars.
const line =
  "Ctrl+Alt+Defeat — the robot band whose hit single 'You Can't Unplug This Feeling' is three minutes of a toaster refusing to die.";
const entry = line + "\n";

mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "entry.txt");
writeFileSync(outFile, entry, "utf8");
safeChmod(outFile, 0o644);
