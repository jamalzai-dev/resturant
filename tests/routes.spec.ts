import { test, expect } from '@playwright/test';

test('four pages support client navigation, refresh, history and one shared shell', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => ((window as Window & { routeSentinel?: number }).routeSentinel = 42));
  for (const [label, path] of [['Menu','menu'],['Gallery','gallery'],['About Us','about'],['Home','']] as const) {
    await page.locator('.desktop-nav').getByRole('link', { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#/${path}$`));
    expect(await page.evaluate(() => (window as Window & { routeSentinel?: number }).routeSentinel)).toBe(42);
    await expect(page.locator('header')).toHaveCount(1);
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('footer')).toHaveCount(1);
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('#main')).toBeFocused();
  }
  await page.goBack();
  await expect(page).toHaveURL(/#\/about$/);
  for (const path of ['menu','gallery','about']) {
    await page.goto('/#/' + path); await page.reload();
    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.locator('.desktop-nav a[aria-current="page"]')).toHaveAttribute('href', '#/' + path);
  }
});

test('cart and language survive route changes and reloads', async ({ page }) => {
  await page.goto('/#/menu?category=pizza');
  await page.locator('[data-dish="special-pizza"] .add-button').click();
  await page.locator('.language-button').click();
  await page.locator('.desktop-nav a[href="#/gallery"]').click();
  await page.locator('.order-button').click();
  await expect(page.getByTestId('subtotal')).toContainText('۱۸۰');
  await page.keyboard.press('Escape');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang','ps');
  await page.locator('.order-button').click();
  await expect(page.getByTestId('subtotal')).toContainText('۱۸۰');
});

test('legacy anchors and category events retain intentional destinations', async ({ page }) => {
  for (const [anchor,path] of [['home','/'],['menu','/menu'],['gallery','/gallery'],['contact','/about#contact'],['signature','/menu#signature']] as const) {
    await page.goto('/#' + anchor);
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect.poll(()=>page.evaluate(()=>window.location.hash)).toBe('#'+path);
  }
  await page.goto('/');
  await page.evaluate(()=>window.dispatchEvent(new CustomEvent('restaurant:menu',{detail:'juice'})));
  await expect(page).toHaveURL(/section=juices/);
  await expect(page.locator('[data-dish="mango"]')).toBeVisible();
});

