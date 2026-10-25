import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// Licensed stock for the reusable Pizza Max demo, not photographs of a real business.
// Source pages and photographer credits are recorded in PHOTO_CREDITS_DEMO.md.
const photos = {
  'pizza-cheese': '15550301',
  'pizza-veggie': '16203831',
  'pizza-pepperoni': '6488932',
  'pizza-chicken': '33458049',
  'ice-cream': '1683546',
  'chicken-kebab': '7474082',
};
const directory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/images/demo');
await mkdir(directory, { recursive: true });

const results = await Promise.allSettled(
  Object.entries(photos).map(async ([name, id]) => {
    const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1800`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
    const original = Buffer.from(await response.arrayBuffer());
    await Promise.all(
      [640, 1440].map(async (width) => {
        const output = await sharp(original)
          .rotate()
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: 82, effort: 5 })
          .toBuffer();
        await writeFile(path.join(directory, `${name}-${width}.webp`), output);
      }),
    );
    console.log(`Prepared ${name}`);
  }),
);
for (const result of results) if (result.status === 'rejected') console.error(result.reason.message);
if (results.some((result) => result.status === 'rejected')) process.exitCode = 1;
