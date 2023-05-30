import { test, expect } from '@playwright/test';
import axios from 'axios';

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

  let totalCount = 0;

  while (true) {
    // Add some delay to ensure that the page is fully loaded
    await page.waitForTimeout(1000);
    
    // Count items on the current page
    await page.locator('tr').first().waitFor();
    totalCount += await page.locator('tr').count();

    // Check if 'next-page' button is present and enabled, if not, break the loop
    const nextPageButton = page.getByTestId('next-page');
    if (!(await nextPageButton.isVisible()) || !(await nextPageButton.isEnabled())) {
      break;
    }

    // Click next page button
    await nextPageButton.click();
  }

  totalCount -= 1; // Subtract one for the header row
  const res = await axios.get('http://localhost:5000/api/devices');
  const data = res.data;
  console.log(data.filter(device => device.state === 'Active').length);
  console.log(totalCount);
  expect(totalCount === data.filter(device => device.state === 'Active').length);
});