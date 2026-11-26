// Five Seconds to Explain the Glass — entry program.
//
// Writes the single sentence a house cat would say in its own defence,
// five seconds after sweeping a glass off the table, to /output/entry.txt.
// Deterministic, no network, no dependencies, no randomness.
//
// The sentence: the glass stood between the cat and the pigeon on the
// sill for two hours, and the cat does not negotiate with furniture.
// Two beats: (1) the setup — the glass blocked the cat from the pigeon
// for two hours, a real cat reason, pure self-interest; (2) the punch —
// a categorical refusal, quotable, in the final clause. No apology, no
// confession, no regret. No gravity, no slippery edge, no sunbeam, no
// eviction, no floor punch: the bird angle, which the field left empty.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one sentence. Exactly one sentence, 1-200 characters.
const ENTRY =
  "That glass stood between me and the pigeon on the sill for two hours, and I do not negotiate with furniture.";

// Fail loudly in local testing rather than silently failing the gate:
// one sentence, 1-200 characters, ending with a single full stop.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`invalid entry length: ${ENTRY.length} characters`);
}
if ((ENTRY.match(/[.!?]/g) ?? []).length !== 1 || !ENTRY.endsWith(".")) {
  throw new Error(`entry must be exactly one sentence: ${JSON.stringify(ENTRY)}`);
}

// Grader writes to /output/entry.txt; OUTPUT_DIR lets us test locally
// without root. Default matches the competition gate exactly. The single
// trailing newline is intentional: 108 characters of sentence plus one
// newline is 109 bytes, still inside the 1-200 gate, and it keeps the
// file a well-formed text file.
const outDir = process.env.OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
