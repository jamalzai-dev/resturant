import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

await mkdir('.qa', { recursive: true });
const browser = await chromium.launch({ channel: 'msedge' });
try {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:5173');
  for (const language of ['en', 'ps']) {
    if (language === 'ps') await page.getByRole('button', { name: 'Switch to Pashto' }).click();
    for (const width of [1440, 768, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.evaluate(async () => {
        await document.fonts.ready;
        const images = [...document.images];
        images.forEach((img) => (img.loading = 'eager'));
        await Promise.all(images.map((img) => img.decode().catch(() => {})));
      });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: `.qa/pizza-max-${language}-${width}-hero.png` });
      for (const [section, selector] of Object.entries({
        categories: '.category-previews',
        menu: '#menu',
        platters: '.platter-section',
        desserts: '.juice-section',
        gallery: '#gallery',
        contact: '#contact',
        footer: 'footer',
      })) {
        await page.locator(selector).screenshot({
          path: `.qa/${language}-${width}-${section}.png`,
          style: '.header { visibility: hidden; }',
        });
      }
    }
  }
  console.log(
    'Saved hero, categories, menu, platters, desserts, gallery, contact and footer previews in both languages at desktop, tablet and mobile widths.',
  );
} finally {
  await browser.close();
}
