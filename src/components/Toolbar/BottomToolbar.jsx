import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  BookOpen,
  Heart,
  Download,
  Share2,
  ZoomIn
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
  onOpenContents,
  onOpenAmmaLetter,
  onToggleZoom,
  isZoomed
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

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
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        background: 'rgba(20, 20, 32, 0.88)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(201, 162, 75, 0.35)',
        borderRadius: '40px',
        padding: '6px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        color: '#FAF4E8',
        maxWidth: '96vw',
        overflowX: 'auto'
      }}
    >
      {/* Table of Contents Drawer Button */}
      <button
        onClick={onOpenContents}
        style={{ background: 'none', border: 'none', color: '#FAF4E8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 10px', borderRadius: '20px' }}
        title="Contents Drawer"
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
      >
        <BookOpen size={18} color="var(--gold)" />
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.85rem', fontWeight: 600, display: 'none', smDisplay: 'inline' }}>
          Contents
        </span>
      </button>

      <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.15)' }} />

      {/* Prev Page */}
      <button
        onClick={onPrev}
        disabled={currentPage <= 0}
        style={{
          background: 'none',
          border: 'none',
          color: currentPage <= 0 ? 'rgba(255,255,255,0.3)' : '#FAF4E8',
          cursor: currentPage <= 0 ? 'default' : 'pointer',
          padding: '6px',
          borderRadius: '50%'
        }}
        title="Previous Page (←)"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page Slider & Counter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input
          type="range"
          min="0"
          max={totalPages - 1}
          value={currentPage}
          onChange={(e) => onSliderChange(parseInt(e.target.value, 10))}
          style={{
            width: 'clamp(60px, 12vw, 120px)',
            accentColor: 'var(--vaigai-red)',
            cursor: 'pointer'
          }}
        />
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.85rem', fontWeight: 600, color: '#FAF4E8', minWidth: '80px', textAlign: 'center' }}>
          Page {currentPage + 1} of {totalPages}
        </span>
      </div>

      {/* Next Page */}
      <button
        onClick={onNext}
        disabled={currentPage >= totalPages - 1}
        style={{
          background: 'none',
          border: 'none',
          color: currentPage >= totalPages - 1 ? 'rgba(255,255,255,0.3)' : '#FAF4E8',
          cursor: currentPage >= totalPages - 1 ? 'default' : 'pointer',
          padding: '6px',
          borderRadius: '50%'
        }}
        title="Next Page (→)"
      >
        <ChevronRight size={20} />
      </button>

      <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.15)' }} />

      {/* Audio Toggle & Volume Slider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <button
          onClick={onToggleMute}
          style={{ background: 'none', border: 'none', color: isMuted ? 'var(--vaigai-red)' : '#FAF4E8', cursor: 'pointer', padding: '6px' }}
          title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} color="var(--gold)" />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={(e) => onChangeVolume(parseFloat(e.target.value))}
          style={{
            width: '50px',
            accentColor: 'var(--gold)',
            cursor: 'pointer',
            display: 'none',
            mdDisplay: 'inline-block'
          }}
          title="Volume"
        />
      </div>

      <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.15)' }} />

      {/* Tribute Letter Button */}
      <button
        onClick={onOpenAmmaLetter}
        style={{
          background: 'rgba(215, 55, 43, 0.25)',
          border: '1px solid rgba(215, 55, 43, 0.6)',
          color: 'var(--vaigai-red)',
          borderRadius: '20px',
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer'
        }}
        title="Experience The Heart Letter (Page 35)"
      >
        <Heart size={16} fill="var(--vaigai-red)" />
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8rem', fontWeight: 600, color: '#FAF4E8' }}>
          Heart Letter
        </span>
      </button>

      {/* Download PDF */}
      <a
        href="/newsletter.pdf"
        download="Vaigais-Ikigai-Newsletter.pdf"
        style={{
          background: 'none',
          border: 'none',
          color: '#FAF4E8',
          padding: '6px',
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none'
        }}
        title="Download Original PDF"
      >
        <Download size={18} />
      </a>

      {/* Share Button */}
      <button
        onClick={handleShare}
        style={{ background: 'none', border: 'none', color: '#FAF4E8', cursor: 'pointer', padding: '6px' }}
        title="Share Link"
      >
        <Share2 size={18} />
      </button>

      {/* Fullscreen Button */}
      <button
        onClick={toggleFullscreen}
        style={{ background: 'none', border: 'none', color: '#FAF4E8', cursor: 'pointer', padding: '6px' }}
        title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
      >
        {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
      </button>

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
            padding: '4px 14px',
            borderRadius: '16px',
            fontFamily: 'var(--font-ui)',
            fontSize: '0.8rem',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}
        >
          Link copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default BottomToolbar;

