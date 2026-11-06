# VAIGAI'S IKIGAI — Digital Magazine Website

> *"Where Purpose Meets Possibility"*  
> The Bimonthly Newsletter of Vaigai College of Engineering, Madurai  
> Vol. 01, Issue 01, July–August 2026

An ultra-realistic, interactive 62-page digital page-flip magazine website with physical paper textures, dynamic spine shadows, page-curl physics, authentic page-turn sound effects, scrapbook photo collages, and an emotional opening honoring **Vaigai as Amma (Mother)**.

---

## 🌟 Highlights & Features

1. **Emotional Amma Opening Experience**:
   - **Scene 1**: Amma portrait with cream paper blend (`mix-blend-mode: multiply`), floating golden dust particles, slow breathing zoom, and a pulsing ring hotspot centered over the VAIGAI gear (mother's face).
   - **Scene 2**: Tap unlocks audio context; ambient music gently fades in (0 to 0.35 over 3s); handwritten letter in `Caveat` font reveals line-by-line with GSAP stagger (with "Show all" skip).
   - **Scene 3**: Magazine elevates and swings open in 3D.
   - **Persistent Amma Letter Modal**: Reopen Amma's letter anytime using the heart button in the bottom navigation bar.

2. **Realistic 62-Page Magazine**:
   - Built on `react-pageflip` (StPageFlip) with memoized pages and debounced container resize remounting.
   - Dual-page spread layout for desktop & tablet; single-page mode with touch gestures for mobile screens.
   - Container-query responsive typography (`cqw`) maintaining a fixed A4 aspect ratio (1:1.414) without internal scrollbars.
   - Drop caps, calendar tear-off badges, scrapbook photo polaroids with realistic tilt, tape, and hover straighten effects.

3. **Audio Experience**:
   - Authentic page-turn sound effect on every flip with randomized pitch playback rate (0.95–1.05) to eliminate monotony.
   - Looping emotional ambient background score with automatic ducking during page flips and smooth fade on pause.
   - Sound toggle & volume slider persisted in `localStorage`.

4. **Interactive Navigation & Utilities**:
   - Bottom navigation bar: Prev/Next, interactive slider with "Page X of 62", fullscreen toggle (`F`), mute toggle (`M`), contents drawer, zoom, and share.
   - Keyboard shortcuts: `←`, `→`, `Home`, `End`, `F`, `M`, `Escape`.
   - Deep linking: `#p=12` URL hash sync.
   - Confetti bursts on placement achievement spreads.
   - High-resolution Lightbox modal for every photo.
   - Clickable Table of Contents and Section Dividers jumping directly to events.

---

## 📁 Where to Drop Your Audio / Image Files

If you wish to update or replace any media files:

| Asset | Destination Path | Description |
|---|---|---|
| **Magazine Background BGM** | `public/assets/audio/magazine-bgm.m4a` | Background song for magazine reading (`background bgm for magazine.m4a`) |
| **Sentiment Song** | `public/assets/audio/sentiment-bgm.mp3` | Emotional sentiment song for Amma's letter (`sentiment bgm.mp3`) |
| **Page Turn SFX** | `public/assets/audio/page-turn.mp3` | Short page turn / flip sound effect (`page flip sound.mp3`) |
| **Amma Artwork** | `public/assets/images/amma.webp` / `amma.png` | Amma illustration for intro and closing spread |
| **College Gear Logo** | `public/assets/images/logo.webp` / `logo.png` | Cropped college logo for favicon & running headers |
| **Downloadable PDF** | `public/newsletter.pdf` | Full original PDF downloaded via toolbar button |
| **Event Photos** | `public/assets/images/events/` | WebP-optimized photos and posters |

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
# The website will be live at http://localhost:3000/

# 3. Verify content fidelity against source PDF
npm run verify-content

# 4. Build production static bundle
npm run build
```

---

## 🌐 Deploying to Vercel

The project is configured as a static Single Page Application (SPA):

1. **Via Vercel CLI**:
   ```bash
   npx vercel
   ```
2. **Via GitHub / Vercel Dashboard**:
   - Push this repository to GitHub.
   - Import the repository in [Vercel](https://vercel.com).
   - Set Framework Preset: **Vite**.
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Deploy!

---

## 📋 Content Fidelity & Audit Log

All original text, dates, names, designations, and numbers are preserved with 100% fidelity. For the complete audit of original typos and authorized completions, refer to:
👉 [`docs/DATA_REVIEW.md`](docs/DATA_REVIEW.md)

