import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
await page.emulateMedia({ reducedMotion: 'reduce' });
await page.goto('http://127.0.0.1:5173/');
const results = [];
async function audit(language, view) {
  await page.evaluate(() => document.fonts.ready);
  const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  results.push({ language, view, violations });
  console.log(`${language} / ${view}: ${violations.length} violations`);
  if (violations.length)
    console.log(
      JSON.stringify(
        violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
        })),
        null,
        2,
      ),
    );
}
for (const language of ['en', 'ps']) {
  if (language === 'ps') await page.getByRole('button', { name: 'Switch to Pashto' }).click();
  await page.goto('http://127.0.0.1:5173/');
  await audit(language, 'home');
  await page.locator('.reservation-button').click();
  await audit(language, 'reservation');
  await page.keyboard.press('Escape');
  await page.goto('http://127.0.0.1:5173/#/gallery');
  await audit(language, 'gallery-page');
  await page.locator('.gallery-tile').first().click();
  await audit(language, 'gallery');
  await page.keyboard.press('Escape');
  await page.goto('http://127.0.0.1:5173/#/about');
  await audit(language, 'about');
  await page.goto('http://127.0.0.1:5173/#/menu');
  await audit(language, 'menu');
  for (const section of ['drinks', 'juices', 'ice-cream']) {
    await page.goto('http://127.0.0.1:5173/#/menu?section=' + section);
    await audit(language, 'menu-' + section);
  }
  await page.goto('http://127.0.0.1:5173/#/menu');
  if (language === 'en') await page.locator('.platter-actions .add-button').click();
  await page.locator('.order-button').click();
  await audit(language, 'cart');
  await page.locator('input[value="pickup"]').check();
  await page.locator('.drawer-summary > .button').click();
  await audit(language, 'ticket');
  await page.locator('.dialog-close').click();
}
await page.setViewportSize({ width: 390, height: 844 });
for (const language of ['en', 'ps']) {
  if ((await page.locator('html').getAttribute('lang')) !== language)
    await page.locator('.language-button').click();
  for (const path of ['', 'menu', 'gallery', 'about']) {
    await page.goto('http://127.0.0.1:5173/#/' + path);
    await audit(language, 'mobile-' + (path || 'home'));
  }
  await page.locator('.mobile-toggle').click();
  await audit(language, 'mobile-navigation');
  await page.keyboard.press('Escape');
}
await browser.close();
await mkdir('.qa', { recursive: true });
await writeFile('.qa/accessibility.json', JSON.stringify(results, null, 2));
if (results.some((result) => result.violations.length)) process.exitCode = 1;
