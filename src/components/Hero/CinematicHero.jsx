import React, { useState, useEffect } from 'react';
import { Play, Sparkles, BookOpen, ArrowDown, Award, Flame } from 'lucide-react';

const CinematicHero = ({ onReadIssue, onExploreTrending }) => {
  const [shaking, setShaking] = useState(false);
  const [displayedTagline, setDisplayedTagline] = useState('');
  const fullTagline = "WHERE PURPOSE MEETS POSSIBILITY • THE INAUGURAL BLOCKBUSTER EDITION";

  // Typewriter effect for tagline
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedTagline(fullTagline.slice(0, index));
      index++;
      if (index > fullTagline.length) {
        clearInterval(timer);
      }
    }, 38);

    return () => clearInterval(timer);
  }, []);

  const handleReadClick = () => {
    setShaking(true);
    setTimeout(() => {
      setShaking(false);
      if (onReadIssue) onReadIssue();
    }, 380);
  };

  return (
    <section
      id="hero-section"
      className={shaking ? 'camera-shake' : ''}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#0a0a0a',
        padding: '80px 20px 40px',
        textAlign: 'center'
      }}
    >
      {/* Slow-Zoom Ken Burns Cover Background with Dark Cinematic Gradients */}
      <div
        className="ken-burns"
        style={{
          position: 'absolute',
          inset: '-5%',
          width: '110%',
          height: '110%',
          backgroundImage: "url('/assets/images/events/cover_campus_hero.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          filter: 'contrast(1.25) saturate(1.2) brightness(0.35)',
          zIndex: 0
        }}
      />

      {/* Dark Multi-layer Gradient Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(10, 10, 10, 0.4) 0%, rgba(10, 10, 10, 0.92) 75%, #0a0a0a 100%)',
          zIndex: 1
        }}
      />

      {/* Fiery & Golden Anamorphic Flares */}
      <div className="light-leak" />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '15%',
          width: '50vw',
          height: '40vh',
          background: 'radial-gradient(circle, rgba(229, 9, 20, 0.12) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Main Content Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1100px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(14px, 2.5vw, 24px)'
        }}
      >
        {/* Top Category Tag / Film Slate Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(20, 20, 20, 0.85)',
            backdropFilter: 'blur(10px)',
            border: '1.5px solid var(--border-gold)',
            borderRadius: '30px',
            padding: '6px 18px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6), 0 0 15px rgba(255, 200, 61, 0.2)'
          }}
        >
          <Flame size={15} color="#E50914" />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.75rem, 1.6vw, 0.9rem)',
              fontWeight: 800,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--gold-hero)'
            }}
          >
            VOL. 01 • INAUGURAL EDITION • JULY – AUGUST 2026
          </span>
          <Flame size={15} color="#E50914" />
        </div>

        {/* Medium-Sized Official College Logo with Golden Aura */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '4px 0 -4px'
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '120px',
              height: '70px',
              background: 'radial-gradient(circle, rgba(255, 200, 61, 0.35) 0%, rgba(229, 9, 20, 0.15) 50%, transparent 70%)',
              filter: 'blur(20px)',
              borderRadius: '50%',
              pointerEvents: 'none'
            }}
          />
          <img
            src="/assets/images/logo.webp"
            onError={(e) => { e.target.src = "/assets/images/logo.png"; }}
            alt="Vaigai College of Engineering Official Emblem"
            style={{
              height: 'clamp(60px, 8.5vw, 82px)',
              width: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 18px rgba(255, 200, 61, 0.45))',
              position: 'relative',
              zIndex: 1,
              transition: 'transform 0.3s ease'
            }}
          />
        </div>

        {/* Institution Subheading */}
        <div
          style={{
            fontFamily: 'var(--font-mass)',
            fontSize: 'clamp(1.2rem, 3.5vw, 2.4rem)',
            letterSpacing: '0.18em',
            color: '#E5E5E5',
            textTransform: 'uppercase',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)'
          }}
        >
          VAIGAI COLLEGE OF ENGINEERING
        </div>

        {/* Massive Kinetic Hero Title */}
        <h1
          className="mass-title-animate"
          style={{
            fontFamily: 'var(--font-mass)',
            fontSize: 'clamp(3.8rem, 13vw, 9.8rem)',
            lineHeight: 0.92,
            letterSpacing: '0.03em',
            color: '#FFFFFF',
            margin: '0',
            textTransform: 'uppercase',
            position: 'relative'
          }}
        >
          <span
            style={{
              background: 'linear-gradient(180deg, #FFFFFF 0%, #FFC83D 60%, #E59800 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 35px rgba(255, 200, 61, 0.55))'
            }}
          >
            VAIGAI'S IKIGAI
          </span>
        </h1>

        {/* Typewriter Tagline with Glowing Gold Terminal Bar */}
        <div
          style={{
            minHeight: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '820px'
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.95rem, 2.2vw, 1.4rem)',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: 'var(--text-light)',
              textShadow: '0 2px 8px rgba(0,0,0,0.9)'
            }}
          >
            {displayedTagline}
            <span
              style={{
                display: 'inline-block',
                width: '3px',
                height: '1.2em',
                background: 'var(--gold-hero)',
                marginLeft: '4px',
                verticalAlign: 'middle',
                boxShadow: '0 0 8px var(--gold-hero)',
                animation: 'blink 0.9s infinite'
              }}
            />
          </p>
        </div>

        {/* Action Button Strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginTop: 'clamp(10px, 2vw, 24px)'
          }}
        >
          {/* Main Blockbuster CTA: READ THE ISSUE */}
          <button
            onClick={handleReadClick}
            className="btn-fiery"
            style={{
              background: 'linear-gradient(135deg, #E50914 0%, #B81D24 50%, #7A0A10 100%)',
              border: '2px solid #FFC83D',
              color: '#FFFFFF',
              borderRadius: '40px',
              padding: 'clamp(14px, 2.2vw, 18px) clamp(28px, 4.5vw, 44px)',
              fontFamily: 'var(--font-mass)',
              fontSize: 'clamp(1.25rem, 2.4vw, 1.8rem)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              boxShadow: '0 0 35px rgba(229, 9, 20, 0.7), 0 0 50px rgba(255, 200, 61, 0.4)'
            }}
          >
            <BookOpen size={24} color="#FFC83D" />
            <span>READ THE ISSUE</span>
            <Sparkles size={20} color="#FFC83D" />
          </button>

          {/* Secondary CTA: TRENDING NOW */}
          <button
            onClick={onExploreTrending}
            style={{
              background: 'rgba(25, 25, 25, 0.75)',
              backdropFilter: 'blur(12px)',
              border: '1.5px solid rgba(255, 200, 61, 0.45)',
              color: 'var(--text-light)',
              borderRadius: '40px',
              padding: 'clamp(14px, 2.2vw, 18px) clamp(24px, 3.5vw, 36px)',
              fontFamily: 'var(--font-mass)',
              fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--gold-hero)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 200, 61, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 200, 61, 0.45)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span>TRENDING STORIES</span>
            <ArrowDown size={18} color="var(--gold-hero)" />
          </button>
        </div>

        {/* Film Reel Stats Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 'clamp(14px, 3vw, 36px)',
            marginTop: 'clamp(16px, 3vw, 32px)',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.78rem, 1.6vw, 0.92rem)',
            fontWeight: 700,
            color: 'var(--text-muted)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase'
          }}
        >
          <span>🎞️ 36 ARCHIVAL PAGES</span>
          <span>✦ 18 MILESTONE EVENTS</span>
          <span>💼 100+ PLACEMENTS</span>
          <span>🏅 15 IIT TOPPERS</span>
        </div>
      </div>
    </section>
  );
};

export default CinematicHero;
