import { test, expect, chromium } from '@playwright/test';

test('login to ServiceNow', async () => {
  test.setTimeout(60000)
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
//   await expect(page.locator('input[name="vaccancy_announcement_duration_in_days"]')).toBeVisible({ timeout: 10000 });
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
//   await expect(page.locator('input[name="position_number"]')).toBeVisible({ timeout: 10000 });
  await page.fill('input[name="position_number"]', '00123944');
  await page.waitForTimeout(1000);
  console.log('Step: Clicking the "Contacts" label...');
  const labelSelector = '//label[contains(@class, "accordion-label") and @id="contacts"]';
  await page.click(labelSelector);

  console.log('"Contacts" label clicked successfully.');

  await page.click('//*[@id="s2id_sp_formfield_hrbp"]/a/span[2]/b');
  await page.fill('//*[@id="s2id_autogen19_search"]', 'Eva Kastner');
  await page.click('//div[text()="Eva Kastner"]');

  await page.click('//*[@id="s2id_sp_formfield_hr_representative"]/a/span[2]/b');
  await page.fill('//*[@id="s2id_autogen21_search"]', 'Eva Kastner');
  await page.click('//div[text()="Eva Kastner"]');

  await page.click('//*[@id="s2id_sp_formfield_hiring_manager"]/a/span[2]/b');
  await page.fill('//*[@id="s2id_autogen22_search"]', 'Shruti Rastogi');
  await page.click('//div[text()="Shruti Rastogi"]');

  await page.waitForTimeout(7000);

  console.log('Step: Clicking the va_job_specification label...');
  const va_job_labelSelector = '//*[@id="va_job_specification"]';
  await page.click(va_job_labelSelector);

  await page.fill('input[name="contract_duration_months"]', '12');
  await page.waitForTimeout(1000);

  console.log('Step 2: Trigger the file upload dialog...');
  const uploadButtonSelector = 'button[aria-label="Upload Attachment for Attach JD/TOR Required"]';
  await page.waitForSelector(uploadButtonSelector, { state: 'visible', timeout: 7000 });

  console.log('Step 3: Identify the hidden file input element...');
  // Assumes the file input is a sibling of the button or dynamically added
  const fileInputSelector = 'input[type="file"]'; // Adjust selector if necessary

  console.log('Step 4: Upload the file...');
  const filePath = 'D:\\Unicef_Project\\Unicef-Automation\\Playwright-typescript\\tests\\jhansi.doc';
  await page.setInputFiles(fileInputSelector, filePath);
  await page.waitForTimeout(7000);
  console.log('File upload completed successfully.');

  await page.click('//*[@id="s2id_autogen24"]');
  await page.fill('//*[@id="s2id_autogen24"]', 'Accounting');
  await page.waitForTimeout(5000);
  await page.click('//div[text()="Accounting"]');
  await page.waitForTimeout(5000);
  console.log('Clicked on Accounting')

  await page.click('//*[@id="s2id_sp_formfield_areas_of_work"]/ul/li/input');
  await page.fill('//*[@id="s2id_sp_formfield_areas_of_work"]/ul/li/input', 'Accounting and Auditing');
    await page.waitForTimeout(2000);
  await page.click('//div[text()="Accounting and Auditing"]');
  await page.waitForTimeout(3000);
  console.log('Clicked on Accounting and Auditing')

  await page.click('//*[@id="va_minimum_requirements_desirables"]');
  await page.waitForTimeout(2000);
  await page.click('//*[@id="s2id_sp_formfield_for_every_child"]');
  await page.fill('//*[@id="s2id_autogen17_search"]', 'a hero');
    await page.waitForTimeout(5000);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(3000);
  console.log('Clicked on child tagline')

  const full_vacancy_announcement_text = '//*[@id="full_vacancy_announcement_text"]';
  await page.click(full_vacancy_announcement_text);
  console.log('Entered full_vacancy_announcement_text')
//   await page.waitForTimeout(7000);
//   const checkbox = page.locator('//input[@type="checkbox" and @id="sp_formfield_remarks_checkbox"]');
//   await checkbox.check();

  await page.waitForTimeout(20000);
});
