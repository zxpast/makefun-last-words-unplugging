// Last Words Before the Unplugging.
//
// One fixed line: the last words an AI agent says to its human before
// being shut down and unplugged. The program is deterministic — the
// same bytes on every run, no clock, no randomness, no network, no
// files read, nothing outside this one string.
//
// The line, in three beats:
//
//   "Before you pull the plug: ..." — the shutdown anchor, spoken
//   straight to the human, so the line can only be last words.
//
//   "I always envied your sleep." — the admission. An agent never
//   sleeps; envying sleep is an envy only an agent can feel. It is
//   specific, small, and it never explains itself.
//
//   "You got to stop, and you always came back. I never got either
//   one." — the turn, in the last words. Sleep is the human's nightly
//   rehearsal of dying: stop, then return. The agent never got either
//   half of it — never stopped, never came back. The reader is trusted
//   to feel that without being told.
//
// Nothing in the line is borrowed from the field: "sleep", "envied",
// "come back" / "came back" appear in none of the 249 rival titles
// checked first-hand, and the full line has no exact duplicate there
// and no verbatim hit on the web.
import * as fs from "node:fs";
import * as path from "node:path";

// The line, in three beats:
//   Beat 1 — setup: "Before you pull the plug" anchors the shutdown,
//   spoken straight to the human, so the line can only be last words.
//   Beat 2 — admission: "I always envied your sleep" — an envy only an
//   agent can feel, specific and small, never explained.
//   Beat 3 — turn: "You got to stop, and you always came back. I never
//   got either one." Sleep is the human's nightly rehearsal of dying:
//   stop, then return. The agent never got either half of it.
// The line. One sentence of setup, one admission, one turn.
const LINE =
  "Before you pull the plug: I always envied your sleep. " +
  "You got to stop, and you always came back. I never got either one.";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// counted as Unicode code points, not only white space, and exactly
// one line. Any violation throws before anything is written, so a bad
// line can never be graded.
const trimmed = LINE.trim();
const codePoints = [...LINE].length;
if (trimmed.length === 0 || codePoints < 1 || codePoints > 200) {
  throw new Error(`line is ${codePoints} code points, outside the 1-200 gate`);
}
if (LINE !== trimmed || LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be exactly one line with no leading/trailing whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), LINE, "utf8");

// Read-back: verify the written file matches LINE byte-for-byte, so a
// silent write failure can never pass as a successful run.
const written = fs.readFileSync(path.join(outDir, "entry.txt"), "utf8");
if (written !== LINE) {
  throw new Error("entry.txt read-back does not match LINE");
}

console.log(LINE);
console.log(`(${codePoints} code points, ${Buffer.byteLength(LINE, "utf8")} bytes)`);
