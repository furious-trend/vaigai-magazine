import { chromium, devices } from 'playwright';
import path from 'path';
import fs from 'fs';

const screenshotDir = path.resolve('docs/screenshots/mass_hero');
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

async function main() {
  const browser = await chromium.launch();

  // 1. Desktop 1920x1080 capture
  console.log('Capturing Desktop 1920x1080...');
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

  // Wait for preloader to finish (approx 1.5s - 2s)
  await desktopPage.waitForTimeout(2500);

  // Screenshot 1: Hero Section
  await desktopPage.screenshot({
    path: path.join(screenshotDir, '01_desktop_hero.png')
  });
  console.log('Saved 01_desktop_hero.png');

  // Screenshot 2: Flipbook Stage
  await desktopPage.evaluate(() => {
    const el = document.getElementById('flipbook-stage');
    if (el) el.scrollIntoView();
  });
  await desktopPage.waitForTimeout(1000);
  await desktopPage.screenshot({
    path: path.join(screenshotDir, '02_desktop_flipbook_stage.png')
  });
  console.log('Saved 02_desktop_flipbook_stage.png');

  // Test flipping in flipbook
  await desktopPage.evaluate(() => window.flipToPage && window.flipToPage(1));
  await desktopPage.waitForTimeout(1200);
  await desktopPage.screenshot({
    path: path.join(screenshotDir, '03_desktop_flipbook_spread.png')
  });
  console.log('Saved 03_desktop_flipbook_spread.png');

  // Screenshot 3: Trending Section
  await desktopPage.evaluate(() => {
    const el = document.getElementById('trending-section');
    if (el) el.scrollIntoView();
  });
  await desktopPage.waitForTimeout(800);
  await desktopPage.screenshot({
    path: path.join(screenshotDir, '04_desktop_trending_now.png')
  });
  console.log('Saved 04_desktop_trending_now.png');

  // Screenshot 4: Campus Highlights
  await desktopPage.evaluate(() => {
    const el = document.getElementById('highlights-section');
    if (el) el.scrollIntoView();
  });
  await desktopPage.waitForTimeout(800);
  await desktopPage.screenshot({
    path: path.join(screenshotDir, '05_desktop_highlights.png')
  });
  console.log('Saved 05_desktop_highlights.png');

  await desktopPage.close();

  // 2. Mobile iPhone 14 capture
  console.log('Capturing iPhone 14...');
  const iPhone = devices['iPhone 14'];
  const mobileContext = await browser.newContext({ ...iPhone });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(2500);

  // Mobile Hero
  await mobilePage.screenshot({
    path: path.join(screenshotDir, '06_mobile_hero.png')
  });
  console.log('Saved 06_mobile_hero.png');

  // Mobile Flipbook Stage
  await mobilePage.evaluate(() => {
    const el = document.getElementById('flipbook-stage');
    if (el) el.scrollIntoView();
  });
  await mobilePage.waitForTimeout(1000);
  await mobilePage.screenshot({
    path: path.join(screenshotDir, '07_mobile_flipbook.png')
  });
  console.log('Saved 07_mobile_flipbook.png');

  // Mobile Trending
  await mobilePage.evaluate(() => {
    const el = document.getElementById('trending-section');
    if (el) el.scrollIntoView();
  });
  await mobilePage.waitForTimeout(800);
  await mobilePage.screenshot({
    path: path.join(screenshotDir, '08_mobile_trending.png')
  });
  console.log('Saved 08_mobile_trending.png');

  await browser.close();
  console.log('All mass hero screenshots captured successfully!');
}

main().catch(console.error);
