import { test, expect } from '@playwright/test';

test('page loads correctly', async ({ page }) => {
  await page.goto('http://localhost:5173');
  const app = await page.$('#app');
  expect(app).not.toBeNull();
});


test('goToDeviceList navigation works', async ({ page }) => {
  await page.goto('http://localhost:5173'); 
  await page.getByTestId('Devices').click();
  expect(page.url()).toBe('http://localhost:5173/devicelistview');
});

test('check mac (D0:83:D4:00:D6:C5) filter test', async ({ page }) => {
  await page.goto('http://localhost:5173/devicelistview'); 
  await page.getByTestId('mac').click();
  await page.getByTestId('input-mac').fill('D0:83:D4:00:D6:C5')

  await page.locator('tr').first().waitFor();
  expect(await page.locator('tr').count() - 1 === 1);
});

test('check non-existing mac filter test', async ({ page }) => {
  await page.goto('http://localhost:5173/devicelistview'); 
  await page.getByTestId('mac').click();
  await page.getByTestId('input-mac').fill('non-existing-mac')

  await page.locator('tr').first().waitFor();
  expect(await page.locator('tr').count() - 1 === 0);
});

test('check firmware (1.1.3) filter test', async ({ page }) => {
  await page.goto('http://localhost:5173/devicelistview'); 
  await page.getByTestId('firmware').click();
  await page.getByTestId('input-firmware').fill('1.1.3')

  await page.locator('tr').first().waitFor();
  expect(await page.locator('tr').count() - 1 === 2);
});

test('check non-existing firmware filter test', async ({ page }) => {
  await page.goto('http://localhost:5173/devicelistview'); 
  await page.getByTestId('firmware').click();
  await page.getByTestId('input-firmware').fill('non-existing-firmware')

  await page.locator('tr').first().waitFor();
  expect(await page.locator('tr').count() - 1 === 0);
});

test('check active amount filter test', async ({ page }) => {
  await page.goto('http://localhost:5173/devicelistview'); 
  await page.getByTestId('state').click();
  await page.getByTestId('input-Active').click();

  await page.locator('tr').first().waitFor();
  expect(await page.locator('tr').count() - 1 === 80);
});