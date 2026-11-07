import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  BookOpen,
  Share2,
  Sliders,
  Check
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
        text: "Read the blockbuster inaugural edition of Vaigai College of Engineering.",
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    }
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          background: 'rgba(10, 10, 10, 0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 200, 61, 0.35)',
          borderRadius: '40px',
          padding: isMobile ? '6px 12px' : '8px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '8px' : '14px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.85), 0 0 20px rgba(255, 200, 61, 0.25)',
          color: '#FFFFFF',
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
            color: '#FFC83D',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 10px',
            borderRadius: '20px',
            transition: 'background 0.2s ease'
          }}
          title="Table of Contents"
        >
          <BookOpen size={isMobile ? 18 : 19} color="#FFC83D" />
          {!isMobile && (
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem', letterSpacing: '0.1em' }}>
              INDEX
            </span>
          )}
        </button>

        <div style={{ width: '1px', height: '18px', background: 'rgba(255, 200, 61, 0.25)' }} />

        {/* Prev Page Button with Neon Glow */}
        <button
          onClick={onPrev}
          disabled={currentPage <= 0}
          className="toolbar-nav-btn"
          style={{
            background: currentPage <= 0 ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 200, 61, 0.12)',
            border: currentPage <= 0 ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 200, 61, 0.4)',
            color: currentPage <= 0 ? 'rgba(255, 255, 255, 0.25)' : '#FFC83D',
            cursor: currentPage <= 0 ? 'default' : 'pointer',
            padding: '6px 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '20px',
            transition: 'all 0.2s ease',
            boxShadow: currentPage <= 0 ? 'none' : '0 0 10px rgba(255, 200, 61, 0.3)'
          }}
          title="Previous Page (←)"
        >
          <ChevronLeft size={isMobile ? 18 : 20} />
          {!isMobile && (
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.9rem', letterSpacing: '0.08em' }}>
              PREV
            </span>
          )}
        </button>

        {/* Film Timecode Page Counter: [REC ● 01 / 36] */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {!isMobile && (
            <input
              type="range"
              min="0"
              max={totalPages - 1}
              value={currentPage}
              onChange={(e) => onSliderChange(parseInt(e.target.value, 10))}
              style={{
                width: 'clamp(60px, 10vw, 100px)',
                accentColor: '#E50914',
                cursor: 'pointer'
              }}
            />
          )}

          <div
            style={{
              fontFamily: "'Bebas Neue', monospace",
              fontSize: isMobile ? '0.95rem' : '1.05rem',
              letterSpacing: '0.12em',
              color: '#FFFFFF',
              background: 'rgba(0, 0, 0, 0.6)',
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span className="rec-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E50914' }} />
            <span>REC</span>
            <span style={{ color: '#FFC83D' }}>{String(currentPage + 1).padStart(2, '0')}</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>/</span>
            <span>{String(totalPages).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Next Page Button with Neon Glow */}
        <button
          onClick={onNext}
          disabled={currentPage >= totalPages - 1}
          className="toolbar-nav-btn"
          style={{
            background: currentPage >= totalPages - 1 ? 'rgba(255, 255, 255, 0.03)' : 'rgba(229, 9, 20, 0.15)',
            border: currentPage >= totalPages - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(229, 9, 20, 0.5)',
            color: currentPage >= totalPages - 1 ? 'rgba(255, 255, 255, 0.25)' : '#FF4444',
            cursor: currentPage >= totalPages - 1 ? 'default' : 'pointer',
            padding: '6px 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '20px',
            transition: 'all 0.2s ease',
            boxShadow: currentPage >= totalPages - 1 ? 'none' : '0 0 12px rgba(229, 9, 20, 0.35)'
          }}
          title="Next Page (→)"
        >
          {!isMobile && (
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '0.9rem', letterSpacing: '0.08em' }}>
              NEXT
            </span>
          )}
          <ChevronRight size={isMobile ? 18 : 20} />
        </button>

        <div style={{ width: '1px', height: '18px', background: 'rgba(255, 200, 61, 0.25)' }} />

        {/* Audio Mute/Unmute */}
        <button
          onClick={onToggleMute}
          style={{
            background: 'none',
            border: 'none',
            color: isMuted ? '#E50914' : '#FFC83D',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%'
          }}
          title={isMuted ? 'Unmute Audio (M)' : 'Mute Audio (M)'}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          style={{
            background: 'none',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%'
          }}
          title="Share Magazine"
        >
          <Share2 size={18} />
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          style={{
            background: 'none',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%'
          }}
          title="Toggle Fullscreen (F)"
        >
          {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>
      </div>

      {/* Share Toast Notification */}
      {showShareToast && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(10, 10, 10, 0.95)',
            border: '1px solid #FFC83D',
            color: '#FFC83D',
            padding: '8px 18px',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '1rem',
            letterSpacing: '0.1em',
            boxShadow: '0 8px 25px rgba(0,0,0,0.8), 0 0 15px rgba(255, 200, 61, 0.4)',
            zIndex: 9999
          }}
        >
          <Check size={16} /> LINK COPIED TO CLIPBOARD
        </div>
      )}

      <style>{`
        @keyframes recBlink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.8); }
        }
        .rec-dot {
          animation: recBlink 1.4s ease-in-out infinite;
          box-shadow: 0 0 8px #E50914;
        }
        .toolbar-nav-btn:hover {
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
};

export default BottomToolbar;
