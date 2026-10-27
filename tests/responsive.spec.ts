import { test, expect } from '@playwright/test';

test('all four pages fit seven widths in English and Pashto with healthy images and navigation', async ({
  page,
}) => {
  test.setTimeout(150000);
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('response', (response) => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const language of ['en', 'ps']) {
    if (language === 'ps') await page.locator('.language-button').click();
    for (const path of ['', 'menu', 'gallery', 'about']) {
      await page.goto('/#/' + path);
      for (const width of [1440, 1280, 1024, 768, 480, 390, 320]) {
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
        await page.locator('img').evaluateAll(async (elements) => {
          await Promise.all(elements.map((img) => (img as HTMLImageElement).decode()));
        });
        await expect(page.locator('main h1')).toHaveCount(1);
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
          `${language}/${path}/${width}: page overflow`,
        ).toBe(true);
        if (width <= 950) {
          await expect(page.locator('.mobile-toggle')).toBeVisible();
          await expect(page.locator('.desktop-nav')).toBeHidden();
        } else {
          await expect(page.locator('.mobile-toggle')).toBeHidden();
          await expect(page.locator('.desktop-nav')).toBeVisible();
        }
        const clipped = await page
          .locator('h1,h2,h3,.dish-price,.header-inner')
          .evaluateAll((elements) =>
            elements.filter((el) => el.scrollWidth > el.clientWidth + 1).map((el) => el.textContent),
          );
        expect(clipped, `${language}/${path}/${width}: clipped content`).toEqual([]);
        if (width === 1440 || width === 390) {
          await page.evaluate(() => scrollTo(0, 0));
          await page.screenshot({
            path: `.qa/final-${path || 'home'}-${language}-${width}.png`,
            fullPage: true,
          });
        }
      }
    }
  }
  expect(errors).toEqual([]);
});

test('skip link, food filter reveal, RTL gallery and reduced motion work with a keyboard', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  await page.goto('/#/menu?filter=traditional');
  for (const lang of ['en', 'ps']) {
    if (lang === 'ps') await page.locator('.language-button').click();
    for (const width of [390, 320, 768]) {
      await page.setViewportSize({ width, height: 900 });
      await expect
        .poll(() =>
          page.locator('.menu-filters').evaluate((list) => {
            const a = list.querySelector('[aria-pressed="true"]')!.getBoundingClientRect();
            const r = list.getBoundingClientRect();
            return a.left >= r.left - 1 && a.right <= r.right + 1;
          }),
        )
        .toBe(true);
    }
  }
  await page.goto('/#/gallery');
  const tile = page.locator('.gallery-tile').first();
  await tile.click();
  const first = await page.locator('.lightbox > .photo img').getAttribute('src');
  await page.keyboard.press('ArrowLeft');
  await expect(page.locator('.lightbox > .photo img')).not.toHaveAttribute('src', first!);
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.lightbox > .photo img')).toHaveAttribute('src', first!);
  expect(await page.locator('.lightbox').evaluate((el) => getComputedStyle(el).animationName)).toBe('none');
  await page.keyboard.press('Escape');
  await expect(tile).toBeFocused();
});
