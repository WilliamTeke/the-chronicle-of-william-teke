# Portfolio maintenance

## Checks

`npm run build` runs TypeScript checks, geographic correctness tests, the production build, and compressed bundle budgets. Vercel runs this same build command, so these checks block a bad build.

`npm run test:browser` tests desktop and mobile navigation, click-only prediction folders, contact links, atlas focus and dismissal, reduced motion, and a failed globe download against the production preview. Install the test browser with `npx playwright install chromium` first.

The Portfolio checks GitHub workflow runs these checks plus a simulated mobile Lighthouse audit. Reports and browser failure traces are saved as workflow artifacts. Lighthouse results are lab measurements, not actual visitor metrics. Browser checks run in GitHub Actions; configure branch protection if these must be required for every future merge.

## Code structure

- `src/data/portfolio.ts`: experience, projects, and prediction copy.
- `src/components/animation.ts`: shared transition definitions.
- `src/components/SectionHeader.tsx`, `TimelineItem.tsx`, `AcademicLinks.tsx`: shared presentation.
- `src/styles/`: fonts, layout, atlas, and detail styling. `modern.css` contains the current visual overrides; order is preserved during this refactor.
- `src/components/FeatureBoundary.tsx`: local recovery for optional map features. Reloading the page retries failed module downloads.

## Map

`npm run map:build` regenerates `src/data/world.compact.json` from Natural Earth's 1:50m world-atlas source using topology-preserving simplification. It retains 20% of weighted interior points plus arc endpoints and quantizes to a 100,000-point grid. All family locations are checked against their expected country; orientation and hemisphere behavior are tested separately. The detailed geographic source remains available through the world-atlas dependency.

## Assets and sharing

Inter Latin and Latin Extended are self-hosted from Fontsource under SIL OFL 1.1; the package includes the license. Campus photographs are optimized WebP copies of the sources already used on the site; source credit links remain beside the images. Source credit is not a new license grant.

The canonical URL, Open Graph URLs, robots file, and sitemap use the live Vercel domain. If a custom domain is connected later, update all four together. `node scripts/build-social-image.mjs` regenerates the local 1200 × 630 social card.
