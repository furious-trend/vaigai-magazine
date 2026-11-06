import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import DustCanvas from './DustCanvas';

const AmmaIntro = ({ ammaData, onPlaySentiment, onPlayMagazine, onComplete }) => {
  const [scene, setScene] = useState(1); // 1 = Scene 1 (Portrait & hotspot), 2 = Scene 2 (Handwritten Letter), 3 = Scene 3 (Transition)
  const [skippedLetterAnim, setSkippedLetterAnim] = useState(false);
  const letterLinesRef = useRef([]);
  const letterContainerRef = useRef(null);

  // Trigger sentiment song when opening the letter
  const handleTapMother = () => {
    if (onPlaySentiment) {
      onPlaySentiment();
    }
    setScene(2);
  };

  const handleSkipIntro = () => {
    if (onPlayMagazine) {
      onPlayMagazine();
    }
    setScene(3);
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  // GSAP line-by-line reveal animation in Scene 2
  useEffect(() => {
    if (scene === 2 && !skippedLetterAnim) {
      const lines = letterLinesRef.current.filter(Boolean);
      if (lines.length > 0) {
        gsap.fromTo(
          lines,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 1.2,
            ease: "power2.out"
          }
        );
      }
    }
  }, [scene, skippedLetterAnim]);

  const handleInstantReveal = () => {
    setSkippedLetterAnim(true);
    const lines = letterLinesRef.current.filter(Boolean);
    gsap.killTweensOf(lines);
    gsap.set(lines, { opacity: 1, y: 0 });
  };

  const handleOpenMagazine = () => {
    if (onPlayMagazine) {
      onPlayMagazine();
    }
    setScene(3);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'radial-gradient(circle at center, #FAF4E8 0%, #F5ECE0 60%, #EBDBC5 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transition: 'opacity 0.6s ease',
        opacity: scene === 3 ? 0 : 1
      }}
    >
      {/* Golden Dust Particles Overlay */}
      <DustCanvas />

      {/* Skip Intro Button Always Visible */}
      <button
        onClick={handleSkipIntro}
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          zIndex: 50,
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(201, 162, 75, 0.4)',
          borderRadius: '30px',
          padding: '8px 20px',
          fontFamily: 'var(--font-ui)',
          fontSize: '0.95rem',
          fontWeight: 600,
          color: 'var(--navy)',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.background = '#FFFFFF'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.85)'; }}
      >
        Skip intro →
      </button>

      {/* SCENE 1: Warm Amma Portrait with Pulsing Hotspot */}
      {scene === 1 && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: '20px'
          }}
          onClick={handleTapMother}
        >
          {/* Amma Portrait Image Container with Breathing Zoom */}
          <div
            style={{
              position: 'relative',
              maxWidth: '900px',
              width: '92vw',
              height: '68vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'gentleBreath 6s ease-in-out infinite alternate'
            }}
          >
            <img
              src="/assets/images/amma.webp"
              onError={(e) => { e.target.src = "/assets/images/amma.png"; }}
              alt="Vaigai Amma"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                mixBlendMode: 'multiply',
                filter: 'contrast(1.06) brightness(0.98)',
                pointerEvents: 'none'
              }}
            />

            {/* Pulsing Ring Hotspot placed exactly over the mother's face / VAIGAI gear */}
            <div
              style={{
                position: 'absolute',
                top: '35%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                pointerEvents: 'auto',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Outer pulsing beacon ring */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '2px solid rgba(215, 55, 43, 0.8)',
                  animation: 'pulseRing 2s cubic-bezier(0.2, 0.8, 0.2, 1) infinite'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: '12px',
                  borderRadius: '50%',
                  border: '2px solid rgba(201, 162, 75, 0.9)',
                  animation: 'pulseRing 2s cubic-bezier(0.2, 0.8, 0.2, 1) infinite 0.6s'
                }}
              />
              {/* Core golden dot */}
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FFD700, #D7372B)',
                  boxShadow: '0 0 20px rgba(215, 55, 43, 0.8)',
                  animation: 'pulseCore 1.5s ease-in-out infinite alternate'
                }}
              />
            </div>
          </div>

          {/* Bottom Captions */}
          <div style={{ textAlign: 'center', marginTop: '16px', zIndex: 10 }}>
            <div
              style={{
                fontFamily: 'var(--font-tamil)',
                fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)',
                color: 'var(--ink)',
                fontWeight: 700,
                letterSpacing: '0.02em'
              }}
              lang="ta"
            >
              {ammaData?.letter?.tamilLine || "வைகை — எங்கள் அம்மா"}
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '8px',
                background: 'rgba(20, 33, 61, 0.08)',
                padding: '6px 18px',
                borderRadius: '20px',
                fontFamily: 'var(--font-ui)',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--navy)'
              }}
            >
              <span>✨</span>
              <span>{ammaData?.letter?.tapCaption || "Tap her to read"}</span>
              <span>✨</span>
            </div>
          </div>

          <style>{`
            @keyframes gentleBreath {
              from { transform: scale(1); }
              to { transform: scale(1.035); }
            }
            @keyframes pulseRing {
              0% { transform: scale(0.6); opacity: 0.9; }
              100% { transform: scale(1.6); opacity: 0; }
            }
            @keyframes pulseCore {
              from { transform: scale(0.9); }
              to { transform: scale(1.2); }
            }
          `}</style>
        </div>
      )}

      {/* SCENE 2: The Handwritten Letter Reveal */}
      {scene === 2 && (
        <div
          ref={letterContainerRef}
          style={{
            position: 'relative',
            maxWidth: '760px',
            width: '92vw',
            maxHeight: '88vh',
            background: '#FFFDF9',
            borderRadius: '12px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.18), 0 5px 15px rgba(0,0,0,0.08)',
            border: '1px solid #EADBCE',
            padding: 'clamp(24px, 5vw, 48px)',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            zIndex: 20
          }}
        >
          {/* Top Controls: Title & Instant Skip */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px', borderBottom: '1px solid rgba(27,27,47,0.1)', paddingBottom: '16px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                fontWeight: 800,
                color: 'var(--navy)',
                lineHeight: 1.2
              }}
            >
              {ammaData?.letter?.title || "Vaigai is not just a college. She is our mother."}
            </h2>

            {!skippedLetterAnim && (
              <button
                onClick={handleInstantReveal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--ink-muted)',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  flexShrink: 0,
                  marginLeft: '12px'
                }}
              >
                Show all
              </button>
            )}
          </div>

          {/* Letter Lines in Handwritten Font (Caveat) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', flex: 1 }}>
            {ammaData?.letter?.lines?.map((line, idx) => (
              <p
                key={idx}
                ref={(el) => (letterLinesRef.current[idx] = el)}
                style={{
                  fontFamily: 'var(--font-hand)',
                  fontSize: 'clamp(1.35rem, 2.5vw, 1.85rem)',
                  lineHeight: 1.45,
                  color: idx === ammaData.letter.lines.length - 1 ? 'var(--vaigai-red)' : 'var(--ink)',
                  fontWeight: idx === ammaData.letter.lines.length - 1 ? 700 : 400
                }}
              >
                {line}
              </p>
            ))}
          </div>

          {/* CTA: Open Magazine */}
          <div style={{ marginTop: '32px', textAlign: 'center', paddingTop: '16px', borderTop: '1px solid rgba(27,27,47,0.08)' }}>
            <button
              onClick={handleOpenMagazine}
              style={{
                background: 'linear-gradient(135deg, var(--vaigai-red) 0%, #B8251A 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '35px',
                padding: '14px 38px',
                fontFamily: 'var(--font-ui)',
                fontSize: '1.15rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(215, 55, 43, 0.4)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(215, 55, 43, 0.55)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(215, 55, 43, 0.4)';
              }}
            >
              Open the magazine →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AmmaIntro;

