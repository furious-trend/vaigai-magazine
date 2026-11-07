import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  BookOpen,
  Download,
  Share2,
  MoreHorizontal,
  X
} from 'lucide-react';

const BottomToolbar = ({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  onSliderChange,
  isMuted,
  onToggleMute,
  volume,
  onChangeVolume,
  onOpenContents
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 640);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "VAIGAI'S IKIGAI — Digital Magazine",
        text: "Read the official newsletter of Vaigai College of Engineering.",
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    }
    setShowMobileMenu(false);
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          background: 'rgba(16, 20, 36, 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1.5px solid rgba(201, 162, 75, 0.45)',
          borderRadius: '40px',
          padding: isMobile ? '4px 10px' : '6px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '6px' : '10px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 15px rgba(201, 162, 75, 0.2)',
          color: '#FAF4E8',
          maxWidth: '96vw',
          userSelect: 'none'
        }}
      >
        {/* Table of Contents Drawer Button */}
        <button
          onClick={onOpenContents}
          style={{
            background: 'none',
            border: 'none',
            color: '#FAF4E8',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '8px 10px',
            borderRadius: '20px',
            transition: 'background 0.2s ease'
          }}
          title="Contents Drawer"
        >
          <BookOpen size={isMobile ? 18 : 19} color="var(--gold)" />
          {!isMobile && (
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.85rem', fontWeight: 600 }}>
              Contents
            </span>
          )}
        </button>

        <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.18)' }} />

        {/* Prev Page Button */}
        <button
          onClick={onPrev}
          disabled={currentPage <= 0}
          style={{
            background: 'none',
            border: 'none',
            color: currentPage <= 0 ? 'rgba(255,255,255,0.25)' : '#FAF4E8',
            cursor: currentPage <= 0 ? 'default' : 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%'
          }}
          title="Previous Page (←)"
        >
          <ChevronLeft size={isMobile ? 20 : 22} />
        </button>

        {/* Page Counter & Range Slider (Slider on Desktop, Compact text on Mobile) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {!isMobile && (
            <input
              type="range"
              min="0"
              max={totalPages - 1}
              value={currentPage}
              onChange={(e) => onSliderChange(parseInt(e.target.value, 10))}
              style={{
                width: 'clamp(60px, 12vw, 110px)',
                accentColor: 'var(--vaigai-red)',
                cursor: 'pointer'
              }}
            />
          )}
          <span
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: isMobile ? '0.82rem' : '0.88rem',
              fontWeight: 700,
              color: '#FAF4E8',
              minWidth: isMobile ? '65px' : '85px',
              textAlign: 'center',
              letterSpacing: '0.02em'
            }}
          >
            {currentPage + 1} / {totalPages}
          </span>
        </div>

        {/* Next Page Button */}
        <button
          onClick={onNext}
          disabled={currentPage >= totalPages - 1}
          style={{
            background: 'none',
            border: 'none',
            color: currentPage >= totalPages - 1 ? 'rgba(255,255,255,0.25)' : '#FAF4E8',
            cursor: currentPage >= totalPages - 1 ? 'default' : 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%'
          }}
          title="Next Page (→)"
        >
          <ChevronRight size={isMobile ? 20 : 22} />
        </button>

        <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.18)' }} />

        {/* Audio Mute/Unmute */}
        <button
          onClick={onToggleMute}
          style={{
            background: 'none',
            border: 'none',
            color: isMuted ? 'var(--vaigai-red)' : '#FAF4E8',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
        >
          {isMuted ? <VolumeX size={18} color="var(--vaigai-red)" /> : <Volume2 size={18} color="var(--gold)" />}
        </button>

        {/* Desktop-only Direct Action Buttons */}
        {!isMobile ? (
          <>
            <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.18)' }} />
            <a
              href="/newsletter.pdf"
              download="Vaigais-Ikigai-Newsletter.pdf"
              style={{ background: 'none', border: 'none', color: '#FAF4E8', padding: '8px', display: 'flex', alignItems: 'center', textDecoration: 'none' }}
              title="Download Original PDF"
            >
              <Download size={18} />
            </a>
            <button
              onClick={handleShare}
              style={{ background: 'none', border: 'none', color: '#FAF4E8', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center' }}
              title="Share Link"
            >
              <Share2 size={18} />
            </button>
            <button
              onClick={toggleFullscreen}
              style={{ background: 'none', border: 'none', color: '#FAF4E8', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center' }}
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          </>
        ) : (
          /* Mobile More (...) Menu Button */
          <button
            onClick={() => setShowMobileMenu((prev) => !prev)}
            style={{
              background: showMobileMenu ? 'rgba(255,255,255,0.2)' : 'none',
              border: 'none',
              color: '#FAF4E8',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%'
            }}
            title="More Options"
          >
            <MoreHorizontal size={18} />
          </button>
        )}

        {/* Share Toast Notification */}
        {showShareToast && (
          <div
            style={{
              position: 'absolute',
              top: '-42px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--navy)',
              color: 'white',
              padding: '5px 16px',
              borderRadius: '16px',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.82rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
              border: '1px solid var(--gold)'
            }}
          >
            Link copied to clipboard!
          </div>
        )}
      </div>

      {/* Mobile Popover Menu */}
      {isMobile && showMobileMenu && (
        <div
          style={{
            position: 'fixed',
            bottom: '65px',
            right: '16px',
            zIndex: 110,
            background: 'rgba(16, 20, 36, 0.96)',
            backdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(201, 162, 75, 0.5)',
            borderRadius: '16px',
            padding: '10px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            boxShadow: '0 12px 36px rgba(0,0,0,0.6)',
            color: '#FAF4E8',
            minWidth: '180px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '6px' }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase' }}>
              Options
            </span>
            <button
              onClick={() => setShowMobileMenu(false)}
              style={{ background: 'none', border: 'none', color: '#FAF4E8', cursor: 'pointer', padding: '2px' }}
            >
              <X size={16} />
            </button>
          </div>

          <a
            href="/newsletter.pdf"
            download="Vaigais-Ikigai-Newsletter.pdf"
            onClick={() => setShowMobileMenu(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#FAF4E8',
              textDecoration: 'none',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.85rem',
              padding: '6px 4px'
            }}
          >
            <Download size={16} color="var(--gold)" />
            <span>Download PDF</span>
          </a>

          <button
            onClick={handleShare}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'none',
              border: 'none',
              color: '#FAF4E8',
              cursor: 'pointer',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.85rem',
              padding: '6px 4px'
            }}
          >
            <Share2 size={16} color="var(--gold)" />
            <span>Share Link</span>
          </button>

          <button
            onClick={() => {
              toggleFullscreen();
              setShowMobileMenu(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'none',
              border: 'none',
              color: '#FAF4E8',
              cursor: 'pointer',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.85rem',
              padding: '6px 4px'
            }}
          >
            {isFullscreen ? <Minimize2 size={16} color="var(--gold)" /> : <Maximize2 size={16} color="var(--gold)" />}
            <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>
        </div>
      )}
    </>
  );
};

export default BottomToolbar;
