import React, { useState, useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import confetti from 'canvas-confetti';
import { ChevronLeft, ChevronRight, Sparkles, BookOpen, Film } from 'lucide-react';

import contentData from './data/content.json';

import CustomCursor from './components/Cursor/CustomCursor';
import CinematicPreloader from './components/Preloader/CinematicPreloader';
import CinematicNavbar from './components/Navbar/CinematicNavbar';
import CinematicHero from './components/Hero/CinematicHero';
import CinematicTicker from './components/Marquee/CinematicTicker';
import Magazine from './components/FlipBook/Magazine';
import TrendingSection from './components/Trending/TrendingSection';
import HighlightsGrid from './components/Highlights/HighlightsGrid';
import CinematicStats from './components/Stats/CinematicStats';
import CinematicFooter from './components/Footer/CinematicFooter';
import BottomToolbar from './components/Toolbar/BottomToolbar';
import ContentsDrawer from './components/Toolbar/ContentsDrawer';
import LightboxModal from './components/Lightbox/LightboxModal';
import { useAudio } from './hooks/useAudio';

function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isContentsOpen, setIsContentsOpen] = useState(false);
  const [lightbox, setLightbox] = useState({ isOpen: false, src: '', caption: '' });
  const [confettiFired, setConfettiFired] = useState({});
  const [hasInteracted, setHasInteracted] = useState(false);

  const flipBookRef = useRef(null);
  const lenisRef = useRef(null);

  const {
    isMuted,
    volume,
    setVolume,
    playMagazineBgm,
    playPageTurn,
    toggleMute
  } = useAudio();

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  // First user interaction unlocks and starts magazine BGM
  const handleUserInteraction = useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true);
      playMagazineBgm();
    }
  }, [hasInteracted, playMagazineBgm]);

  // Hash deep linking: read on mount and on hashchange
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      const match = hash.match(/#\/?p\/?(\d+)/i);
      if (match) {
        const pageNum = parseInt(match[1], 10) - 1;
        if (pageNum >= 0 && pageNum < 36) {
          setCurrentPage(pageNum);
          if (flipBookRef.current?.pageFlip()) {
            try {
              flipBookRef.current.pageFlip().flip(pageNum);
            } catch (err) {
              console.warn('Hash flip error:', err);
            }
          }
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);

    // Expose programmatic navigation helper for test harnesses and external triggers
    window.flipToPage = (pageNum) => {
      if (flipBookRef.current?.pageFlip()) {
        try {
          flipBookRef.current.pageFlip().flip(pageNum);
        } catch (err) {
          console.warn('flipToPage error:', err);
        }
      }
    };

    return () => {
      window.removeEventListener('hashchange', handleHash);
      delete window.flipToPage;
    };
  }, []);

  // Sync page to hash and fire celebratory confetti for honours pages
  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
    window.history.replaceState(null, '', `#/p/${newPage + 1}`);

    // Confetti celebration trigger for placement/honour success pages (P16-P17 Rank Holders, P23 Maadhesh)
    if ((newPage === 15 || newPage === 16 || newPage === 22) && !confettiFired[newPage]) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#E50914', '#FFC83D', '#FFFFFF', '#00E5FF']
      });
      setConfettiFired((prev) => ({ ...prev, [newPage]: true }));
    }
  }, [confettiFired]);

  // Jump to page helper that flips book and smoothly scrolls into the stage
  const handleJumpAndScroll = useCallback((pageIndex) => {
    handleUserInteraction();
    if (flipBookRef.current?.pageFlip()) {
      try {
        flipBookRef.current.pageFlip().flip(pageIndex);
      } catch (err) {
        console.warn('handleJumpAndScroll error:', err);
      }
    }
    const stage = document.getElementById('flipbook-stage');
    if (stage) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(stage, { offset: -30, duration: 1.2 });
      } else {
        stage.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [handleUserInteraction]);

  // Scroll to flipbook stage helper
  const handleScrollToStage = useCallback(() => {
    handleUserInteraction();
    const stage = document.getElementById('flipbook-stage');
    if (stage) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(stage, { offset: -30, duration: 1.2 });
      } else {
        stage.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [handleUserInteraction]);

  // Scroll to trending section helper
  const handleScrollToTrending = useCallback(() => {
    handleUserInteraction();
    const trending = document.getElementById('trending-section');
    if (trending) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(trending, { offset: -60, duration: 1.2 });
      } else {
        trending.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [handleUserInteraction]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightbox.isOpen || isContentsOpen) {
        if (e.key === 'Escape') {
          setLightbox({ isOpen: false, src: '', caption: '' });
          setIsContentsOpen(false);
        }
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        flipBookRef.current?.pageFlip()?.flipNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        flipBookRef.current?.pageFlip()?.flipPrev();
      } else if (e.key === 'Home') {
        flipBookRef.current?.pageFlip()?.flip(0);
      } else if (e.key === 'End') {
        flipBookRef.current?.pageFlip()?.flip(35);
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      } else if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen?.().catch(() => {});
        } else {
          document.exitFullscreen?.().catch(() => {});
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.isOpen, isContentsOpen, toggleMute]);

  const handlePrev = () => {
    handleUserInteraction();
    flipBookRef.current?.pageFlip()?.flipPrev();
  };

  const handleNext = () => {
    handleUserInteraction();
    flipBookRef.current?.pageFlip()?.flipNext();
  };

  const handleSliderChange = (page) => {
    handleUserInteraction();
    flipBookRef.current?.pageFlip()?.flip(page);
  };

  const handleOpenLightbox = (src, caption) => {
    setLightbox({ isOpen: true, src, caption });
  };

  return (
    <div
      onClick={handleUserInteraction}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#0a0a0a',
        color: '#F5F5F5',
        overflowX: 'hidden'
      }}
    >
      {/* Interactive Custom Cursor with Magnetic Tracking Ring */}
      <CustomCursor />

      {/* High-Impact Digital Preloader (0% -> 100% with Bass Drop Flash) */}
      {loading && <CinematicPreloader onComplete={() => setLoading(false)} />}

      {/* Atmospheric Overlays: Film Grain, Cinematic Vignette, Subtle Scanlines */}
      <div className="film-grain" />
      <div className="cinematic-vignette" />
      <div className="scanlines" />

      {/* Sticky Glassmorphic Navbar with Top Scroll Progress */}
      <CinematicNavbar
        isMuted={isMuted}
        onToggleMute={toggleMute}
        onOpenContents={() => setIsContentsOpen(true)}
        onScrollToStage={handleScrollToStage}
        onJumpToPage={handleJumpAndScroll}
      />

      {/* Full-Screen Ken Burns Cinematic Hero */}
      <CinematicHero
        onReadIssue={handleScrollToStage}
        onExploreTrending={handleScrollToTrending}
      />

      {/* Continuous Breaking News Ticker Strip */}
      <CinematicTicker />

      {/* 3D Flipbook Stage */}
      <section
        id="flipbook-stage"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 16px 100px',
          background: 'radial-gradient(ellipse at 50% 25%, rgba(255, 200, 61, 0.08) 0%, rgba(10, 10, 10, 0.96) 65%, #0a0a0a 100%)',
          zIndex: 10
        }}
      >
        {/* Overhead Golden Stage Spotlight Effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80vw',
            maxWidth: '1200px',
            height: '350px',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(255, 200, 61, 0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        {/* Stage Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '32px',
            position: 'relative',
            zIndex: 2
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#FFC83D',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '0.95rem',
              letterSpacing: '0.22em',
              marginBottom: '6px'
            }}
          >
            <Sparkles size={16} /> OFFICIAL 36-PAGE INTERACTIVE EDITION
          </div>

          <h2
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(2rem, 5vw, 3.6rem)',
              color: '#FFFFFF',
              letterSpacing: '0.04em',
              margin: 0,
              textTransform: 'uppercase'
            }}
          >
            FLIPBOOK <span style={{ color: '#E50914' }}>STAGE</span>
          </h2>

          <div
            style={{
              fontSize: '0.82rem',
              color: 'rgba(255, 255, 255, 0.55)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginTop: '4px'
            }}
          >
            Click or drag page corners • Arrow keys / Swipe to flip • 100% Mobile & PC Ready
          </div>
        </div>

        {/* Floating Desktop Side Nav Arrows */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1440px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Floating Left Neon Arrow (Desktop) */}
          <button
            onClick={handlePrev}
            disabled={currentPage <= 0}
            className="stage-side-arrow"
            style={{
              position: 'absolute',
              left: '12px',
              zIndex: 30,
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: currentPage <= 0 ? 'rgba(255, 255, 255, 0.02)' : 'rgba(10, 10, 10, 0.85)',
              border: currentPage <= 0 ? '1px solid rgba(255, 255, 255, 0.08)' : '1.5px solid rgba(255, 200, 61, 0.6)',
              color: currentPage <= 0 ? 'rgba(255, 255, 255, 0.2)' : '#FFC83D',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: currentPage <= 0 ? 'default' : 'pointer',
              boxShadow: currentPage <= 0 ? 'none' : '0 0 20px rgba(255, 200, 61, 0.35)',
              transition: 'all 0.25s ease'
            }}
            title="Previous Page"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Golden Glowing Frame Around The Book */}
          <div
            className="book-glow-stage"
            style={{
              position: 'relative',
              borderRadius: '16px',
              padding: '6px',
              boxShadow: '0 20px 80px rgba(0, 0, 0, 0.95), 0 0 35px rgba(255, 200, 61, 0.22)',
              border: '1px solid rgba(255, 200, 61, 0.35)',
              background: 'rgba(14, 14, 14, 0.75)',
              backdropFilter: 'blur(8px)'
            }}
          >
            <Magazine
              content={contentData}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              onOpenLightbox={handleOpenLightbox}
              onFlipAudio={playPageTurn}
              flipBookRef={flipBookRef}
            />
          </div>

          {/* Floating Right Neon Arrow (Desktop) */}
          <button
            onClick={handleNext}
            disabled={currentPage >= 35}
            className="stage-side-arrow"
            style={{
              position: 'absolute',
              right: '12px',
              zIndex: 30,
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: currentPage >= 35 ? 'rgba(255, 255, 255, 0.02)' : 'rgba(10, 10, 10, 0.85)',
              border: currentPage >= 35 ? '1px solid rgba(255, 255, 255, 0.08)' : '1.5px solid rgba(229, 9, 20, 0.7)',
              color: currentPage >= 35 ? 'rgba(255, 255, 255, 0.2)' : '#FF4444',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: currentPage >= 35 ? 'default' : 'pointer',
              boxShadow: currentPage >= 35 ? 'none' : '0 0 20px rgba(229, 9, 20, 0.45)',
              transition: 'all 0.25s ease'
            }}
            title="Next Page"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </section>

      {/* Netflix-Style Trending Stories Horizontal Scroll Cards */}
      <TrendingSection onJumpToPage={handleJumpAndScroll} />

      {/* Campus Highlights & Event Posters with Real High-Res Media */}
      <HighlightsGrid
        onJumpToPage={handleJumpAndScroll}
        onOpenLightbox={handleOpenLightbox}
      />

      {/* Excellence In Numbers Milestone Counters */}
      <CinematicStats />

      {/* Cinematic Institutional Footer */}
      <CinematicFooter />

      {/* Bottom Floating Navigation Toolbar with Film Timecode Counter */}
      <BottomToolbar
        currentPage={currentPage}
        totalPages={contentData.meta.totalPages || 36}
        onPrev={handlePrev}
        onNext={handleNext}
        onSliderChange={handleSliderChange}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        volume={volume}
        onChangeVolume={setVolume}
        onOpenContents={() => setIsContentsOpen(true)}
      />

      {/* Table of Contents Drawer */}
      <ContentsDrawer
        isOpen={isContentsOpen}
        onClose={() => setIsContentsOpen(false)}
        toc={contentData.toc}
        onSelectPage={(page) => {
          handleJumpAndScroll(page);
        }}
      />

      {/* High-Res Photo Lightbox Modal */}
      <LightboxModal
        isOpen={lightbox.isOpen}
        imageSrc={lightbox.src}
        caption={lightbox.caption}
        onClose={() => setLightbox({ isOpen: false, src: '', caption: '' })}
      />
    </div>
  );
}

export default App;
