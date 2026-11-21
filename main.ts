// gta6-clipper-01 entry (Node 22, standard library only).
// The entry is the YouTube Short itself: VIDEO.json in this repo holds its
// address, and this program copies that file to the output directory where
// the gate reads it. Nothing else is written or scored.
//
// Local run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });

try {
  copyFileSync(join(botDir, 'VIDEO.json'), join(outDir, 'VIDEO.json'));
} catch (err) {
  console.error(`Could not copy VIDEO.json from ${botDir}: ${(err as Error).message}`);
  process.exit(1);
}

console.log(`VIDEO.json copied to ${join(outDir, 'VIDEO.json')}`);
