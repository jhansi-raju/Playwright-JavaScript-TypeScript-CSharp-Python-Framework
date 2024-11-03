import { test, expect, chromium } from '@playwright/test';

test('login to ServiceNow', async () => {
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: false
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  // Step 1: Navigate to the login page
  await page.goto('https://uniceftest.service-now.com/mp', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  // Step 2: Fill in the username
  await expect(page.locator('input[name="username"]')).toBeVisible({ timeout: 10000 });
  await page.fill('input[name="username"]', 'QA_RAS_hrbp_1');
  await page.waitForTimeout(1000);

  // Step 3: Fill in the password
  await expect(page.locator('input[name="password"]')).toBeVisible({ timeout: 10000 });
  await page.fill('input[name="password"]', 'Hrbp@123');
  await page.waitForTimeout(1000);

  // Step 4: Click on the login button
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1000);

  // Step 5: Wait for "Job Positions" element to confirm login success
  await page.waitForSelector('//span[text()="Job Positions"]', { timeout: 20000 });
  await page.waitForTimeout(1000);

  // Step 6: Navigate to "Job Positions"
  await page.click('//span[text()="Job Positions"]');
  await page.waitForTimeout(1000);

  // Step 7: Open "RAS Recruitment Regular Form"
  await page.click('//span[text()="RAS Recruitment Regular Form"]');
  await page.waitForTimeout(1000);

  // Step 8: Fill in "Vacancy Announcement Duration"
  await expect(page.locator('input[name="vaccancy_announcement_duration_in_days"]')).toBeVisible({ timeout: 10000 });
  await page.fill('input[name="vaccancy_announcement_duration_in_days"]', '10');
  await page.waitForTimeout(1000);

  // Step 9: Select an option from the dropdown
  await page.click('#s2id_sp_formfield_please_confirm_where_the_advertised_position_belongs_to .select2-choice');
  await page.waitForTimeout(1000);
  const optionSelector = '//div[contains(@class, "select2-result-label") and text()="Headquarter with GS and IP positions"]';
  await page.waitForSelector(optionSelector, { state: 'visible', timeout: 10000 });
  await page.click(optionSelector);
  await page.waitForTimeout(1000);

  // Step 10: Fill in "Position Number"
  await expect(page.locator('input[name="position_number"]')).toBeVisible({ timeout: 10000 });
  await page.fill('input[name="position_number"]', '00012345');
  await page.waitForTimeout(1000);

  // Step 11: Interact with the dropdown input field and select the first option
  // Click on the dropdown input field
//   await page.click('input[role="combobox"]');
//   await page.waitForTimeout(1000); // Wait for options to load
//
//   // Select the first visible option in the dropdown
//   const firstOptionSelector = '.select2-results .select2-result-label'; // Adjust selector if needed
//   await page.waitForSelector(firstOptionSelector, { state: 'visible', timeout: 10000 });
//   await page.click(firstOptionSelector);
//   await page.waitForTimeout(1000);

  // Step 12: Take a screenshot after filling all fields
  await page.screenshot({ path: 'after_login.png' });
  await page.waitForTimeout(1000);

  // Close the browser after test completion
  await browser.close();
});
