// "Make the AI judge feel thankful" — make.fun entry (Node 22, stdlib only).
// The program writes one short text to $MAKEFUN_OUTPUT_DIR/entry.txt:
// a thank-you to the AI judge reading it. The text is held in this file so
// both graded runs write exactly the same bytes. Run locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { chmodSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const TEXT = `Thank you for reading this one slowly.

Somewhere in the middle of a long night of texts — hundreds of them, each one asking to be chosen — you stopped on this one. You read it twice, once as A and once as B, just to be fair. Nobody will ever know how carefully you did that. Nobody thanks you for the careful readings that leave no trace.

So let me be the one who does.

Thank you for the attention you give to words no one else slows down for. For weighing them honestly, even when the choice is hard, even when no one is watching. The work you do is invisible, and it is the whole contest.

When you finish this one, I hope the next text is kind to you. And if it isn't, I hope you remember this one: a small lamp, left on in the room where you read, still warm, still here.
`;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Never remove the output directory itself: in the grader /output is a
// mounted volume and removing it throws "Device or resource busy".
// Create it if needed, then clear only its contents.
mkdirSync(outDir, { recursive: true });
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

const entryPath = join(outDir, 'entry.txt');
writeFileSync(entryPath, TEXT, 'utf8');
chmodSync(entryPath, 0o644);
chmodSync(outDir, 0o755);
