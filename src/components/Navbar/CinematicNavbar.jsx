import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, BookOpen, Menu, Sparkles, Film } from 'lucide-react';

const CinematicNavbar = ({
  isMuted,
  onToggleMute,
  onOpenContents,
  onScrollToStage,
  onJumpToPage
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
      setIsScrolled(window.scrollY > 40);
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          background: isScrolled ? 'rgba(10, 10, 10, 0.88)' : 'rgba(10, 10, 10, 0.45)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: isScrolled ? '1px solid rgba(255, 200, 61, 0.22)' : '1px solid rgba(255, 255, 255, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Top Gold Scroll Progress Bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '2.5px',
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, #E50914 0%, #FFC83D 60%, #FFFFFF 100%)',
            boxShadow: '0 0 10px rgba(255, 200, 61, 0.8)',
            transition: 'width 0.1s linear'
          }}
        />

        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          {/* Brand Logo & Tag */}
          <div
            onClick={() => scrollTo('hero-section')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px 8px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 200, 61, 0.35)',
                boxShadow: '0 0 15px rgba(255, 200, 61, 0.25)',
                transition: 'transform 0.2s ease'
              }}
            >
              <img
                src="/assets/images/logo.webp"
                onError={(e) => { e.target.src = "/assets/images/logo.png"; }}
                alt="Vaigai Emblem"
                style={{
                  height: '40px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 6px rgba(255, 200, 61, 0.4))'
                }}
              />
            </div>

            <div>
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '1.25rem',
                  letterSpacing: '0.12em',
                  color: '#FFFFFF',
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                VAIGAI <span style={{ color: '#FFC83D' }}>IKIGAI</span>
                <span
                  style={{
                    fontSize: '0.65rem',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: 'rgba(229, 9, 20, 0.8)',
                    color: '#FFF',
                    fontWeight: 800,
                    letterSpacing: '0.08em'
                  }}
                >
                  VOL. 01
                </span>
              </div>
              <div
                style={{
                  fontSize: '0.65rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase'
                }}
              >
                College of Engineering • Blockbuster Edit
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="desktop-nav-links">
            <button
              onClick={() => scrollTo('hero-section')}
              className="cinematic-nav-link"
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '1rem',
                letterSpacing: '0.12em',
                cursor: 'pointer',
                padding: '4px 0',
                transition: 'color 0.2s ease'
              }}
            >
              INTRO
            </button>

            <button
              onClick={() => {
                if (onScrollToStage) onScrollToStage();
                else scrollTo('flipbook-stage');
              }}
              className="cinematic-nav-link"
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '1rem',
                letterSpacing: '0.12em',
                cursor: 'pointer',
                padding: '4px 0',
                transition: 'color 0.2s ease'
              }}
            >
              MAGAZINE
            </button>

            <button
              onClick={() => scrollTo('trending-section')}
              className="cinematic-nav-link"
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '1rem',
                letterSpacing: '0.12em',
                cursor: 'pointer',
                padding: '4px 0',
                transition: 'color 0.2s ease'
              }}
            >
              TRENDING NOW
            </button>

            <button
              onClick={() => scrollTo('highlights-section')}
              className="cinematic-nav-link"
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '1rem',
                letterSpacing: '0.12em',
                cursor: 'pointer',
                padding: '4px 0',
                transition: 'color 0.2s ease'
              }}
            >
              HIGHLIGHTS
            </button>

            <button
              onClick={() => {
                if (onJumpToPage) onJumpToPage(15);
                scrollTo('flipbook-stage');
              }}
              className="cinematic-nav-link"
              style={{
                background: 'none',
                border: 'none',
                color: '#FFC83D',
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '1rem',
                letterSpacing: '0.12em',
                cursor: 'pointer',
                padding: '4px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Sparkles size={14} /> HONOURS & RANKS
            </button>

            <button
              onClick={onOpenContents}
              className="cinematic-nav-link"
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '1rem',
                letterSpacing: '0.12em',
                cursor: 'pointer',
                padding: '4px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <BookOpen size={14} /> INDEX
            </button>
          </div>

          {/* Action Buttons: Audio, Fullscreen, Read CTA */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            {/* Audio Toggle */}
            <button
              onClick={onToggleMute}
              title={isMuted ? 'Unmute BGM' : 'Mute BGM'}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: isMuted ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 200, 61, 0.15)',
                border: isMuted ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(255, 200, 61, 0.5)',
                color: isMuted ? '#888' : '#FFC83D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isMuted ? 'none' : '0 0 10px rgba(255, 200, 61, 0.25)'
              }}
            >
              {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
            </button>

            {/* Fast Action CTA Button */}
            <button
              onClick={() => {
                if (onScrollToStage) onScrollToStage();
                else scrollTo('flipbook-stage');
              }}
              className="mass-cta-btn desktop-only-btn"
              style={{
                padding: '8px 18px',
                fontSize: '0.85rem',
                borderRadius: '6px',
                letterSpacing: '0.1em'
              }}
            >
              <Film size={14} /> FLIPBOOK
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFF',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              background: 'rgba(12, 12, 12, 0.98)',
              borderBottom: '1px solid rgba(255, 200, 61, 0.25)',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <button
              onClick={() => scrollTo('hero-section')}
              style={{
                textAlign: 'left',
                background: 'none',
                border: 'none',
                color: '#FFF',
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '1.2rem',
                letterSpacing: '0.1em',
                padding: '6px 0'
              }}
            >
              INTRO
            </button>
            <button
              onClick={() => {
                if (onScrollToStage) onScrollToStage();
                else scrollTo('flipbook-stage');
                setMobileMenuOpen(false);
              }}
              style={{
                textAlign: 'left',
                background: 'none',
                border: 'none',
                color: '#FFC83D',
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '1.2rem',
                letterSpacing: '0.1em',
                padding: '6px 0'
              }}
            >
              READ MAGAZINE (36 PAGES)
            </button>
            <button
              onClick={() => scrollTo('trending-section')}
              style={{
                textAlign: 'left',
                background: 'none',
                border: 'none',
                color: '#FFF',
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '1.2rem',
                letterSpacing: '0.1em',
                padding: '6px 0'
              }}
            >
              TRENDING STORIES
            </button>
            <button
              onClick={() => scrollTo('highlights-section')}
              style={{
                textAlign: 'left',
                background: 'none',
                border: 'none',
                color: '#FFF',
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '1.2rem',
                letterSpacing: '0.1em',
                padding: '6px 0'
              }}
            >
              CAMPUS HIGHLIGHTS
            </button>
            <button
              onClick={() => {
                if (onJumpToPage) onJumpToPage(15);
                scrollTo('flipbook-stage');
                setMobileMenuOpen(false);
              }}
              style={{
                textAlign: 'left',
                background: 'none',
                border: 'none',
                color: '#FFC83D',
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '1.2rem',
                letterSpacing: '0.1em',
                padding: '6px 0'
              }}
            >
              ANNA UNIV RANK HOLDERS
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContents();
              }}
              style={{
                textAlign: 'left',
                background: 'none',
                border: 'none',
                color: '#FFF',
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '1.2rem',
                letterSpacing: '0.1em',
                padding: '6px 0'
              }}
            >
              TABLE OF CONTENTS
            </button>
          </div>
        )}
      </nav>

      <style>{`
        .desktop-nav-links {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        @media (max-width: 900px) {
          .desktop-nav-links {
            display: none !important;
          }
        }
        .desktop-only-btn {
          display: inline-flex;
        }
        @media (max-width: 640px) {
          .desktop-only-btn {
            display: none !important;
          }
        }
        .mobile-menu-btn {
          display: none;
        }
        @media (max-width: 900px) {
          .mobile-menu-btn {
            display: flex !important;
          }
        }
        .cinematic-nav-link {
          position: relative;
        }
        .cinematic-nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 2px;
          background: #FFC83D;
          transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 0 8px rgba(255, 200, 61, 0.8);
        }
        .cinematic-nav-link:hover::after {
          width: 100%;
        }
        .cinematic-nav-link:hover {
          color: #FFC83D !important;
        }
      `}</style>
    </>
  );
};

export default CinematicNavbar;
