import { test, expect, chromium } from '@playwright/test';
import * as fs from 'fs';
import path from 'path';

test('login to ServiceNow', async () => {
  test.setTimeout(300000);
  const config =  JSON.parse(fs.readFileSync('config.json', 'utf8'));
  const testDataArray = JSON.parse(fs.readFileSync('TestData.json', 'utf8'));
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
        await page.goto(config.test, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(1000);  // Optional: you may remove this as it might not be needed

        await expect(page.locator('input[name="username"]')).toBeVisible({ timeout: 10000 });
        await page.fill('input[name="username"]', config.username);
        await page.waitForTimeout(1000);

        await expect(page.locator('input[name="password"]')).toBeVisible({ timeout: 10000 });
        await page.fill('input[name="password"]', config.password);
        await page.waitForTimeout(1000);

        await page.click('button[type="submit"]');
        await page.waitForTimeout(3000); // Added a longer wait for the login process to complete

  for (const testData of testDataArray) {


    try {

        await page.waitForSelector('//span[text()="Job Positions"]', { timeout: 20000 });
        await page.waitForTimeout(1000);

        // Step 6: Navigate to "Job Positions"
        await page.click('//span[text()="Job Positions"]');
        await page.waitForTimeout(1000);

        // Step 7: Open "RAS Recruitment Regular Form"
        await page.click('//span[text()="RAS Recruitment Regular Form"]');
        await page.waitForTimeout(1000);

        // Step 8: Fill in "Vacancy Announcement Duration"
        await page.fill('input[name="vaccancy_announcement_duration_in_days"]', testData.vaccancy_announcement_duration_in_days);
        await page.waitForTimeout(1000);

        // Step 9: Select an option from the dropdown
        await page.click('#s2id_sp_formfield_please_confirm_where_the_advertised_position_belongs_to .select2-choice');
        await page.waitForTimeout(1000);
        const optionSelector = '//div[contains(@class, "select2-result-label") and text()="Headquarter with GS and IP positions"]';
        await page.waitForSelector(optionSelector, { state: 'visible', timeout: 10000 });
        await page.click(optionSelector);
        await page.waitForTimeout(1000);

        await page.fill('input[name="position_number"]', testData.position_number);
        await page.waitForTimeout(1000);
        console.log('Step: Clicking the "Contacts" label...');
        const labelSelector = '//label[contains(@class, "accordion-label") and @id="contacts"]';
        await page.click(labelSelector);

        console.log('"Contacts" label clicked successfully.');

        await page.click('//*[@id="s2id_sp_formfield_hrbp"]/a/span[2]/b');
        await page.fill('//label[contains(text(), "Primary Selection Support")]//following-sibling::input', testData.primary_contact);
        await page.click(`//div[text()="${testData.primary_contact}"]`);
        console.log('Clicked on primary_contact');

        await page.click('//*[@id="s2id_sp_formfield_hr_representative"]/a/span[2]/b');
        await page.fill('//label[contains(text(), "HR Representative")]//following-sibling::input', testData.hr_manager);
        await page.click(`//div[text()="${testData.hr_manager}"]`);

        await page.click('//*[@id="s2id_sp_formfield_hiring_manager"]/a/span[2]/b');
        await page.fill('//label[contains(text(), "Hiring manager")]//following-sibling::input', testData.hiring_manager);
        await page.click(`//div[text()="${testData.hiring_manager}"]`);
        await page.waitForTimeout(7000);

        console.log('Step: Clicking the va_job_specification label...');
        const va_job_labelSelector = '//*[@id="va_job_specification"]';
        await page.click(va_job_labelSelector);

        await page.fill('input[name="contract_duration_months"]', testData.contract_duration_months);
        await page.waitForTimeout(1000);

        console.log('Step 2: Trigger the file upload dialog...');
        const uploadButtonSelector = 'button[aria-label="Upload Attachment for Attach JD/TOR Required"]';
        await page.waitForSelector(uploadButtonSelector, { state: 'visible', timeout: 7000 });

        console.log('Step 3: Identify the hidden file input element...');
        // Assumes the file input is a sibling of the button or dynamically added
        const fileInputSelector = 'input[type="file"]'; // Adjust selector if necessary

        console.log('Step 4: Upload the file...');
//         const filePath = 'D:\\Unicef_Project\\Unicef-Automation\\Playwright-typescript\\tests\\jhansi.doc';
//         await page.setInputFiles(fileInputSelector, filePath);

        const fileName = 'jhansi.doc';
        const filePath = path.resolve(__dirname, fileName);
        console.log(`Resolved file path: ${filePath}`);
        await page.setInputFiles(fileInputSelector, filePath);

        // Wait for a few seconds to ensure the file upload completes
        await page.waitForTimeout(7000);
        console.log('File upload completed successfully.');

        const iframeSelector = '(//iframe[@title="Rich Text Area" and contains(@class, "tox-edit-area__iframe")])[2]';
        const iframeElement = await page.waitForSelector(iframeSelector);
        const frame = await iframeElement.contentFrame();

       if (frame) {
             // The content-editable area id from the DOM structure
             const contentEditableSelector = 'body#tinymce.mce-content-body';

             // Fill the content-editable area with the required text
             await frame.fill(contentEditableSelector, 'This section is the purpose of the position. You are providing a snapshot of what the job entails, rather than simply cutting and pasting paragraphs from the JD. Add the key accountabilities, inserting only the headings (rather than all bullet points) elaborating where a full sentence is needed.\nLanguage tips: you may personalize this to the reader, e.g. "Join our team", and do not use impersonal, generic terms such as "the incumbent".');

             console.log('Text has been successfully entered into the iframe.');
         } else {
             console.log('Failed to access the iframe content.');
         }
        await page.waitForTimeout(6000);
        console.log('ENTERED => Purpose and roles & responsibilities');
        console.log('Hitting TAB from hey board....');
        await page.keyboard.press('Tab');
        console.log('Hitting TAB from hey board....DONE');

        await page.click('//*[@id="s2id_sp_formfield_areas_of_education"]/ul/li/input');
        console.log('Clicked on Accounting dropdown')
        await page.fill('//*[@id="s2id_sp_formfield_areas_of_education"]/ul/li/input', testData.areas_of_education);
        console.log('Filled on Accounting')
        await page.waitForTimeout(5000);
        await page.click(`//div[text()="${testData.areas_of_education}"]`);
        await page.waitForTimeout(5000);
        console.log('Clicked on Accounting')

        await page.click('//*[@id="s2id_sp_formfield_areas_of_work"]/ul/li/input');
        console.log('Clicked on Accounting and Auditing')
        await page.fill('//*[@id="s2id_sp_formfield_areas_of_work"]/ul/li/input', testData.areas_of_work);
        console.log('Filled on Accounting and Auditing')
        await page.waitForTimeout(2000);
        await page.click(`//div[text()="${testData.areas_of_work}"]`);
        await page.waitForTimeout(3000);
        console.log('Clicked on Accounting and Auditing')

        await page.waitForTimeout(7000);
        await page.click('//*[@id="va_minimum_requirements_desirables"]');
        console.log('Clicked on va_minimum_requirements_desirables')
        await page.waitForTimeout(2000);

        console.log('Setting For every child, [insert tagline]....')
        await page.click('//*[@id="s2id_sp_formfield_for_every_child"]');
        await page.fill('//label[text()="For every child, [insert tagline]"]/following-sibling::input', testData.tagline_for_every_child);
        await page.click(`//ul[@class="select2-results" and @role="listbox"]//div[@role="option" and contains(., "${testData.tagline_for_every_child}")]`);
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
        console.log('clicked on submit button')

        const JPR_NUMBER =  '//*[@id="uiNotificationContainer"]/div/span/a/b';
        // Wait for the element to be present and extract its text content
        const jprNumberText = await page.textContent(JPR_NUMBER);
        console.log('Extracted JPR Number:', jprNumberText);
        await page.waitForTimeout(5000);
    } catch (error) {
      console.error(`Error during login for ${testData.username}:`, error);
    }
//     finally {
//       if (browser) {
//         console.log(`Closing browser for position: ${testData.position_number}`);
//         await browser.close();
//       }
//     }
  }
});
