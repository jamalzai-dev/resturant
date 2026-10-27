import { MENU } from '../src/data/menu';
import { en } from '../src/i18n/en';
import { test, expect } from '@playwright/test';

test('pizza sizes, delivery minimums, ticket copy/download, pickup and persistence', async ({
  page,
  context,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/#/menu?category=pizza');
  await page.locator('.order-button').click();
  await expect(page.getByRole('heading', { name: 'Your order is empty.' })).toBeVisible();
  await page.getByRole('link', { name: 'Browse the menu' }).click();
  const pizza = page.locator('[data-dish="special-pizza"]');
  await pizza.getByRole('radio', { name: 'Medium', exact: true }).check();
  await expect(pizza.locator('.dish-price')).toHaveText('300 AFN');
  await pizza.getByRole('button', { name: /Add to order/ }).click();
  await pizza.getByRole('radio', { name: 'Small', exact: true }).check();
  await expect(pizza.locator('.dish-price')).toHaveText('180 AFN');
  await pizza.getByRole('button', { name: /Add to order/ }).click();
  await page.locator('.order-button').click();
  await expect(page.getByTestId('subtotal')).toHaveText('480 AFN');
  await expect(page.getByRole('button', { name: 'Prepare phone order' })).toBeDisabled();
  await expect(page.getByText('Add 20 AFN more to reach free delivery.')).toBeVisible();
  const small = page.locator('.order-line').filter({ hasText: 'Small' });
  const medium = page.locator('.order-line').filter({ hasText: 'Medium' });
  await small.getByRole('button', { name: /Increase quantity/ }).click();
  await expect(page.getByText('You’ve reached free delivery for this area.')).toBeVisible();
  await page.getByRole('radio', { name: /City delivery/ }).check();
  await expect(page.getByText('Add 340 AFN more to reach free delivery.')).toBeVisible();
  await medium.getByRole('button', { name: /Increase quantity/ }).click();
  await small.getByRole('button', { name: /Increase quantity/ }).click();
  await expect(page.getByTestId('subtotal')).toHaveText('1,140 AFN');
  await page.getByRole('button', { name: 'Prepare phone order' }).click();
  await expect(page.getByRole('dialog')).toContainText('Demo ticket only');
  await page.getByRole('button', { name: 'Copy order details' }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('Order total: 1,140 AFN');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download ticket', exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('pizza-max-demo-order-en.txt');
  const stream = await download.createReadStream();
  const chunks = [];
  for await (const chunk of stream!) chunks.push(chunk);
  expect(Buffer.concat(chunks).toString('utf8')).toContain('2 × Special Pizza (Medium)');
  await page.getByRole('button', { name: 'Phone ordering demo', exact: true }).click();
  await expect(page.locator('.contact-demo-dialog')).toContainText('Phone calls are turned off');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Phone ordering demo', exact: true })).toBeFocused();
  await page.screenshot({ path: '.qa/pizza-max-ticket.png' });
  await page.getByRole('button', { name: 'Back to your order' }).click();
  await medium.getByRole('button', { name: /Remove/ }).click();
  await page.getByRole('radio', { name: /Takeaway/ }).check();
  await expect(page.getByTestId('subtotal')).toHaveText('540 AFN');
  await page.getByRole('button', { name: 'Close dialog', exact: true }).click();
  await page.reload();
  await page.locator('.order-button').click();
  await expect(page.getByTestId('subtotal')).toHaveText('540 AFN');
  await expect(page.getByRole('radio', { name: /Takeaway/ })).toBeChecked();
  await page.getByRole('button', { name: /Remove:/ }).click();
  await expect(page.getByRole('heading', { name: 'Your order is empty.' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('all menu dishes are browsable, search is bilingual, and feature links select categories', async ({
  page,
}) => {
  for (const [category, count] of [['pizza',11],['rice',6],['kebab',5],['rolls',6],['burgers',2],['crispy',6],['platter',4],['juice',12],['dessert',9]] as const) {
    await page.goto('/#/menu?category=' + category);
    await expect(page.getByRole('tab', {selected:true})).toHaveText(category === 'juice' ? 'Juices' : category === 'dessert' ? 'Ice Cream' : 'Foods');
    await expect(page.locator('.menu-card')).toHaveCount(Math.min(count,9));
    while (await page.getByRole('button', { name: 'Show more dishes' }).isVisible()) await page.getByRole('button', { name: 'Show more dishes' }).click();
    await expect(page.locator('.menu-card')).toHaveCount(count);
  }
  await page.getByRole('tab', {name:'Juices',exact:true}).click();
  await expect(page.getByRole('tab',{name:'Juices',exact:true})).toHaveAttribute('aria-selected','true');
  await page.getByRole('textbox', { name: 'Search the menu' }).fill('مالټه');
  await expect(page.locator('.menu-card')).toHaveCount(1);
  await expect(page.locator('.menu-card')).toContainText('Orange / Malta Juice');
  await page.getByRole('textbox', { name: 'Search the menu' }).fill('no-such-dish');
  await expect(page.getByText('No dishes found.', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Clear search' }).click();
  await page.getByRole('link', { name: 'Explore Ice Creams' }).click();
  await expect(page.getByRole('tab', {name:'Ice Cream',exact:true})).toHaveAttribute('aria-selected','true');
  await expect(page.locator('[data-dish="vanilla"] .dish-price')).toHaveText('70 AFN');
  await page
    .locator('[data-dish="vanilla"]')
    .getByRole('button', { name: /Add to order/ })
    .click();
  await page.locator('.order-button').click();
  await expect(page.getByTestId('subtotal')).toHaveText('70 AFN');
});

test('pizza sizes, priced platters, venue gallery and keyboard controls', async ({ page }) => {
  await page.goto('/#/menu?category=pizza');
  const pizza = page.locator('[data-dish="cheese-pizza"]');
  await pizza.getByRole('radio', { name: 'Large', exact: true }).check();
  await expect(pizza.locator('.dish-price')).toHaveText('450 AFN');
  await pizza.getByRole('button', { name: /Add to order/ }).click();
  await page
    .locator('.platter-options')
    .getByRole('button', { name: /4-Person/ })
    .click();
  await page
    .locator('.platter-actions')
    .getByRole('button', { name: /Add to order/ })
    .click();
  await page.getByRole('button', { name: 'Inspect platter contents' }).click();
  await expect(page.getByRole('dialog')).toContainText('sample sharing selection');
  await expect(page.getByRole('dialog').locator('li')).toHaveCount(5);
  await page.keyboard.press('Escape');
  await page.locator('.order-button').click();
  await expect(page.getByTestId('subtotal')).toHaveText('1,150 AFN');
  await page.keyboard.press('Escape');
  await page.goto('/#/gallery');
  for (const [category, count] of [
    ['All', 7],
    ['Exterior', 2],
    ['Interior', 1],
    ['Dining Hall', 2],
    ['Kitchen', 1],
    ['Experience', 1],
  ] as const) {
    await page.locator('.gallery-filters').getByRole('button', { name: category, exact: true }).click();
    await expect(page.locator('.gallery-tile')).toHaveCount(count);
  }
  await page.getByRole('button', { name: 'Exterior', exact: true }).click();
  await expect(page.locator('.gallery-tile')).toHaveCount(2);
  const tile = page.locator('.gallery-tile').first();
  await tile.click();
  await expect(page.getByRole('dialog')).toContainText('Photograph 1 of 2');
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('dialog')).toContainText('Photograph 2 of 2');
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(tile).toBeFocused();
});

test('Pashto mobile navigation, order ticket and persistence', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch to Pashto' }).click();
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('h1')).toContainText('ښه خواړه.');
  await page.getByRole('button', { name: 'لارښود پرانیستل', exact: true }).click();
  await page.locator('#mobile-navigation').getByRole('link', { name: 'مېنو', exact: true }).click();
  await expect(page.locator('#mobile-navigation')).toHaveCount(0);
  const pizza = page.locator('[data-dish="special-pizza"]');
  await pizza.getByRole('radio', { name: 'لویه', exact: true }).check();
  await pizza.getByRole('button', { name: /فرمایش ته زیاتول/ }).click();
  await page.locator('.sticky-order').click();
  await expect(page.getByTestId('subtotal')).toContainText('۵۰۰');
  await page.getByRole('button', { name: 'د ټیلیفوني فرمایش پاڼه', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('نمونوي پاڼه');
  const pending = page.waitForEvent('download');
  await page.getByRole('button', { name: 'پاڼه ښکته کول', exact: true }).click();
  expect((await pending).suggestedFilename()).toBe('pizza-max-demo-order-ps.txt');
  await page.screenshot({ path: '.qa/pizza-max-ps-ticket.png' });
  await page.keyboard.press('Escape');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ps');
  await page.locator('.order-button').click();
  await expect(page.getByTestId('subtotal')).toContainText('۵۰۰');
});

test('responsive LTR/RTL layouts, safe demo contact, images and metadata', async ({ page }) => {
  const failed: string[] = [];
  page.on('response', (r) => {
    if (r.status() >= 400) failed.push(r.url());
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#/about');
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
  await expect(page.locator('a[href*="google.com/maps"]')).toHaveCount(0);
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);
  await page.getByRole('button', { name: 'View location', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('sample location');
  await page.keyboard.press('Escape');
  await page.locator('.contact-phone-link').click();
  await expect(page.getByRole('dialog')).toContainText('Phone calls are turned off');
  await page.keyboard.press('Escape');
  for (const language of ['en', 'ps']) {
    if (language === 'ps') await page.getByRole('button', { name: 'Switch to Pashto' }).click();
    for (const width of [1440, 1024, 768, 390, 320]) {
      await page.setViewportSize({ width, height: width < 500 ? 844 : 1000 });
      await page.evaluate(async () => {
        await document.fonts.ready;
        const imgs = [...document.images];
        imgs.forEach((img) => (img.loading = 'eager'));
        await Promise.all(imgs.map((img) => img.decode().catch(() => {})));
        window.scrollTo(0, 0);
      });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `${language} at ${width}`,
      ).toBe(true);
      expect(
        await page.evaluate(() =>
          [...document.images].filter((img) => !img.complete || !img.naturalWidth).map((img) => img.src),
        ),
      ).toEqual([]);
      await page.screenshot({ path: `.qa/pizza-max-${language}-${width}.png` });
      if (width === 1440 || width === 390)
        await page.screenshot({ path: `.qa/pizza-max-${language}-${width}-full.png`, fullPage: true });
    }
  }
  await expect(page.locator('body')).not.toContainText('{restaurant}');
  await expect(page.locator('body')).not.toContainText('{nearby}');
  expect(failed).toEqual([]);
});

test('broken image, invalid persisted order, and clipboard fallback remain usable', async ({ page }) => {
  await page.route('**/images/menu/special-pizza-*', (route) => route.abort());
  await page.addInitScript(() => {
    localStorage.setItem(
      'pizza-max-demo:order:v1',
      JSON.stringify({ lines: [{ id: 'retired-dish', quantity: 5 }], mode: 'unknown' }),
    );
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async () => {
          throw new Error('Unavailable');
        },
      },
    });
  });
  await page.goto('/#/menu?category=pizza');
  await page.locator('[data-dish="special-pizza"]').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-dish="special-pizza"] .photo')).toHaveClass(/photo-fallback/);
  await page.locator('.order-button').click();
  await expect(page.getByRole('heading', { name: 'Your order is empty.' })).toBeVisible();
  await page.keyboard.press('Escape');
  await page.getByRole('button', {name:'All Foods',exact:true}).click();
  await page.getByRole('textbox', { name: 'Search the menu' }).fill('shawarma');
  await page
    .locator('[data-dish="shawarma"]')
    .getByRole('button', { name: /Add to order/ })
    .click();
  await page.locator('.order-button').click();
  await page.getByRole('radio', { name: /Takeaway/ }).check();
  await page.getByRole('button', { name: 'Prepare phone order' }).click();
  await page.getByRole('button', { name: 'Copy order details' }).click();
  await expect(page.getByRole('textbox', { name: 'Order details to copy' })).toHaveValue(
    /Order total: 70 AFN/,
  );
});

test('all menu dishes have distinct responsive images and platter previews track selection', async ({
  page,
}) => {
  const sources = new Set<string>();
  for (const [section,count] of [['foods',40],['juices',12],['ice-cream',9]] as const) {
    await page.goto('/#/menu?section=' + section);
    await expect(page.locator('.menu-card')).toHaveCount(9);
    while (await page.getByRole('button',{name:'Show more dishes'}).isVisible()) await page.getByRole('button',{name:'Show more dishes'}).click();
    await expect(page.locator('.menu-card')).toHaveCount(count);
    const records = await page.locator('.menu-card').evaluateAll(cards => cards.map(card => {
      const img = card.querySelector('img')!;
      return {id:card.getAttribute('data-dish'),src:img.getAttribute('src'),srcset:img.srcset,loading:img.loading};
    }));
    for (const record of records) {
      expect(record.src).toBe(`/images/menu/${record.id}-1440.webp`);
      expect(record.srcset).toContain(`${record.id}-640.webp 640w`);
      expect(record.loading).toBe('lazy'); sources.add(record.src!);
    }
    await page.locator('.menu-card img').evaluateAll(async elements => { await Promise.all(elements.map(async image => { const img = image as HTMLImageElement; img.loading='eager'; await img.decode(); })); });
    await expect(page.locator('.menu-card .photo.is-loaded')).toHaveCount(count);
  }
  expect(sources.size).toBe(MENU.length);
  await page.goto('/#/menu');
  for (const people of [2, 4, 6, 8]) {
    await page
      .locator('.platter-options')
      .getByRole('button', { name: new RegExp(`${people}-Person`) })
      .click();
    await expect(page.locator('.platter-visual img')).toHaveAttribute(
      'src',
      `/images/menu/platter-${people}-1440.webp`,
    );
    await page.getByRole('button', { name: 'Inspect platter contents' }).click();
    await expect(page.locator('.platter-dialog img')).toHaveAttribute(
      'src',
      `/images/menu/platter-${people}-1440.webp`,
    );
    await expect(page.locator('.platter-dialog')).toContainText('Fish fillets');
    await expect(page.locator('.platter-dialog')).toContainText('salad');
    await page.keyboard.press('Escape');
  }
  await page.goto('/#/gallery');
  await expect(page.locator('.gallery-tile img[src*="/images/menu/"]')).toHaveCount(0);
  await expect(page.locator('.gallery-tile')).toHaveCount(7);
});

test('category shortcuts, refreshment links, reservation inquiry and unpriced dishes', async ({ page }) => {
  await page.goto('/');
  for (const [index, category] of ['Foods','Drinks','Juices','Ice Cream'].entries()) {
    await page.goto('/');
    await page.locator('.category-previews a').nth(index).click();
    await expect(page.getByRole('tab',{name:category,exact:true})).toHaveAttribute('aria-selected','true');
  }
  await page.goto('/');
  await page.getByRole('button', { name: 'Book a Table', exact: true }).click();
  await expect(page.locator('.reservation-dialog')).toContainText('Nothing is submitted');
  await expect(page.locator('.reservation-dialog a[href^="tel:"]')).toHaveCount(0);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Book a Table', exact: true })).toBeFocused();
  await page.goto('/#/menu');
  for (const item of MENU.filter((item) => item.price === null)) {
    await page.getByRole('textbox', { name: 'Search the menu' }).fill(item.name.en);
    const card = page.locator(`[data-dish="${item.id}"]`);
    await expect(card.locator('.dish-price')).toHaveCount(0);
    await card.getByRole('button', { name: /Ask for price/i }).click();
    await expect(page.locator('.contact-demo-dialog')).toBeVisible();
    await page.keyboard.press('Escape');
  }
  await page.locator('.order-button').click();
  await expect(page.getByRole('heading', { name: 'Your order is empty.' })).toBeVisible();
  await page.keyboard.press('Escape');
  await page.goto('/');
  await page.locator('.language-button').click();
  await page.locator('.reservation-button').click();
  await expect(page.locator('.reservation-dialog')).toContainText('هېڅ غوښتنه نه لېږل کېږي');
});

test('live customization enables call-to-reserve without submitting a booking', async ({ page }) => {
  await page.route('**/src/config/business.ts', async (route) => {
    const response = await route.fetch();
    const body = (await response.text())
      .replace('demo: true', 'demo: false')
      .replace('internationalPhone: null', 'internationalPhone: "+12025550123"');
    await route.fulfill({ response, body });
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Book a Table', exact: true }).click();
  await expect(
    page.locator('.reservation-dialog').getByRole('link', { name: 'Call to reserve' }),
  ).toHaveAttribute('href', 'tel:+12025550123');
  await expect(page.locator('.reservation-dialog')).toContainText(
    'only reserved after the restaurant confirms',
  );
  await expect(page.locator('.reservation-dialog form')).toHaveCount(0);
});

test('mobile navigation dismisses with Escape and closes at the desktop breakpoint', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1000 });
  await page.goto('/');
  const toggle = page.locator('.mobile-toggle');
  await toggle.click();
  await expect(page.locator('#mobile-navigation')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await page.locator('#mobile-navigation a').first().focus();
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.locator('#mobile-navigation a').first().focus();
  await page.setViewportSize({ width: 1024, height: 1000 });
  await expect(page.locator('#mobile-navigation')).toHaveCount(0);
  await expect(page.locator('.desktop-nav a[aria-current]')).toBeFocused();
});

test('selected filter stays visible after language and viewport changes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#/menu?category=pizza');
  await page.getByRole('tab', { name: 'Ice Cream', exact:true }).click();
  for (const language of ['en', 'ps']) {
    if (language === 'ps') await page.locator('.language-button').click();
    for (const width of [390, 320, 768]) {
      await page.setViewportSize({ width, height: 1000 });
      await expect
        .poll(() =>
          page.locator('.menu-tabs').evaluate((list) => {
            const active = list.querySelector('[aria-selected="true"]')!.getBoundingClientRect();
            const bounds = list.getBoundingClientRect();
            return active.left >= bounds.left - 1 && active.right <= bounds.right + 1;
          }),
        )
        .toBe(true);
    }
  }
});

test('menu prices, quantity controls and compact results fit in both directions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#/menu?category=pizza');
  await page.locator('[data-dish="special-pizza"] .add-button').click();
  for (const language of ['en', 'ps']) {
    if (language === 'ps') await page.locator('.language-button').click();
    for (const width of [1440, 1024, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const compact of [false, true]) {
        await page.getByRole('textbox').fill(compact ? 'pizza' : '');
        await expect(page.locator('.menu-grid')).toHaveClass(compact ? /menu-list/ : /^menu-grid $/);
        const problems = await page.locator('.menu-card').evaluateAll((cards) =>
          cards.flatMap((card) => {
            const bounds = card.getBoundingClientRect();
            const price = card.querySelector('.dish-price')?.getBoundingClientRect();
            const action = card.querySelector('.quantity-control, .add-button')?.getBoundingClientRect();
            const errors: string[] = [];
            const id = card.getAttribute('data-dish');
            for (const target of card.querySelectorAll('.dish-price, button, .size-selector label')) {
              const rect = target.getBoundingClientRect();
              if (rect.left < bounds.left - 1 || rect.right > bounds.right + 1)
                errors.push(`${id}: clipped control`);
              if (target.matches('button, label') && rect.height < 44) errors.push(`${id}: small target`);
            }
            if (
              price &&
              action &&
              price.top < action.bottom &&
              action.top < price.bottom &&
              price.left < action.right &&
              action.left < price.right
            )
              errors.push(`${id}: overlapping price`);
            return errors;
          }),
        );
        expect(problems, `${language} / ${width} / compact=${compact}`).toEqual([]);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
    }
  }
});
