import { test, expect } from '@playwright/test';

test.describe('Services Page', () => {
  test('should load /services page with valid content', async ({ page }) => {
    await page.goto('/services');
    
    await expect(page).toHaveURL(/.*\/services/);
    
    await page.waitForLoadState('networkidle');
    
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    
    const body = await page.locator('body');
    await expect(body).toBeVisible();
    
    const pageContent = await page.content();
    expect(pageContent).not.toContain('404');
    expect(pageContent.length).toBeGreaterThan(1000);
  });

  test('should have navigation elements', async ({ page }) => {
    await page.goto('/services');
    await page.waitForLoadState('networkidle');
    
    const nav = page.locator('nav, header');
    await expect(nav.first()).toBeVisible();
  });
});
