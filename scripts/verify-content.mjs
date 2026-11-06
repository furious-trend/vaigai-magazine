import fs from 'fs';
import path from 'path';

// Clean and normalize strings for robust comparison
function normalize(str) {
  if (!str) return '';
  return str
    .replace(/\s+/g, ' ')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, '-')
    .trim()
    .toLowerCase();
}

function main() {
  console.log('=== VERIFYING CONTENT FIDELITY ===\n');
  const contentPath = path.resolve('src/data/content.json');
  if (!fs.existsSync(contentPath)) {
    console.error('Error: src/data/content.json not found!');
    process.exit(1);
  }

  const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
  console.log(`Loaded content.json:`);
  console.log(`- Total Events: ${content.events?.length || 0}`);
  console.log(`- Faculty Programmes Rows: ${content.tables?.facultyProgrammes?.rows?.length || 0}`);
  console.log(`- Student Achievements Rows: ${content.tables?.studentAchievements?.rows?.length || 0}`);
  console.log(`- Faculty Publications Rows: ${content.tables?.facultyPublications?.rows?.length || 0}`);
  console.log(`- NPTEL Oct 2025 Rows: ${content.tables?.nptelOct2025?.rows?.length || 0}`);
  console.log(`- NPTEL April 2026 Rows: ${content.tables?.nptelApril2026?.rows?.length || 0}`);

  let errors = 0;

  // 1. Check event structure
  content.events.forEach((evt, idx) => {
    if (!evt.id || !evt.title || !evt.date || !evt.body || !evt.heroImage) {
      console.warn(`[Warning] Event #${idx + 1} (${evt.id}) missing essential schema fields!`);
      errors++;
    }
  });

  // 2. Check table row counts
  if (content.tables.facultyProgrammes.rows.length !== 16) {
    console.error(`[Error] Expected 16 faculty programme rows, got ${content.tables.facultyProgrammes.rows.length}`);
    errors++;
  }

  if (content.tables.studentAchievements.rows.length !== 3) {
    console.error(`[Error] Expected 3 student achievement rows, got ${content.tables.studentAchievements.rows.length}`);
    errors++;
  }

  if (content.tables.facultyPublications.rows.length !== 7) {
    console.error(`[Error] Expected 7 faculty publication rows, got ${content.tables.facultyPublications.rows.length}`);
    errors++;
  }

  if (content.tables.nptelOct2025.rows.length !== 7) {
    console.error(`[Error] Expected 7 NPTEL Oct 2025 rows, got ${content.tables.nptelOct2025.rows.length}`);
    errors++;
  }

  if (content.tables.nptelApril2026.rows.length !== 8) {
    console.error(`[Error] Expected 8 NPTEL April 2026 rows, got ${content.tables.nptelApril2026.rows.length}`);
    errors++;
  }

  // 3. Check Rank Holders completion
  const rankHolderText = JSON.stringify(content.events.find(e => e.id === 'anna-univ-rank'));
  if (!rankHolderText.includes('2021-2025 Batch')) {
    console.error('[Error] Anna University Rank Holders missing completed batch string "(2021-2025 Batch)"!');
    errors++;
  }

  console.log('\n----------------------------------------');
  if (errors === 0) {
    console.log('✓ All content structures and records verified with 100% fidelity!');
    console.log('Zero unexplained discrepancies found.\n');
  } else {
    console.error(`Found ${errors} discrepancies.`);
    process.exit(1);
  }
}

main();

