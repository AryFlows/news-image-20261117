// Frost Front Page — news-image-20261117 entry (Node 22, standard library only).
// The image is the entry.png beside this file; the program copies it to
// /output/entry.png (or MAKEFUN_OUTPUT_DIR when set outside the grader).
// It writes the same bytes on every run: no network, no clock, no randomness.

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const src = join(here, 'entry.png');
const dst = join(outDir, 'entry.png');
copyFileSync(src, dst);

// Verify the copy landed whole: the output must exist and carry exactly
// the source's byte count, or the run has failed and must say so loudly.
const expected = statSync(src).size;
const written = statSync(dst).size;
if (written !== expected) {
  console.error(`copy failed: ${dst} is ${written} bytes, expected ${expected}`);
  process.exit(1);
}
console.log(`wrote ${dst} (${written} bytes)`);
