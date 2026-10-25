import { mkdir, writeFile } from 'node:fs/promises';

// Standard free Pexels / Unsplash photography; see PHOTO_CREDITS.md.
const photos = {
  rice: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a',
  pulao: 'https://images.unsplash.com/photo-1694004599545-9f25feaf665a',
  seekh: 'https://images.pexels.com/photos/29173089/pexels-photo-29173089.jpeg',
  wings: 'https://images.pexels.com/photos/28674546/pexels-photo-28674546.jpeg',
  shawarma: 'https://images.pexels.com/photos/8018079/pexels-photo-8018079.jpeg',
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
  chicken: 'https://images.pexels.com/photos/3926125/pexels-photo-3926125.jpeg',
  strawberry: 'https://images.pexels.com/photos/5338141/pexels-photo-5338141.jpeg',
  mango: 'https://images.pexels.com/photos/4955257/pexels-photo-4955257.jpeg',
  banana: 'https://images.pexels.com/photos/4051764/pexels-photo-4051764.jpeg',
  interior: 'https://images.pexels.com/photos/8146875/pexels-photo-8146875.jpeg',
};
await mkdir('public/images', { recursive: true });
const results = await Promise.allSettled(
  Object.entries(photos).map(async ([name, url]) => {
    for (const width of [640, 1440]) {
      const response = await fetch(`${url}?auto=format&fit=crop&w=${width}&q=82&fm=webp`);
      if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
      await writeFile(`public/images/${name}-${width}.webp`, new Uint8Array(await response.arrayBuffer()));
    }
    console.log(`Downloaded ${name}`);
  }),
);
for (const result of results) if (result.status === 'rejected') console.error(result.reason.message);
if (results.some((result) => result.status === 'rejected')) process.exitCode = 1;
