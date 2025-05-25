import { test} from '@playwright/test';

test('visits the app root url', async ({ page }) => {
  await page.goto('/');

  // Locate the table and read its data
  const rows = await page.locator('table tr').all();
  for (const row of rows) {
    const rowData = await row.textContent();
    console.log('Row Data:', rowData);

    // Click on the row
    await row.click();
  }
});
