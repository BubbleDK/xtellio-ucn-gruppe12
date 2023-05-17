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

test('check mac (D0:83:D4:00:D6:C5) filter test', async ({ page }) => {
  await page.goto('http://localhost:5173/devicelistview'); 
  await page.getByTestId('mac').click();
  await page.getByTestId('input-mac').fill('D0:83:D4:00:D6:C5')

  await page.locator('tr').first().waitFor();
  expect(await page.locator('tr').count() - 1 === 1); // The URL your app should navigate to
});