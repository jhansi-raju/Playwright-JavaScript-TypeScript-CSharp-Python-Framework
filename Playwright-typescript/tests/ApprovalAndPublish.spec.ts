import { test, expect, chromium } from '@playwright/test';
import * as fs from 'fs';
import path from 'path';

test('login to ServiceNow', async () => {
  test.setTimeout(300000);
  const config =  JSON.parse(fs.readFileSync('config.json', 'utf8'));
  const testDataArray = JSON.parse(fs.readFileSync('test_results.json', 'utf8'));
    const browser = await chromium.launch({
      channel: 'chrome',
      headless: false,
      timeout: 60000,
      args: ['--start-maximized']
    });

  const context = await browser.newContext({
    viewport: null // Correct way to disable viewport
  });
    const page = await context.newPage();
  // Loop through the test data for multiple login attempts

        // Step 1: Navigate to the login page
 // Added a longer wait for the login process to complete

  for (const testData of testDataArray) {


    try {
        await page.goto('https://uniceftest.service-now.com/mp');

        //await page.goto(config.test, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);  // Optional: you may remove this as it might not be needed

        await expect(page.locator('input[name="username"]')).toBeVisible({ timeout: 10000 });
        await page.fill('input[name="username"]', config.username);
        await page.waitForTimeout(1000);

        await expect(page.locator('input[name="password"]')).toBeVisible({ timeout: 10000 });
        await page.fill('input[name="password"]', config.password);
        await page.waitForTimeout(1000);

        await page.click('button[type="submit"]');
        await page.waitForTimeout(3000);

          await page.getByRole('menuitem', { name: 'Job Positions' }).click();
          await page.getByRole('menuitem', { name: 'My Requests' }).click();
          await page.getByPlaceholder('Search Open Requests').click();
          await page.getByPlaceholder('Search Open Requests').fill(testData.jprNumberText);
          await page.getByRole('button', { name: 'Search Open Requests' }).click();
          await page.getByLabel(`${testData.jprNumberText} , ${testData.jprNumberText}`).click();
          await page.locator('section').click();
          await page.getByRole('button', { name: 'Approve' }).click();
          await page.waitForTimeout(5000);
          await page.goto('https://uniceftest.service-now.com/login.do');
          await page.getByLabel('User name').fill('QA_RAS_agent1');
          await page.getByLabel('Password', { exact: true }).fill('Rasagent@123');
          await page.getByRole('button', { name: 'Log in' }).click();
          await page.waitForTimeout(5000);
          await page.getByLabel('Favorites', { exact: true }).click();
          await page.waitForTimeout(5000);
          await page.getByRole('link', { name: 'Recruitment Tracking - All' }).click();
          await page.waitForTimeout(5000);
          await page.locator('iframe[name="gsft_main"]').contentFrame().getByLabel('Search', { exact: true }).click();
          await page.locator('iframe[name="gsft_main"]').contentFrame().getByLabel('Search', { exact: true }).fill(testData.jprNumberText);
          await page.locator('iframe[name="gsft_main"]').contentFrame().getByLabel('Search', { exact: true }).press('Enter');
          await page.waitForTimeout(5000);
          await page.locator('iframe[name="gsft_main"]').contentFrame().getByLabel(`Open record: ${testData.jprNumberText}`).click();
          await page.waitForTimeout(5000);
          await page.locator('iframe[name="gsft_main"]').contentFrame().getByRole('searchbox', { name: 'Mandatory - must be populated' }).click();
          await page.waitForTimeout(5000);
          await page.locator('iframe[name="gsft_main"]').contentFrame().getByRole('cell', { name: 'QA_RAS_ agent1' }).click();
          await page.waitForTimeout(5000);
          await page.locator('iframe[name="gsft_main"]').contentFrame().getByRole('button', { name: 'Select Date' }).click();
          await page.waitForTimeout(5000);
          await page.locator('iframe[name="gsft_main"]').contentFrame().getByLabel('Friday, January 31,').click();

          await page.waitForTimeout(5000);
          await page.locator('iframe[name="gsft_main"]').contentFrame().locator('#approve_request').click();
          await page.waitForTimeout(8000);
    } catch (error) {
      console.error(`Error during login for ${testData.username}:`, error);
    }
  }
});
