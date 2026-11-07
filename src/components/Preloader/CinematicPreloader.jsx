import React, { useState, useEffect } from 'react';

const CinematicPreloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [flash, setFlash] = useState(false);
  const [shockwave, setShockwave] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Accelerating digital counter
      const increment = Math.max(1, Math.floor((100 - current) * 0.12) + Math.floor(Math.random() * 4));
      current = Math.min(100, current + increment);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        // Visual bass drop effect
        setShockwave(true);
        setFlash(true);
        setTimeout(() => setFlash(false), 120);

        setTimeout(() => {
          setExiting(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600);
        }, 400);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(1.04)' : 'scale(1)',
        filter: exiting ? 'blur(6px)' : 'none',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s ease',
        pointerEvents: exiting ? 'none' : 'auto'
      }}
    >
      {/* Screen Flash on 100% */}
      {flash && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'white',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Shockwave Ring */}
      {shockwave && (
        <div
          className="shockwave-ring"
          style={{
            width: '240px',
            height: '240px'
          }}
        />
      )}

      {/* Central Vaigai Crest with Golden Aura */}
      <div
        style={{
          position: 'relative',
          width: '140px',
          height: '95px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '-10px',
            background: 'radial-gradient(circle, rgba(255, 200, 61, 0.4) 0%, transparent 70%)',
            filter: 'blur(16px)',
            borderRadius: '50%'
          }}
        />
        <img
          src="/assets/images/logo.webp"
          alt="Vaigai Crest"
          onError={(e) => { e.target.src = '/assets/images/logo.png'; }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            position: 'relative',
            zIndex: 2,
            filter: 'drop-shadow(0 0 20px rgba(255, 200, 61, 0.6))'
          }}
        />
      </div>

      {/* Film Slate Meta */}
      <div
        style={{
          fontFamily: 'var(--font-mass)',
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          letterSpacing: '0.25em',
          color: 'var(--gold-hero)',
          textTransform: 'uppercase',
          marginBottom: '8px'
        }}
      >
        VAIGAI COLLEGE OF ENGINEERING
      </div>

      {/* 0 -> 100% Digital Counter */}
      <div
        style={{
          fontFamily: 'var(--font-mass)',
          fontSize: 'clamp(3.5rem, 9vw, 6.5rem)',
          lineHeight: 1,
          color: 'var(--text-light)',
          textShadow: '0 0 25px rgba(255, 200, 61, 0.5), 0 0 50px rgba(229, 9, 20, 0.4)',
          letterSpacing: '0.04em'
        }}
      >
        {progress}%
      </div>

      {/* Progress Bar Line */}
      <div
        style={{
          width: 'clamp(200px, 40vw, 320px)',
          height: '3px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '3px',
          overflow: 'hidden',
          marginTop: '16px'
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #E50914 0%, #FFC83D 100%)',
            boxShadow: '0 0 10px #FFC83D',
            transition: 'width 0.1s linear'
          }}
        />
      </div>

      <div
        style={{
          marginTop: '14px',
          fontFamily: 'var(--font-body)',
          fontSize: '0.78rem',
          letterSpacing: '0.14em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase'
        }}
      >
        Loading Blockbuster Issue • Vol. 01
      </div>
    </div>
  );
};

export default CinematicPreloader;

