# Technical improvements, October 2, 2026

## Measured changes

| Asset | Before | After |
| --- | ---: | ---: |
| Geography JavaScript, gzip | 246.72 KB | 96.13 KB |
| Main JavaScript, gzip | 120.49 KB | 121.38 KB |

The geography download is 61% smaller. Both builds use the same detailed Natural Earth source; the new build simplifies shared arcs for screen display. All six family locations remain in their expected country boundaries. This is a download-size comparison, not a claim that the entire site is 61% faster.

Inter fonts and the two credited campus photos now load from the website rather than third-party servers. The campus images are WebP; their source credit links remain intact.

## Mobile lab audit

The GitHub Actions mobile Lighthouse audit of commit 9876da5 reported:

- Performance: 96
- Accessibility: 100
- Best practices: 100
- SEO: 100

These are simulated mobile lab scores against the production build served locally in CI, not production visitor measurements. Scores can vary between runs. Full HTML and JSON reports are retained as workflow artifacts.

## Reliability and maintenance

- Optional globe and atlas modules have independent fallback panels with page reload recovery.
- Browser checks cover desktop/mobile navigation, click-only prediction folders, contact links, atlas keyboard focus and dismissal, reduced motion, and a failed map download.
- The new browser checks found a Shift+Tab focus escape in the atlas. The drawer now explicitly wraps focus between its visible controls.
- Production builds now require TypeScript and geography checks and enforce compressed JavaScript budgets.
- Canonical/social URLs use the live domain; the repository includes a social image, favicon, sitemap, and robots file.
- Portfolio content, shared components, animation settings, and styles are separated into named files.
- Unused server/AI dependencies were removed and compatible dependency patches applied.

Final verification: all 8 browser checks passed in GitHub Actions run 37011270527. The four geography tests and compressed bundle budgets also passed.
