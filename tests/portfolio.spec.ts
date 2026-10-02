import { test, expect } from '@playwright/test';

test('navigation, prediction folders, and contact links work', async ({ page }, testInfo) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'William Teke', exact: true })).toBeVisible();
  if (testInfo.project.name === 'mobile') await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('link', { name: 'Predictions', exact: true }).click();
  const first = page.getByRole('button', { name: '01 The Job Title Matters Less' });
  await first.hover();
  await expect(first).toHaveAttribute('aria-expanded', 'false');
  await first.click();
  await expect(first).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText('The supporting signal').first()).toBeVisible();
  const second = page.getByRole('button', { name: '02 The Team Becomes a Project' });
  await second.click();
  await expect(first).toHaveAttribute('aria-expanded', 'false');
  await second.press('Escape');
  await expect(second).toBeFocused();
  await expect(second).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByRole('link', { name: /Send an Email/ })).toHaveAttribute('href', 'mailto:willteke@yahoo.com');
  await expect(page.getByRole('link', { name: /Connect on LinkedIn/ })).toHaveAttribute('href', /linkedin.com\/in\/williamteke/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('atlas opens, exposes maps, traps focus, and restores focus on Escape', async ({ page }) => {
  await page.goto('/#origins');
  const trigger = page.getByRole('button', { name: 'Explore my roots' });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await page.getByLabel('Learn about Fort Lauderdale').click();
  await expect(dialog.getByRole('link', { name: 'Open in Google Maps' })).toHaveAttribute('href', /google.com\/maps\/search/);
  const close = page.getByRole('button', { name: 'Close family atlas' });
  await close.focus();
  await page.keyboard.press('Shift+Tab');
  expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await close.click();
  await expect(dialog).not.toBeVisible();
});

test('a failed globe download leaves the portfolio usable', async ({ page }) => {
  await page.route('**/Globe-*.js', route => route.abort());
  await page.goto('/#origins');
  await page.getByRole('button', { name: 'Explore my roots' }).scrollIntoViewIfNeeded();
  await expect(page.getByText('The globe couldn’t load.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Explore my roots' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Send an Email/ })).toHaveAttribute('href', 'mailto:willteke@yahoo.com');
});

test('reduced-motion users can still read and dismiss content', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#origins');
  await page.getByRole('button', { name: 'Explore my roots' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Close family atlas' }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
});

test('Neptune case study keeps contribution and decisions without the simulator', async ({ page }) => {
  await page.goto('/#neptune-beach');
  await expect(page.getByRole('button', { name: 'Close case study' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Pricing and curbside recommendations.' })).toBeVisible();
  await expect(page.getByText('Interactive scenario / 160 spaces')).toHaveCount(0);
  await expect(page.getByText('What this case study is based on')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Close case study' }).click();
  await expect(page.getByRole('heading', { name: 'Pricing and curbside recommendations.' })).not.toBeVisible();
});
