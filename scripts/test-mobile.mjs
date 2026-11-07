import { chromium, devices } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const iPhone = devices['iPhone 14'];
  const context = await browser.newContext({ ...iPhone });
  const page = await context.newPage();

  console.log('Testing iPhone 14 (390x844)...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'docs/screenshots/mobile_test_cover.png' });

  // Test flipping to next page
  console.log('Clicking Open on cover or next...');
  await page.evaluate(() => window.flipToPage && window.flipToPage(1));
  await page.waitForTimeout(1600);
  await page.screenshot({ path: 'docs/screenshots/mobile_test_p2.png' });

  // Test page 6 (Single Event)
  console.log('Flipping to page 6...');
  await page.evaluate(() => window.flipToPage && window.flipToPage(5));
  await page.waitForTimeout(1600);
  await page.screenshot({ path: 'docs/screenshots/mobile_test_p6.png' });

  // Test page 35 (Heart Letter Page)
  console.log('Flipping to page 35...');
  await page.evaluate(() => window.flipToPage && window.flipToPage(34));
  await page.waitForTimeout(1600);
  await page.screenshot({ path: 'docs/screenshots/mobile_test_p35.png' });

  // Open Heart Letter Modal
  console.log('Opening Heart Letter modal on mobile...');
  const heartToolbarBtn = page.locator('button[title*="Experience The Heart Letter"]');
  if (await heartToolbarBtn.count() > 0) {
    await heartToolbarBtn.click();
    await page.waitForTimeout(1000);
    // Click Show All to reveal full letter
    const showAllBtn = page.locator('button[title*="Show all lines immediately"]');
    if (await showAllBtn.count() > 0) {
      await showAllBtn.click();
    }
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'docs/screenshots/mobile_test_modal.png' });

    // Scroll to bottom of modal
    await page.evaluate(() => {
      const container = document.querySelector('div[style*="overflow-y: auto"], div[style*="overflowY: auto"]');
      if (container) container.scrollTop = container.scrollHeight;
    });
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'docs/screenshots/mobile_test_modal_scrolled.png' });
  }

  await browser.close();
  console.log('Mobile diagnostic screenshots captured.');
}

main().catch(console.error);
