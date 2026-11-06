import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = 'docs/screenshots';
fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

async function main() {
  console.log('Launching Chromium for screenshot verification of 36-page magazine & Heart Letter...');
  const browser = await chromium.launch();
  const consoleErrors = [];

  // 1. Desktop Test (1440x900)
  console.log('\n--- 1. Testing Desktop (1440x900) ---');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await desktopContext.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // Direct Cover Load (Page 1)
  console.log('Loading http://localhost:3000/ ...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  console.log('Capturing 01_cover_page.png...');
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01_cover_page.png') });

  // Click the newly designed "Click to Continue & Open" button on Cover!
  console.log('Clicking "Click to Continue & Open" button on Cover...');
  const openCoverBtn = page.locator('text=Click to Continue & Open');
  await openCoverBtn.click();
  await page.waitForTimeout(2200);

  console.log('Capturing 02_spread_01_editorial_contents.png...');
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '02_spread_01_editorial_contents.png') });

  await page.waitForFunction(() => typeof window.flipToPage === 'function');

  // Flip to Spread 2 (Pages 4-5: Ikigai & About College)
  console.log('Flipping to Spread 2 (Pages 4-5: Ikigai & About College)...');
  await page.evaluate(() => window.flipToPage(3));
  await page.waitForTimeout(2200);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03_spread_02_ikigai_about.png') });

  // Flip to Spread 3 (Pages 6-7: Civil RACE & Mech MESA)
  console.log('Flipping to Spread 3 (Pages 6-7: Civil RACE & Mech MESA)...');
  await page.evaluate(() => window.flipToPage(5));
  await page.waitForTimeout(2200);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '04_spread_03_civil_mech.png') });

  // Flip to Spread 8 (Pages 16-17: Anna University Rank Holders)
  console.log('Flipping to Spread 8 (Pages 16-17: Rank Holders)...');
  await page.evaluate(() => window.flipToPage(15));
  await page.waitForTimeout(2200);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '05_spread_08_rank_holders.png') });

  // Flip to Spread 11 (Pages 22-23: Newrta & Combined Placement Spotlight)
  console.log('Flipping to Spread 11 (Pages 22-23: Newrta & Maadhesh/TACT)...');
  await page.evaluate(() => window.flipToPage(21));
  await page.waitForTimeout(2200);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '06_spread_11_placement_combined.png') });

  // Flip to Spread 17 (Pages 34-35: Acknowledgements & Heart Letter Page 35)
  console.log('Flipping to Spread 17 (Pages 34-35: Acknowledgements & Heart Letter Page)...');
  await page.evaluate(() => window.flipToPage(33));
  await page.waitForTimeout(2200);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '07_spread_17_heart_letter_page.png') });

  // Open Heart Letter Experience overlay
  console.log('Opening Heart Letter experience overlay via CTA button...');
  const heartToolbarBtn = page.locator('button[title*="Experience The Heart Letter"]');
  await heartToolbarBtn.click();
  // Wait for the slow cinematic line-by-line reveal
  console.log('Waiting 3.8s for slow cinematic line reveal and audio equalizer...');
  await page.waitForTimeout(3800);

  console.log('Capturing 08_heart_letter_experience_overlay.png...');
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '08_heart_letter_experience_overlay.png') });

  // Close the Heart Letter Experience modal
  console.log('Closing Heart Letter overlay...');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(1200);

  // Flip to Back Cover (Page 36)
  console.log('Navigating to Back Cover (Page 36)...');
  await page.evaluate(() => window.flipToPage(35));
  await page.waitForTimeout(1600);
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '09_back_cover.png') });

  await desktopContext.close();

  // 2. Mobile Test (390x844)
  console.log('\n--- 2. Testing Mobile (390x844) ---');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15'
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3000/#/p/35', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1600);

  console.log('Capturing 10_mobile_view.png...');
  await mobilePage.screenshot({ path: path.join(SCREENSHOTS_DIR, '10_mobile_view.png') });

  await mobileContext.close();
  await browser.close();

  // Copy screenshots to brain artifacts directory
  const brainScreenshotsDir = 'C:/Users/shafi/.gemini/antigravity/brain/c2247556-13ac-49e2-aad3-282ce59ba256/screenshots';
  fs.mkdirSync(brainScreenshotsDir, { recursive: true });
  for (const file of fs.readdirSync(SCREENSHOTS_DIR)) {
    if (file.endsWith('.png')) {
      fs.copyFileSync(path.join(SCREENSHOTS_DIR, file), path.join(brainScreenshotsDir, file));
    }
  }

  console.log('\nAll 10 verification screenshots saved to docs/screenshots/ and brain artifacts successfully!');
  if (consoleErrors.length > 0) {
    console.warn(`Browser logged ${consoleErrors.length} console errors:`, consoleErrors);
  } else {
    console.log('Zero browser console errors detected.');
  }
}

main().catch((err) => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
