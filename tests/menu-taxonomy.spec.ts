import { test, expect } from '@playwright/test';
test('menu tabs support keyboard, scoped search, collections and honest drink examples', async ({page}) => {
  await page.goto('/#/menu');
  await page.getByRole('tab',{name:'Foods',exact:true}).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab',{name:'Drinks',exact:true})).toHaveAttribute('aria-selected','true');
  await expect(page.locator('[data-demo-drink]')).toHaveCount(4);
  await expect(page.locator('[data-demo-drink] .add-button')).toHaveCount(0);
  await expect(page.locator('.demo-menu-note')).toContainText('cannot be added');
  await page.keyboard.press('End');
  await expect(page.getByRole('tab',{name:'Ice Cream',exact:true})).toBeFocused();
  await page.keyboard.press('Home');
  await page.getByRole('button',{name:'Popular Foods',exact:true}).click();
  await expect(page.getByRole('button',{name:'Popular Foods',exact:true})).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('.menu-card')).toHaveCount(3);
  await expect(page.locator('.collection-note')).toContainText('not a sales ranking');
  await page.getByRole('textbox').fill('مالټه');
  await expect(page.locator('.menu-card')).toHaveCount(0);
  await page.getByRole('button',{name:'Clear search'}).click();
  await expect(page.locator('.menu-card')).toHaveCount(3);
  await page.getByRole('tab',{name:'Juices',exact:true}).click();
  await page.getByRole('textbox').fill('مالټه');
  await expect(page.locator('[data-dish="orange"]')).toBeVisible();
  await page.getByRole('tab',{name:'Foods',exact:true}).click();
  await expect(page.getByRole('textbox')).toHaveValue('');
  await page.locator('.language-button').click();
  await page.getByRole('tab',{selected:true}).focus();
  await page.keyboard.press('ArrowLeft');
  await expect(page.getByRole('tab',{selected:true})).toHaveText('څښاک');
  await page.reload();
  await expect(page.getByRole('tab',{selected:true})).toHaveText('څښاک');
});

test('unconfirmed demo drinks are hidden in live mode', async ({page}) => {
  await page.route('**/src/config/business.ts',async route => {const response=await route.fetch();await route.fulfill({response,body:(await response.text()).replace('demo: true','demo: false')});});
  await page.goto('/#/menu?section=drinks');
  await expect(page.locator('[data-demo-drink]')).toHaveCount(0);
  await expect(page.locator('.demo-menu-note')).toContainText('not been confirmed');
});
