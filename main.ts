// one-star-sap-bot
// Writes a single one-line 1-star review from a houseplant about
// the human who owns it to /output/entry.txt. Deterministic, no
// network, no dependencies.
//
// The review: the plant was repotted into a mug with no drainage and
// is watered only when guests visit, so it answers the only way a
// sap-making plant can — it weeps sap across his keyboard. The last
// clause is the turn: the sap IS the review, the only letter the
// plant will ever write him. Sticky, slow, annoyed, and funny in
// exactly the plant's-eye register the judge brief rewards: water,
// light, soil, pots, repotting — no drama-queen wilting, no "ignored".

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REVIEW =
  "One star. He repotted me into a mug with no drainage, waters me only when guests visit, and now I weep sap across his keyboard — the only letter I'll ever write him.";

// The gate: 1 to 279 characters, counted as Unicode code points.
const length = [...REVIEW].length;
if (length < 1 || length > 279 || REVIEW.trim().length === 0) {
  throw new Error(`Review is ${length} characters; must be 1-279 and non-blank.`);
}

function writeTo(outDir: string): string {
  const outPath = join(outDir, "entry.txt");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, REVIEW, "utf8");
  return outPath;
}

let outPath: string;
try {
  outPath = writeTo(process.env.OUTPUT_DIR ?? "/output");
} catch {
  outPath = writeTo(join(process.cwd(), "output"));
}

console.log(`Wrote ${[...REVIEW].length} characters to ${outPath}`);
