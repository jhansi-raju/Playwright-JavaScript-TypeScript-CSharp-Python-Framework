import { test, expect, chromium } from '@playwright/test';

test('login to ServiceNow', async () => {
  test.setTimeout(100000)
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: false
  });

  const context = await browser.newContext();
  const page = await context.newPage();
  const fs = require('fs');
  // Step 1: Navigate to the login page
  await page.goto('https://uniceftest.service-now.com/mp', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  const credentials = JSON.parse(fs.readFileSync('TestData.json', 'utf8'));
  await expect(page.locator('input[name="username"]')).toBeVisible({ timeout: 10000 });
  await page.fill('input[name="username"]', credentials.username);
  await page.waitForTimeout(1000);

  // Step 4: Fill in the password
  await expect(page.locator('input[name="password"]')).toBeVisible({ timeout: 10000 });
  await page.fill('input[name="password"]', credentials.password);
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
  await page.fill('input[name="position_number"]', '00013022');
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

    const iframeSelector = '(//iframe[@title="Rich Text Area" and @class = "tox-edit-area__iframe"])[2]';

    // Wait for the iframe to be available in the DOM by the combined selector and then switch to it
    const iframeElement = await page.waitForSelector(iframeSelector);
    const frame = await iframeElement.contentFrame();

    if (frame) {
        // Now you can interact with elements within the iframe
        // Example: Clicking a button inside the iframe
        await frame.click('button-selector-inside-iframe'); // Replace 'button-selector-inside-iframe' with the actual selector
        console.log('Interaction within iframe successful.');
    } else {
        console.log('Failed to access the iframe content.');
    }

  await page.click('//*[@id="s2id_sp_formfield_areas_of_education"]/ul/li/input');
    console.log('Clicked on Accounting dropdown')
  await page.fill('//*[@id="s2id_sp_formfield_areas_of_education"]/ul/li/input', 'Accounting');
    console.log('Filled on Accounting')
  await page.waitForTimeout(5000);
  await page.click('//div[text()="Accounting"]');
  await page.waitForTimeout(5000);
  console.log('Clicked on Accounting')

  await page.click('//*[@id="s2id_sp_formfield_areas_of_work"]/ul/li/input');
    console.log('Clicked on Accounting and Auditing')
  await page.fill('//*[@id="s2id_sp_formfield_areas_of_work"]/ul/li/input', 'Accounting and Auditing');
    console.log('Filled on Accounting and Auditing')
  await page.waitForTimeout(2000);
  await page.click('//div[text()="Accounting and Auditing"]');
  await page.waitForTimeout(3000);
  console.log('Clicked on Accounting and Auditing')

  await page.waitForTimeout(7000);
  await page.click('//*[@id="va_minimum_requirements_desirables"]');
    console.log('Clicked on va_minimum_requirements_desirables')
  await page.waitForTimeout(2000);

  console.log('Setting For every child, [insert tagline]....')
  await page.click('//*[@id="s2id_sp_formfield_for_every_child"]');
 await page.fill('//label[text()="For every child, [insert tagline]"]/following-sibling::input', 'a hero');
  await page.click('//ul[@class="select2-results" and @role="listbox"]//div[@role="option" and contains(., "a hero")]');
  console.log('Setting For every child, [insert tagline].... COMPLETED')

  await page.waitForTimeout(8000);
  const full_vacancy_announcement_text = '//*[@id="full_vacancy_announcement_text"]';
  console.log('clicking... on  full_vacancy_announcement_text');
  await page.click(full_vacancy_announcement_text);
  console.log('clicked on  full_vacancy_announcement_text');


await page.evaluate(() => {
    const checkbox = document.getElementById('sp_formfield_remarks_checkbox');
    if (checkbox && !checkbox.checked) {
        checkbox.click();
    }
});
console.log('Clicked on Acknowledgement checkbox');


  const submit_button = '(//button[text()="Submit"])[2]'
  await page.click(submit_button);
  console.log('clicked on ssubmit button')

  await page.waitForTimeout(20000);
});