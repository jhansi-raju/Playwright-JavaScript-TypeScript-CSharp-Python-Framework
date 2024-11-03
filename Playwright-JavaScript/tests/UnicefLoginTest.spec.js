const { test, expect } = require('@playwright/test');

test('login to ServiceNow', async ({ page }) => {
  // Step 1: Navigate to the login page
  await page.goto('https://uniceftest.service-now.com/mp', { waitUntil: 'domcontentloaded' });

  // Debugging: log the URL of the page and available frames
  console.log("Current URL:", await page.url());
  console.log("Available frames:", page.frames().map(frame => frame.url()));


  // Fill in the username and password
  await page.fill('input[name="username"]', 'QA_RAS_hrbp_1');
  await page.fill('input[name="password"]', 'Hrbp@123');

  // Step 3: Click on the login button
  await page.click('button[type="submit"]');

  // Step 4: Wait for navigation or login confirmation element
  await page.waitForNavigation({ waitUntil: 'networkidle' });


  // Step 5: Optionally, take a screenshot after login
  await page.screenshot({ path: 'after_login.png' });
});
