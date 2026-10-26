import { readFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createServer } from 'vite';
import sharp from 'sharp';

// Load the real configuration: category growth and photo replacements need no script edits.
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { MENU } = await server.ssrLoadModule('/src/data/menu.ts');
  const { SITE_IMAGES } = await server.ssrLoadModule('/src/config/siteImages.ts');
  const ids = MENU.map((item) => item.id);
  if (!ids.length || new Set(ids).size !== ids.length) throw Error('Missing or duplicate menu IDs');
  const fingerprints = new Set();
  let count = 0,
    bytes = 0;
  async function verify(image, label, unique = false) {
    if (!image?.srcSet || !image.alt.en || !image.alt.ps)
      throw Error(`Incomplete image configuration: ${label}`);
    for (const variant of image.srcSet.split(',')) {
      const [url, width] = variant.trim().split(/\s+/);
      if (!url.startsWith('/images/')) throw Error(`Nonlocal image: ${url}`);
      const file = 'public' + url;
      await access(file);
      const data = await readFile(file);
      const meta = await sharp(data).metadata();
      if (meta.width !== parseInt(width) || meta.format !== 'webp')
        throw Error(`Invalid responsive file: ${file}`);
      if (url === image.src && unique) {
        const hash = createHash('sha256').update(data).digest('hex');
        if (fingerprints.has(hash)) throw Error(`Duplicate dish photo: ${label}`);
        fingerprints.add(hash);
      }
      bytes += data.length;
      count++;
    }
  }
  for (const item of MENU) await verify(item.image, item.id, true);
  if (fingerprints.size !== MENU.length) throw Error('A dish source is missing from its srcSet');
  const menuCount = count;
  for (const photo of SITE_IMAGES.gallery) {
    if (!photo.image.src.startsWith('/images/venue/')) throw Error('Food image in venue gallery');
    await verify(photo.image, photo.id);
  }
  console.log(
    `Verified ${MENU.length} distinct menu images / ${menuCount} WebPs, ${SITE_IMAGES.gallery.length} venue photographs / ${count - menuCount} WebPs. ${(bytes / 1024 / 1024).toFixed(1)} MB total.`,
  );
} finally {
  await server.close();
}
