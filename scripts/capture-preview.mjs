import { chromium, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
await mkdir('.qa', { recursive: true });
const browser = await chromium.launch({ channel: 'msedge' });
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:5173');
  for (const language of ['en', 'ps']) {
    if (language === 'ps') await page.locator('.language-button').click();
    for (const path of ['', 'menu', 'gallery', 'about']) {
      await page.goto('http://127.0.0.1:5173/#/' + path);
      for (const width of [1440, 768, 390]) {
        await page.setViewportSize({ width, height: 1000 });
        await page.evaluate(async () => {
          await document.fonts.ready;
          for (const img of document.images) img.loading = 'eager';
        });
        await expect
          .poll(() =>
            page.evaluate(() => [...document.images].every((img) => img.complete && img.naturalWidth > 0)),
          )
          .toBe(true);
        await page.locator('img').evaluateAll(async (images) => {
          await Promise.all(images.map((img) => img.decode()));
        });
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({
          path: `.qa/final-${path || 'home'}-${language}-${width}.png`,
          fullPage: true,
        });
      }
    }
  }
  console.log('Captured all four pages in both languages at desktop, tablet and mobile widths.');
} finally {
  await browser.close();
}
