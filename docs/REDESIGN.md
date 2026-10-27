# Restaurant redesign handoff

The five-phase redesign continues the existing repository on `main`. Routing and the recovered dark-theme work were retained, verified and extended. No backend or payment functionality was added.

## Completed phases

1. **Routing and shared shell:** Home, Menu, Gallery and About pages; shared header/footer; persistent providers; direct refresh, browser history and legacy links.
2. **Dark design system:** centralized charcoal/orange tokens, DM Sans/Vazirmatn, five CSS layers, consistent controls, dialogs, tickets and responsive navigation.
3. **Homepage:** six curated sections with a centered hero, large food image, three featured dishes, four menu categories, venue story, small gallery and final CTA.
4. **Menu:** accessible top-level tabs, contextual food collections, bilingual scoped search, original price/size/quantity controls, pagination and honest demo drink examples.
5. **Gallery and About:** editorial venue introduction, atmosphere collections, keyboard lightbox, hospitality values, configured contact details and a four-column footer. Responsive and accessibility verification covers both languages.

## Architecture and taxonomy

Routes are `/#/`, `/#/menu`, `/#/gallery`, and `/#/about`. Hash routing preserves the existing static-host deployment model. Language and order contexts remain above route changes. The skip link is the initial keyboard entry; subsequent client navigation focuses the new page's main content. Legacy anchors and `restaurant:menu` events are translated into intentional route destinations.

The original 61 menu records, their IDs, prices, descriptions and image assets are unchanged. The new presentation partitions them into 40 Foods, 12 Juices and 9 Ice Cream products. The Blue Sky record remains in its supplied juice category. Foods supports All, Popular, Special, Fast and Traditional collections. Popular and Special use explicit editorial IDs, with an on-page disclosure that they are not sales rankings. Original category links still narrow Foods to pizza, rice, kebab, rolls, burgers, crispy or platter.

Four unverified drink examples are stored separately from the orderable catalog. They have no prices or Add controls and disappear in live mode. Search is bilingual and constrained to the active section, collection and legacy category. Changing scope clears search and resets pagination. Clearing search restores the selected collection. Retained cards preserve their selected pizza size across navigation.

Gallery keeps all seven venue records and credits. Dining Atmosphere combines the existing dining and experience metadata; original labels remain available. Stock imagery and generated menu illustrations remain visibly disclosed.

## Preserved behavior

- All original item prices, pizza variants, unpriced inquiries and platter contents.
- Quantity limits, cart persistence, recalculated totals, nearby/city minimums and takeaway.
- Ticket creation, bilingual copy/download and clipboard fallback.
- Mobile order CTA, Escape dismissal, focus restoration and lightbox keyboard controls.
- Truthful reservation inquiries and demo contact safeguards; no automatic submissions.
- Local fonts, optimized WebP assets, srcSet/sizes, descriptive alt text and image provenance.
- English LTR, Pashto RTL, mirrored direction icons and reduced-motion preferences.

## Files created

- `src/pages/{HomePage,MenuPage,GalleryPage,AboutPage}.tsx`
- `src/components/layout/{SiteLayout,SiteFooter}.tsx`
- `src/components/home/HomeExperience.tsx`
- `src/components/common/PageIntro.tsx`
- `src/components/MenuTabs.tsx`
- `src/routing/routes.ts`
- `src/config/{experienceCopy,menuTaxonomy,menuTaxonomy.test}.ts`
- `src/data/drinks.ts`
- `src/styles/{global,layout,components,responsive,animations}.css`
- `tests/{routes,menu-taxonomy,responsive}.spec.ts`
- `docs/REDESIGN.md`

## Files modified

- `src/App.tsx`, `src/main.tsx`, `src/styles.css`
- `src/components/{Brand,Gallery,Header,HomeSections,MenuSection,OrderDrawer,ReservationInquiry}.tsx`
- `src/config/business.ts` (navigation entries only), `src/config/theme.ts`
- `src/i18n/en.ts`, `src/i18n/ps.ts`
- `package.json`, `package-lock.json` (React Router only)
- `tests/restaurant.spec.ts`
- `scripts/audit-accessibility.mjs`, `scripts/capture-preview.mjs`
- `vite.config.ts`, `README.md`

Retired: `src/template.css`, `src/minimal.css`, `src/renewal.css`. They had already been removed from imports when the new layers were validated. All active styles now enter through `src/styles.css`; no competing legacy layer remains.

## Verification

Final commands executed successfully:

| Check                                 | Result                                                         |
| ------------------------------------- | -------------------------------------------------------------- |
| `npm run build`                       | Passed, production bundle generated                            |
| `npm test`                            | 20 tests passed                                                |
| `npm run test:e2e`                    | 19 tests passed                                                |
| `npm run test:a11y`                   | 32 views, zero WCAG A/AA violations                            |
| `node scripts/verify-menu-images.mjs` | 61 distinct menu images / 122 WebPs; 7 venue photos / 14 WebPs |
| `git diff --check`                    | Passed                                                         |

The full E2E run completed after the search timing, retained pizza selection, gallery sizing and initial skip-link focus fixes. Earlier failures were investigated and corrected; no tests were removed to hide failures.

The responsive suite checks all four routes at 1440, 1280, 1024, 768, 480, 390 and 320 pixels in both languages (56 combinations). It checks page overflow, heading clipping, navigation visibility, decoded images and console/network errors. Separate tests cover price/control overlap, keyboard operation, scoped search, demo/live behavior and route persistence.

Automated accessibility checks cover 32 English/Pashto views: desktop pages, all menu sections, reservation, lightbox, cart, ticket, mobile pages and mobile navigation. Automated checks complement manual screenshot review; they are not a formal accessibility certification.

## Screenshots

Existing pre-redesign captures remain in `.qa/before/`. Final captures are in `.qa/final-{home|menu|gallery|about}-{en|ps}-{1440|390}.png`; the capture script also produces 768px views. Screenshot outputs are local QA artifacts excluded from Git. Desktop and mobile compositions were reviewed, including the Pashto homepage and the corrected gallery crops.

Run `node scripts/capture-preview.mjs` with the development server running to regenerate the complete page set.

## Remaining configuration

No known functional blocker remains in the tested configurations. This is still a demo restaurant: verified contact details, hours, actual venue images, drink offerings and unknown prices must be supplied before live use. Existing disclosure and inquiry behavior remains in place. Browser automation runs on installed Microsoft Edge; Firefox, Safari and physical devices were not tested in this session.

## Checkpoints

- `0dc97c2` — recovered routing and centralized dark design system.
- `1b108b7` — curated six-section homepage.
- `559771a` — accessible menu taxonomy and scoped search.
- Final Gallery/About/QA checkpoint: see the subsequent commit containing this handoff.
