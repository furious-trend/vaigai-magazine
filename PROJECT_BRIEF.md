# PROJECT BRIEF: "Vaigai's Ikigai" Digital Magazine

## 0. How to work
Use Planning mode. First write an Implementation Plan and task list, then build phase by phase (Section 12). After each phase: run the dev server, open it with the browser tool, take screenshots, and fix problems before moving on. Do not stop between phases unless you are blocked. If an asset I mention is missing, build a graceful fallback (never crash) and tell me at the end.
Environment: Windows 11, PowerShell, Node LTS. Deploy target: Vercel (static build). Use cross-platform commands only.

## 1. Goal
Turn source/newsletter.pdf into a realistic page-flip digital magazine website. It must feel like holding a printed magazine: paper texture, page curl, shadows, page-turn sound and tasteful animation. It must not look like a PDF viewer.
The newsletter is "VAIGAI'S IKIGAI: Where Purpose Meets Possibility", the Bimonthly Newsletter of Vaigai College of Engineering, Madurai. Vol. 01, Issue 01, July–August 2026.
Emotional concept: Vaigai is not only a college, she is a MOTHER. The site opens with a short emotional experience (Section 7) before the magazine opens.

## 2. Content fidelity (non-negotiable)
- Do NOT change any words, names, designations, numbers, dates, venues or spellings of the original content.
- Allowed fixes: missing spaces between words (the PDF has joined words like "TheBimonthlyNewsletter"), line-break hyphen artifacts (e.g. "Anti-\nDrug" becomes "Anti-Drug"), "&amp;" becomes "&".
- Keep the original emphasis (bold / italic runs) and show it with styling (e.g. accent colour).
- Never re-type text that is inside poster images. Keep posters as images.
- If you notice a typo, a contradiction (e.g. text and poster disagree) or a truncated sentence, do NOT silently fix it. Log it in docs/DATA_REVIEW.md with page number and what you saw. Only the obviously cut-off sentence on the "Anna University Rank Holders" page may be completed using the poster's own wording ("2021-2025 Batch"), and it must also be logged.
- New text is allowed ONLY in the Amma experience (Section 7), UI labels and image alt text.

## 3. Tech stack
- Vite + React (TypeScript optional; keep it simple and robust).
- Flip engine: StPageFlip via `react-pageflip` (pages must be forwardRef components). Handle known gotchas: remount on resize, memoize the page list, and make it work under React StrictMode.
- GSAP for animation, Howler.js for audio, self-hosted fonts via @fontsource (no CDN dependency).
- All content lives in src/data/content.json (plus src/data/amma.json for the Amma text). Components render from data only.

## 4. Content extraction pipeline
1. Write scripts/extract.py using PyMuPDF: per page, extract text blocks with bold/italic flags, extract embedded images with their page number, and render every page to PNG at 150 dpi into source/page-previews/ as visual reference.
2. The text layer of the TABLES is scrambled (cells out of order). For every table (faculty programmes, student achievement, faculty publications, both NPTEL toppers pages) read the rendered page image and transcribe cell by cell. Keep badges/status exactly as in the image (Gold, Silver, Elite, "TOP 5% Topper", "Successfully Completed", percentages).
3. Convert images to WebP (max about 1600px wide, quality about 82), keep original aspect ratios, name them by event id. Crop the Vaigai gear logo from the cover for the favicon and page headers.
4. Event schema: { id, section, kicker, title, date, body: [[{text,bold,italic}]], heroImage, galleryImages[], numbers: [{value,label}], sourcePages[] }. "numbers" only holds figures that already appear in the text (e.g. 38 students, 40 units, 250 students, "More than 140 students", 16 students). Keep the original qualifier words.
5. Write scripts/verify-content.mjs that compares the text rendered in the app against the PDF text (whitespace-normalised) and reports every difference. Run it at the end.

## 5. Magazine structure (keep the PDF's order)
Front cover (single page): logo, title, tagline, "TheBimonthlyNewsletter of Vaigai College of Engineering" (spaced properly), VOL. 01 • ISSUE 01, JULY – AUGUST 2026, campus photo.
Spread = left page + right page. After the cover, every item below is one spread:
1. Editorial team | Contents (each entry clickable, jumps to the page)
2. What is Vaigai's Ikigai? | About Vaigai College (campus photo as backdrop)
3. DIVIDER "Department-wise Activities", then events: Civil (RACE inauguration, 21 July), Mechanical (MESA-2026, 19 Aug), ECE & EEE (Embedded Systems & IoT workshop, 27 Jul–3 Aug)
4. DIVIDER "Cells, Clubs and Institutional Activities", then: Faculty Development Cell (31 Jul), YRC & RRC Health Awareness (27 Jul), Blood Donation Camp (31 Jul), RRC State-Level Quiz (12 Aug), Anti-Drug Club (11 Aug), Entrepreneurship Development Cell (13 Aug), NSS Independence Day (15 Aug), Anna University Rank Holders
5. DIVIDER "Training and Placement Cell (TPC)", then: Expert Talk (8 Jul), On-Campus Drive (10 Aug), Selected students (JRIP), Pooled Campus Drive (18 Aug), Off-Campus Drive (19 Aug), Selected student S. Maadhesh, TACT Level 1 (20 Aug)
6. DIVIDER "Achievements" (the A in Ikigai), then: Programmes Attended by Faculty Members (rows 1–8 | rows 9–16), Vairamuthu speech contest poster | Student Achievement table, Faculty Publications (cards, split across both pages), NPTEL Toppers Oct 2025, NPTEL Toppers April 2026
7. Closing spread: Amma image + closing whisper | Thank-you and contact details from the cover (Vinayagapuram, Therkutheru, Madurai - 625122, www.vaigai.org, vaigaioffice@gmail.com)
Back cover (single page). The total page count must be even so the back cover sits alone.

## 6. Page templates
EVENT SPREAD (every event):
- LEFT page "story": kicker (club/department, small caps), tear-off calendar date badge, display title, the full original paragraph(s) with a drop cap, the single most important picture (the poster, or the best photo) framed like a print, and "number" callouts if the event has any (count-up animation).
- RIGHT page "gallery": all remaining photos as a scrapbook collage (slight rotation, tape/pin details, straightens on hover, click opens a lightbox with zoom and arrows). If an event has only a poster, show the poster large on the right page with its key text facts, not invented content.
DIVIDER spread: left = huge outlined section number and title; right = "In this section" list with clickable page links plus one Amma whisper (Section 7).
TABLE pages: elegant paper-style tables or cards, readable, with zebra rows. Never shrink text below 11px equivalent.
TOPPERS pages: photo cards with status badges (medal shine, "Elite" ribbon unfurl, "TOP 5%" stamp slam).
Fit rule: pages have a fixed A4-like ratio (1:1.414). Size all type with container units (cqw) so layouts scale. No internal scrolling. If text overflows, tune the design, never cut text.

## 7. The "Amma" experience (opening)
Scene 1: full-screen warm intro. Show public/assets/images/amma.png (white background: use mix-blend-mode: multiply on a cream paper-textured backdrop so the white disappears). Slow "breathing" zoom, a soft golden glow and floating golden dust particles (light canvas). Put a pulsing ring hotspot exactly over the VAIGAI gear (the mother's face): measure it from the image and place it with percentage coordinates so it stays correct at every screen size. Caption: "Tap her to read" and the Tamil line "வைகை — எங்கள் அம்மா". A "Skip intro" button is always visible.
Scene 2 (on tap): this tap is the user gesture that unlocks audio. Fade the ambient music in (0 to 0.35 over 3s). Reveal a paper letter in a handwriting font (Caveat, or similar), line by line with a GSAP stagger. Include a "Skip" to show all lines at once. End with the button "Open the magazine →".
Scene 3: the closed magazine rises from below, the cover swings open in 3D with the book-open sound, then normal reading begins.
Later: a floating heart button "Amma's letter" reopens the letter at any time.
Draft text (put in src/data/amma.json so I can edit it easily):
LETTER title: "Vaigai is not just a college. She is our mother."
"Before you turn the first page, stay a moment. / Some places give us a degree. Very few give us a home. / She was there on the first morning, when we walked in unsure of who we were. She stood quietly through every late night, every failed attempt, every small win nobody else noticed. She never asked us to be perfect, only to keep trying. / Her walls held our laughter. Her corridors learned our footsteps. And when the day came to leave, gown on, scroll in hand, eyes full, she stood behind us, hands on our shoulders, prouder than we could ever say. / Vaigai is not only where we studied. She is who raised us. / These pages are her story, and ours. Welcome home. — வைகை, எங்கள் அம்மா"
WHISPERS (one per divider, typed out on reveal):
- Department-wise: "She teaches us to build, one brick, one circuit, one idea at a time."
- Cells and clubs: "She taught us we are never only students. We are helpers, givers, citizens."
- Placement: "She watches us step out of the door, and quietly prays the world is kind."
- Achievements: "Every prize we win, she keeps in her heart first."
- Closing: "Thank you, Amma. We will carry you wherever we go."

## 8. Audio (I will supply the files)
- public/assets/audio/page-turn.mp3 (SFX), ambient.mp3 (looping music), book-open.mp3 (optional).
- Play the page-turn sound at the START of a flip (including drag-flips), with random playbackRate 0.95–1.05 so it never sounds repetitive.
- Ambient music: loop, volume about 0.3, duck slightly while a page flips, fade out on pause.
- Sound toggle plus volume slider; remember the choice in localStorage; start only after a user gesture (also unlock audio on the first tap on iOS). Missing files must fail silently.

## 9. Visual design system
- Fonts: Playfair Display (display), Newsreader (body), DM Sans (UI/labels), Caveat (letter and handwritten notes), Noto Serif Tamil / Noto Sans Tamil for any Tamil text (set lang="ta").
- Colours (from the college brand and the Amma image): paper cream #FAF4E8, ink #1B1B2F, Vaigai blue #1F7AB8, Vaigai red #D7372B, deep navy #14213D, royal purple #5B2A86, gold #C9A24B. Define them as CSS variables.
- Details: paper grain (SVG noise), inner-spine gradient shadow, stacked page edges, running header (gear logo + "Vaigai's Ikigai · Vol. 01 · Issue 01") and folio page numbers, soft shadows, a dark wood/ink desk background with a gentle vignette.
- Ikigai page: the six lines are Vision, Achievements, Intelligence, Greatness, Academic, Innovations. Their first letters spell V-A-I-G-A-I. Light the letters one by one with a slowly turning gear.
- Posters: object-fit: contain (never crop text). Photos: cover with a focal point (never cut faces).

## 10. Animation and interaction
- Realistic page curl with shadows (flip time about 900ms). Desktop shows spreads; mobile shows single pages with swipe.
- When a flip finishes, run an entrance timeline for the visible pages (title slides, text lines fade, images reveal with clip-path, photos float in) and reset it when the page leaves.
- Hover: 3D tilt and shine on images. Desktop-only soft cursor glow. Counters count up once. Confetti burst once on "Selected students" pages.
- Respect prefers-reduced-motion (switch off particles, tilt and long timelines). Animate only transform and opacity, and keep 60fps on mid-range phones.

## 11. UI, accessibility, performance
- Bottom toolbar: prev/next, page slider with "Page X of N", Contents drawer with thumbnails, sound, fullscreen, zoom, "Amma's letter" heart, "Download original PDF" (copy the PDF to public/), share link.
- Keyboard: ← → Home End, F fullscreen, M mute, Esc closes overlays. Deep links like #/p/12.
- Alt text on every image, proper contrast, focus rings, semantic landmarks.
- Lazy-load images (only current ±2 spreads), preload the next spread, and set meta/OG tags and a favicon from the gear logo.

## 12. Phases
1. Scaffold + extraction pipeline + content.json + DATA_REVIEW.md
2. Flip engine, page shell, templates, and all 70-ish pages rendered from data
3. Amma intro + letter + whispers + closing
4. Audio system
5. Animations, lightbox, toolbar, contents drawer, mobile layout
6. Polish, accessibility, performance, README with "where to drop my audio/image files" and Vercel deploy steps

## 13. Acceptance checklist (verify with the browser tool and screenshots)
- Every page in the PDF appears, in the same order, with no cut-off text at 1440×900, 1024×768 and 390×844.
- scripts/verify-content.mjs reports zero differences (except the logged cases).
- No console errors. Missing audio or image files do not crash anything.
- Flip sound plays on every flip. The Amma intro works on desktop and mobile. All 16 table rows on the programme pages and all NPTEL rows match the PDF images.
- Final message: summary, how to run (npm run dev), how to deploy, and the list from docs/DATA_REVIEW.md.