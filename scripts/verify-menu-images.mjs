import { readFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const menu = await readFile('src/data/menu.ts', 'utf8');
const ids = [...menu.matchAll(/^    id: '([^']+)'/gm)].map((match) => match[1]);
if (ids.length !== 53 || new Set(ids).size !== ids.length) throw new Error('Unexpected menu IDs');
const fingerprints = new Set();
let bytes = 0;
for (const id of ids) {
  for (const width of [640, 1440]) {
    const file = `public/images/menu/${id}-${width}.webp`;
    await access(file);
    const image = await readFile(file);
    const metadata = await sharp(image).metadata();
    if (metadata.width !== width || metadata.format !== 'webp')
      throw new Error(`Invalid size or format: ${file}`);
    if (width === 1440) {
      const hash = createHash('sha256').update(image).digest('hex');
      if (fingerprints.has(hash)) throw new Error(`Repeated menu image: ${id}`);
      fingerprints.add(hash);
    }
    bytes += image.length;
  }
}
console.log(
  `Verified ${ids.length} distinct images, 106 responsive WebP files, ${(bytes / 1024 / 1024).toFixed(1)} MB total.`,
);
