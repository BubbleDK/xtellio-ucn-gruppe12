import { test, expect } from '@playwright/test';

test('page loads correctly', async ({ page }) => {
  await page.goto('http://localhost:5173'); // Your Vue app's URL
  const app = await page.$('#app');
  expect(app).not.toBeNull();
});


test('goToDeviceList navigation works', async ({ page }) => {
  await page.goto('http://localhost:5173'); 
  await page.getByTestId('Devices').click();
  expect(page.url()).toBe('http://localhost:5173/devicelistview'); // The URL your app should navigate to
});

