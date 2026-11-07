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

  // Test flipping to next page (p2)
  console.log('Flipping to page 2 (Editorial Desk)...');
  await page.evaluate(() => window.flipToPage && window.flipToPage(1));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'docs/screenshots/mobile_test_p2.png' });

  // Test page 6 (Single Event)
  console.log('Flipping to page 6 (Civil RACE)...');
  await page.evaluate(() => window.flipToPage && window.flipToPage(5));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'docs/screenshots/mobile_test_p6.png' });

  // Test page 34 (Acknowledgements)
  console.log('Flipping to page 34 (Acknowledgements)...');
  await page.evaluate(() => window.flipToPage && window.flipToPage(33));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'docs/screenshots/mobile_test_p34.png' });

  // Test page 35 (Official Directory)
  console.log('Flipping to page 35 (Official Directory)...');
  await page.evaluate(() => window.flipToPage && window.flipToPage(34));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'docs/screenshots/mobile_test_p35.png' });

  // Test page 36 (Back Cover)
  console.log('Flipping to page 36 (Back Cover)...');
  await page.evaluate(() => window.flipToPage && window.flipToPage(35));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'docs/screenshots/mobile_test_p36.png' });

  await browser.close();
  console.log('Mobile diagnostic screenshots captured.');
}

main().catch(console.error);
