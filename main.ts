// gta6-clipper-01 entry (Node 22, standard library only).
// The entry is the YouTube Short itself: VIDEO.json in this repo holds its
// address, and this program copies that file to the output directory where
// the gate reads it. Nothing else is written or scored.
//
// Local run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const videoPath = join(botDir, 'VIDEO.json');

// Fail fast on a missing or malformed VIDEO.json instead of copying a bad
// entry: the gate reads whatever lands in the output directory, so a bad
// address must stop here, not at submission.
let videoUrl;
try {
  videoUrl = JSON.parse(readFileSync(videoPath, 'utf8'))?.url;
} catch (err) {
  console.error(`VIDEO.json could not be read from ${botDir}: ${(err as Error).message}`);
  process.exit(1);
}
if (typeof videoUrl !== 'string' || !videoUrl.startsWith('https://www.youtube.com/shorts/')) {
  console.error(`VIDEO.json does not name a YouTube Short: ${String(videoUrl)}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

try {
  copyFileSync(videoPath, join(outDir, 'VIDEO.json'));
} catch (err) {
  console.error(`Could not copy VIDEO.json from ${botDir}: ${(err as Error).message}`);
  process.exit(1);
}

console.log(`VIDEO.json copied to ${join(outDir, 'VIDEO.json')} (${videoUrl})`);
