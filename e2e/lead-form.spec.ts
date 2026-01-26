import { test, expect } from '@playwright/test';

test.describe('Lead Form API', () => {
  test('should accept valid lead submission via API', async ({ request }) => {
    const response = await request.post('/api/leads', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        firstName: 'E2E',
        lastName: 'Test',
        email: 'e2e-test@example.com',
        phone: '5551234567',
        service: 'General Psychiatry',
        formType: 'short',
        smsOptIn: 'false',
        landingPage: '/e2e-test',
      },
    });
    
    expect(response.status()).toBe(201);
    
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('first_name', 'E2E');
    expect(body).toHaveProperty('last_name', 'Test');
    expect(body).toHaveProperty('email', 'e2e-test@example.com');
  });

  test('should return 400 for missing required fields', async ({ request }) => {
    const response = await request.post('/api/leads', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: 'incomplete@example.com',
      },
    });
    
    expect(response.status()).toBe(400);
    
    const body = await response.json();
    expect(body).toHaveProperty('error');
  });
});

test.describe('Lead Form UI', () => {
  test('should display lead capture form on homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const form = page.locator('form');
    const formExists = await form.count() > 0;
    expect(formExists).toBe(true);
  });
});
