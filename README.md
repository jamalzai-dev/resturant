# Pizza Max — Restaurant Template

A reusable React, TypeScript and Vite restaurant demo with English/Pashto, RTL layouts, local photography and fonts, a searchable menu, pizza sizes, platters, a gallery and a phone-order builder. No backend, account, payment or automatic order submission.

## Run

Requires Node.js 22.12+ (developed with Node 24).

```sh
npm install
npm run dev
npm run build
npm run preview
```

Production files are in `dist/`, ready for static hosting. No API keys or environment variables are required.

## Customize for a client

| File                               | Change here                                                                                                                 |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `src/config/business.ts`           | Brand name in both languages, logo/favicon, unique ID, demo flag, phone, address, city, country, hours, map URL and cuisine |
| `src/config/content.ts`            | Hero slogans and the short marketing copy in both languages                                                                 |
| `src/config/theme.ts`              | Paper, cream, primary, hover, text, accent, border and feedback colors                                                      |
| `src/config/sections.ts`           | Category shortcuts, editorial dishes, pizza showcase, juice selections, initial menu category and page size                 |
| `src/data/menu.ts`                 | All 61 dishes, bilingual names/descriptions, AFN prices, three pizza sizes and platter contents                             |
| `src/config/siteImages.ts`         | Every food, interior, hero and gallery photograph, source sizes and bilingual alt text                                      |
| `src/config/delivery.ts`           | Nearby/city delivery minimums; pickup has no minimum                                                                        |
| `src/i18n/en.ts`, `src/i18n/ps.ts` | Interface text, category names, service-zone labels, dialogs and messages                                                   |

1. Copy the project or unpack `pizza-max-template.zip` into a new folder. Install dependencies.
2. Give the client a unique `BUSINESS.id` to isolate saved language/cart state. Update both language names, contact details, actual address, logo, favicon and hours.
3. Replace menu data and feature IDs together. Prices are whole AFN. For a pizza, keep `price` equal to its small-size price and edit `sizes.small/medium/large`. Set any unknown price to `null`; it cannot be added to the calculated order.
4. Edit the theme tokens and brand copy. Names in interface text use `{restaurant}` and `{shortName}`, so changing the business configuration updates them automatically.
5. Confirm the delivery areas and minimums. This version supports **free delivery** with configurable minimums; `fee` is fixed at zero. Zone names are localized in `modes`/`modeDescriptions`. Update the short delivery copy to describe the actual areas.
6. Replace photographs and review both languages at mobile and desktop sizes.
7. Set `BUSINESS.demo` to `false` only after entering a real international phone number, map URL and business details. Build again. The HTML title, metadata, favicon and theme color are generated from the same settings by Vite.

The normal configuration files are the source of truth; no component edits are needed for routine branding, price, photo, contact or delivery-minimum changes. Structural changes, such as adding another language or removing a whole showcase, require component changes.

## Demo and live contact behavior

`BUSINESS.demo: true` is the default. A visible demo label and footer notice identify the sample brand. Phone and location buttons open explanatory dialogs. No real phone number, address, map pin or Restaurant structured data is published. Order tickets explicitly say that no order, payment or phone call has occurred.

In live mode, a configured `internationalPhone` enables `tel:` links, and `map.directionsUrl` enables directions. Missing contact settings still show an informative dialog. Hours remain an editable bilingual field; `null` displays call-to-confirm wording. Live Restaurant metadata uses the configured business information. The site never sends an order or takes payment in either mode.

## Menu and sample pricing

Nine categories contain 61 items, including 11 pizzas. Pizza is selected initially. Search checks English and Pashto names/descriptions across all categories. Progressive “show more” keeps the initial page compact while making every dish accessible.

All explicitly supplied prices are retained. The following pizza prices were selected for this **demo**:

| Pizza                                                          | Small | Medium | Large |
| -------------------------------------------------------------- | ----: | -----: | ----: |
| Special (supplied)                                             |   180 |    300 |   500 |
| Cheese                                                         |   160 |    280 |   450 |
| Crown Crust                                                    |   220 |    350 |   550 |
| Chicken Tikka / BBQ Chicken / Fajita / Pepperoni / Hot & Spicy |   200 |    320 |   520 |
| Veggie                                                         |   170 |    280 |   460 |
| Fish                                                           |   220 |    350 |   550 |
| Pizza Lovers / Mix                                             |   230 |    370 |   580 |

Platter prices are 400 / 700 / 1,300 / 1,500 AFN for 2 / 4 / 6 / 8 people. Each has its own mixed-food image showing rice, meat, fish, kebabs and salad. Their ingredient lists are **sample combinations**, editable through the bilingual `PLATTER_CONTENTS` entries in `src/data/menu.ts`; confirm actual contents and portions with a client. All images, descriptions and sample prices should be reviewed against the real menu before use.

## Replace photographs and logo

Place optimized WebP/AVIF files under `public/images/`, preferably with 640px and 1440px variants. In `src/config/siteImages.ts`, update **both** `src` and `srcSet`, plus both alt texts and the optional crop `position`. Set `preview: false` only for real client photography. Gallery/hero/about preview labels follow that flag. No redesign is necessary.

All 61 menu items have distinct, individually generated food illustrations under `public/images/menu/`, with 640px and 1440px WebP variants. The site identifies these as AI-generated demo imagery. Pizza toppings, rice dishes, kebab styles, fruit drinks, ice-cream flavors and four mixed platters are matched to their menu records. Category views use image cards; all-dishes/search views remain compact.

`SITE_IMAGES.menu` is the single source for menu images. Food showcases reuse the corresponding dish record. The hero and gallery reference the separate `SITE_IMAGES.venue` collection. The platter showcase and its dialog use the selected platter's image. When replacing a photograph, update its dimensions and bilingual alt text as well as both image URLs.

Exact generation prompts and provenance are saved in `docs/menu-image-provenance.json` (original 53) and `docs/menu-expansion-provenance.json` (eight additions). Original PNGs remain locally in `reference-assets/menu-generated/`; the ZIP includes optimized website assets and provenance, not large source PNGs. `node scripts/verify-menu-images.mjs` checks all responsive menu and gallery files, dimensions and duplicate-image hashes.

The hero and gallery now use seven real stock venue photographs, clearly labeled as demo imagery. Photographer credits and license links are in `PHOTO_CREDITS_VENUE.md`; exact source URLs are in `docs/venue-photo-provenance.json`. The previous dining-room image remains an unused alternative. Previous client originals remain in local `images/` and `reference-assets/`; those folders are not served or included in the reusable ZIP. Earlier stock food assets remain in `public/images/` and `public/images/demo/` as unused alternatives. `npm run assets:demo` restores only those earlier stock alternatives, not the current generated menu images.

The small pizza SVG is a placeholder brand mark. Replace `BUSINESS.logo` and `BUSINESS.favicon` with the client's supplied artwork. The image is displayed with preserved proportions; the adjacent wordmark follows the configured name and language.

Sources and licenses: `PHOTO_CREDITS.md` and `PHOTO_CREDITS_DEMO.md`. Fonts (Cormorant Garamond, DM Sans, Vazirmatn) are served locally through Fontsource under their bundled SIL Open Font Licenses.

## Order behavior

- Nearby delivery: 500 AFN minimum; city delivery: 1,000 AFN. Both are sample rules.
- Pickup: no minimum. Delivery tickets stay unavailable below the chosen minimum.
- Pizza variants remain separate lines. Totals are recalculated from current menu prices when restoring a cart; obsolete or invalid items are discarded.
- Copy and UTF-8 text download work in both languages. If clipboard access fails, selectable ticket text is shown.
- Browser storage contains only the selected language, service mode and cart. No personal details, analytics or customer account are collected.

## Verify

```sh
npm test
npm run test:e2e
npm run test:a11y      # start the dev server first
node scripts/verify-menu-images.mjs
npm run format
node scripts/capture-preview.mjs
```

Browser checks use installed Microsoft Edge in headless mode. On other systems, install Playwright Chromium and remove `channel: 'msedge'` in `playwright.config.ts` and the browser scripts. Tests cover menu access/search, size/price calculations, delivery thresholds, tickets, demo contact behavior, keyboard dialogs, bilingual persistence, image fallbacks and 320–1440px layouts. Automated accessibility checks supplement visual and keyboard review.

The ZIP excludes dependencies, generated builds, test artifacts and previous-client assets. It includes source, configuration, local demo assets, tests and this guide.

## Minimalist visual system

The current design uses warm cream and sand surfaces, charcoal typography, and saffron actions. `src/minimal.css` is the final `redesign` cascade layer, loaded after the existing structural styles. It controls the new hero composition, rounded category shortcuts, editorial food cards, menu, platters, gallery, contact feature, drawer and dark footer without changing ordering logic. Colors remain in `src/config/theme.ts`; the legacy `green` variable maps to charcoal text, while `primary` is the saffron action color. Locally served DM Sans and Vazirmatn provide matching bold English/Pashto headings.

Homepage dish selections and category shortcuts are editable in `src/config/sections.ts`. New section copy lives in `src/config/content.ts`. The original 53 menu records retain their IDs, prices and 106 image files. Eight additional unpriced dishes have new images. `src/renewal.css` adds the venue hero, nine-category navigation, venue gallery and expanded desserts while keeping the minimal visual system.

## Venue and menu renewal

The landing page follows: venue hero → four category shortcuts → unified menu → family platters → juices and three ice-cream photographs → venue gallery → contact → footer. Older editorial components remain available in source but are not rendered on the homepage.

The menu categories are pizzas (11), traditional Afghan dishes (6), kebabs (5), rolls (6), burgers (2), wings/broast (6), platters (4), juices (12), and ice creams (9). All previous item IDs, prices and pizza sizes are preserved. The eight new rolls and wings/broast dishes have `price: null`: they display **Ask for Price**, open the contact inquiry, and cannot enter cart totals. Confirm prices before enabling them for orders.

`BUSINESS.reservations.enabled` controls the Book a Table button. `BUSINESS.reservations.phone` optionally sets a dedicated reservation number, otherwise the international restaurant number is used. A callable number is exposed only in live mode (`demo: false`). The dialog is an inquiry guide, not a form submission or booking confirmation. No reservation details are collected or stored. Confirm reservations verbally with the restaurant.

Venue filters are defined in `VENUE_FILTERS` in `src/config/siteImages.ts`, with labels in both translations. New venue images should have their own local paths, dimensions, bilingual alt text and appropriate preview flag. Run `node scripts/verify-menu-images.mjs` after menu/gallery edits; it reads the actual menu and configuration dynamically, validates responsive sizes and unique dish hashes, and rejects food-image paths in the venue gallery.
