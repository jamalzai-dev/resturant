import fs from 'node:fs/promises';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
const records = JSON.parse(
  await fs.readFile(new URL('../docs/venue-photo-provenance.json', import.meta.url), 'utf8'),
);
const destination = new URL('../public/images/venue/', import.meta.url);
await fs.mkdir(destination, { recursive: true });
for (const record of records) {
  const response = await fetch(record.download);
  if (!response.ok) throw Error(`${record.id}: ${response.status}`);
  const source = Buffer.from(await response.arrayBuffer());
  for (const width of [640, 1440])
    await sharp(source)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 5 })
      .toFile(fileURLToPath(new URL(`${record.id}-${width}.webp`, destination)));
  console.log(`Prepared ${record.id}`);
}
