import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';

import contentData from './data/content.json';

import Magazine from './components/FlipBook/Magazine';
import LightboxModal from './components/Lightbox/LightboxModal';
import BottomToolbar from './components/Toolbar/BottomToolbar';
import ContentsDrawer from './components/Toolbar/ContentsDrawer';
import AmbientBackground from './components/AmbientCanvas/AmbientBackground';
import { useAudio } from './hooks/useAudio';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isContentsOpen, setIsContentsOpen] = useState(false);
  const [lightbox, setLightbox] = useState({ isOpen: false, src: '', caption: '' });
  const [confettiFired, setConfettiFired] = useState({});
  const [hasInteracted, setHasInteracted] = useState(false);

  const flipBookRef = useRef(null);
  const {
    isMuted,
    volume,
    setVolume,
    playMagazineBgm,
    playPageTurn,
    toggleMute
  } = useAudio();

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

    // Expose programmatic navigation helper for test harnesses and deep links
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
        colors: ['#D7372B', '#C9A24B', '#1F7AB8', '#14213D']
      });
      setConfettiFired((prev) => ({ ...prev, [newPage]: true }));
    }
  }, [confettiFired]);

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

  const handlePrev = () => flipBookRef.current?.pageFlip()?.flipPrev();
  const handleNext = () => flipBookRef.current?.pageFlip()?.flipNext();
  const handleSliderChange = (page) => flipBookRef.current?.pageFlip()?.flip(page);

  const handleOpenLightbox = (src, caption) => {
    setLightbox({ isOpen: true, src, caption });
  };

  return (
    <div
      onClick={handleUserInteraction}
      style={{
        width: '100vw',
        height: '100dvh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Magical Ambient Canvas Background */}
      <AmbientBackground />

      {/* Main 36-Page Magazine Flipbook */}
      <main
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: '60px' // room for bottom toolbar
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
      </main>

      {/* Bottom Floating Navigation Toolbar */}
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
          flipBookRef.current?.pageFlip()?.flip(page);
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
