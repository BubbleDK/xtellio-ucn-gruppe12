import { test, expect } from '@playwright/test';
import axios from 'axios';

const res = await axios.get('http://localhost:5000/api/devices');
const data = res.data;

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

  let totalCount = 0;

  while (true) {
    
    // Count items on the current page
    await page.locator('tr').first().waitFor();
    totalCount += await page.locator('tr').count() - 1;

    // Check if 'next-page' button is present and enabled, if not, break the loop
    const nextPageButton = page.getByTestId('next-page');
    if (!(await nextPageButton.isVisible()) || !(await nextPageButton.isEnabled())) {
      break;
    }

    // Click next page button
    await nextPageButton.click();
  }

  expect(totalCount).toEqual(data.filter(device => device.mac === 'D0:83:D4:00:D6:C5').length);
});

test('check non-existing mac filter test', async ({ page }) => {
  await page.goto('http://localhost:5173/devicelistview'); 
  await page.getByTestId('mac').click();
  await page.getByTestId('input-mac').fill('non-existing-mac')

  let totalCount = 0;

  while (true) {
    
    // Count items on the current page
    await page.locator('tr').first().waitFor();
    totalCount += await page.locator('tr').count() - 1;

    // Check if 'next-page' button is present and enabled, if not, break the loop
    const nextPageButton = page.getByTestId('next-page');
    if (!(await nextPageButton.isVisible()) || !(await nextPageButton.isEnabled())) {
      break;
    }

    // Click next page button
    await nextPageButton.click();
  }

  expect(totalCount).toEqual(data.filter(device => device.mac === 'non-existing-mac').length);
});

test('check firmware (1.1.3) filter test', async ({ page }) => {
  await page.goto('http://localhost:5173/devicelistview'); 
  await page.getByTestId('firmware').click();
  await page.getByTestId('input-firmware').fill('1.1.3')

  let totalCount = 0;

  while (true) {
    
    // Count items on the current page
    await page.locator('tr').first().waitFor();
    totalCount += await page.locator('tr').count() - 1;

    // Check if 'next-page' button is present and enabled, if not, break the loop
    const nextPageButton = page.getByTestId('next-page');
    if (!(await nextPageButton.isVisible()) || !(await nextPageButton.isEnabled())) {
      break;
    }

    // Click next page button
    await nextPageButton.click();
  }

  expect(totalCount).toEqual(data.filter(device => device.status.sw === '1.1.3').length);
});

test('check non-existing firmware filter test', async ({ page }) => {
  await page.goto('http://localhost:5173/devicelistview'); 
  await page.getByTestId('firmware').click();
  await page.getByTestId('input-firmware').fill('non-existing-firmware')

  let totalCount = 0;

  while (true) {
    
    // Count items on the current page
    await page.locator('tr').first().waitFor();
    totalCount += await page.locator('tr').count() - 1;

    // Check if 'next-page' button is present and enabled, if not, break the loop
    const nextPageButton = page.getByTestId('next-page');
    if (!(await nextPageButton.isVisible()) || !(await nextPageButton.isEnabled())) {
      break;
    }

    // Click next page button
    await nextPageButton.click();
  }

  expect(totalCount).toEqual(data.filter(device => device.status.sw === 'non-existing-firmware').length);
});

test('check active amount filter test', async ({ page }) => {
  await page.goto('http://localhost:5173/devicelistview'); 
  await page.getByTestId('state').click();
  await page.getByTestId('input-Active').click();

  let totalCount = 0;

  while (true) {
    
    // Count items on the current page
    await page.locator('tr').first().waitFor();
    totalCount += await page.locator('tr').count() - 1;

    // Check if 'next-page' button is present and enabled, if not, break the loop
    const nextPageButton = page.getByTestId('next-page');
    if (!(await nextPageButton.isVisible()) || !(await nextPageButton.isEnabled())) {
      break;
    }

    // Click next page button
    await nextPageButton.click();
  }

  expect(totalCount).toEqual(data.filter(device => device.state === 'Active').length);
});