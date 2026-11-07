import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X, Volume2, VolumeX, Sparkles, Heart, RotateCcw, Eye, Music } from 'lucide-react';

const HeartLetterExperience = ({ isOpen, onClose, ammaData, onPlaySentiment, isMuted, onToggleMute }) => {
  const [unfolded, setUnfolded] = useState(false);
  const [revealedIndex, setRevealedIndex] = useState(0);
  const canvasRef = useRef(null);
  const letterRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const lines = useMemo(() => {
    return ammaData?.letter?.lines || [
      "Before you turn the final page, stay a moment in quiet reflection.",
      "Some institutions grant us a degree. Vaigai gave us our identity, our discipline, and our purpose.",
      "From the first morning we walked across this campus unsure of our path, to the late evenings of relentless curiosity, our teachers and mentors stood with us at every step. They never let us settle for ordinary, inspiring us always to reach higher.",
      "These classrooms sparked our intellect. These laboratories forged our technical craft. Every achievement, project, and milestone chronicled across these pages was nurtured under the guidance of visionary faculty and devoted leadership.",
      "And as we step forth into the world — gown on, scroll in hand, looking toward tomorrow — we carry the name, honour, and values of Vaigai wherever our journey leads.",
      "With deep reverence, gratitude, and everlasting pride — Vaigai College of Engineering."
    ];
  }, [ammaData]);

  // When experience opens: trigger sentiment BGM and slow progressive line reveal
  useEffect(() => {
    if (isOpen) {
      if (onPlaySentiment) {
        onPlaySentiment();
      }
      const unfoldTimer = setTimeout(() => {
        setUnfolded(true);
      }, 300);

      // Start slow sequential reveal of each line
      setRevealedIndex(1); // first line appears after unfold
      const interval = setInterval(() => {
        setRevealedIndex((prev) => {
          if (prev < lines.length) {
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 1600); // 1.6s pacing per line like a cinematic video edit

      return () => {
        clearTimeout(unfoldTimer);
        clearInterval(interval);
      };
    } else {
      setUnfolded(false);
      setRevealedIndex(0);
    }
  }, [isOpen, onPlaySentiment, lines.length]);

  // Auto-scroll gently only when later lines reveal and overflow
  useEffect(() => {
    if (scrollContainerRef.current && revealedIndex > 4) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [revealedIndex]);

  // Floating heart petals & golden dust particle canvas
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 120,
      size: Math.random() * 14 + 6,
      speedY: Math.random() * 0.85 + 0.35,
      speedX: (Math.random() - 0.5) * 0.45,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.025,
      opacity: Math.random() * 0.65 + 0.3,
      isHeart: Math.random() > 0.45
    }));

    const drawHeart = (x, y, size, opacity, rot) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      ctx.bezierCurveTo(-size / 2, -topCurveHeight, -size, topCurveHeight / 3, 0, size);
      ctx.bezierCurveTo(size, topCurveHeight / 3, size / 2, -topCurveHeight, 0, topCurveHeight);
      ctx.fillStyle = `rgba(215, 55, 43, ${opacity * 0.75})`;
      ctx.shadowColor = 'rgba(255, 215, 0, 0.45)';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y < -30) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }

        if (p.isHeart) {
          drawHeart(p.x, p.y, p.size, p.opacity, p.rotation);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.18, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 215, 0, ${p.opacity * 0.85})`;
          ctx.shadowColor = '#FFD700';
          ctx.shadowBlur = 12;
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [isOpen]);

  const handleReplay = () => {
    setRevealedIndex(0);
    setTimeout(() => {
      setRevealedIndex(1);
      const interval = setInterval(() => {
        setRevealedIndex((prev) => {
          if (prev < lines.length) {
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 1500);
    }, 200);
  };

  const handleShowAll = () => {
    setRevealedIndex(lines.length);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3000,
        background: 'radial-gradient(circle at center, rgba(16, 20, 36, 0.96) 0%, rgba(8, 10, 18, 0.99) 100%)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(8px, 2.5vw, 24px)',
        overflow: 'hidden'
      }}
      onClick={onClose}
    >
      {/* Floating Canvas Animation */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />

      {/* The Masterpiece Unfolding Letter Scroll */}
      <div
        ref={letterRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '860px',
          width: 'min(95vw, 860px)',
          maxHeight: '94vh',
          borderRadius: '18px',
          background: 'linear-gradient(180deg, #FFFDF8 0%, #FAF2E2 100%)',
          boxShadow: '0 30px 90px rgba(0,0,0,0.65), 0 0 60px rgba(201, 162, 75, 0.35)',
          border: '2.5px solid rgba(201, 162, 75, 0.8)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transform: unfolded ? 'scale(1) translateY(0)' : 'scale(0.88) translateY(35px)',
          opacity: unfolded ? 1 : 0,
          transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Subtle Watermark Art in Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: "url('/assets/images/college_tribute_bg.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 20%',
            opacity: 0.12,
            filter: 'contrast(1.15) saturate(1.1)',
            pointerEvents: 'none'
          }}
        />

        {/* Golden Corner Embellishments */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', width: '28px', height: '28px', borderTop: '3px solid var(--gold)', borderLeft: '3px solid var(--gold)', pointerEvents: 'none', zIndex: 4 }} />
        <div style={{ position: 'absolute', top: '12px', right: '12px', width: '28px', height: '28px', borderTop: '3px solid var(--gold)', borderRight: '3px solid var(--gold)', pointerEvents: 'none', zIndex: 4 }} />
        <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '28px', height: '28px', borderBottom: '3px solid var(--gold)', borderLeft: '3px solid var(--gold)', pointerEvents: 'none', zIndex: 4 }} />
        <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '28px', height: '28px', borderBottom: '3px solid var(--gold)', borderRight: '3px solid var(--gold)', pointerEvents: 'none', zIndex: 4 }} />

        {/* Modal Dedicated Top Control Bar (Never overlaps header content) */}
        <div
          style={{
            position: 'relative',
            zIndex: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'clamp(8px, 1.6vw, 12px) clamp(12px, 2.5vw, 24px)',
            background: 'linear-gradient(90deg, rgba(20, 33, 61, 0.96) 0%, rgba(16, 24, 44, 0.98) 100%)',
            borderBottom: '1.5px solid rgba(201, 162, 75, 0.5)',
            color: 'white',
            gap: '8px'
          }}
        >
          {/* Audio Sentiment Tribute Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(201, 162, 75, 0.4)',
              borderRadius: '20px',
              padding: '4px 10px',
              color: '#FFD700',
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(10px, 1.8vw, 12.5px)',
              fontWeight: 700
            }}
          >
            <Music size={13} color="#FFD700" />
            <span>Sentiment Tribute</span>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '12px' }}>
              <span className="eq-bar eq-bar-1" />
              <span className="eq-bar eq-bar-2" />
              <span className="eq-bar eq-bar-3" />
              <span className="eq-bar eq-bar-4" />
            </div>
          </div>

          {/* Action buttons: Mute + Close */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={onToggleMute}
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(8px)',
                border: '1.5px solid rgba(255, 215, 0, 0.45)',
                color: 'white',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title={isMuted ? "Unmute Music" : "Mute Music"}
            >
              {isMuted ? <VolumeX size={15} color="var(--vaigai-red)" /> : <Volume2 size={15} color="var(--gold)" />}
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'linear-gradient(135deg, #D7372B 0%, #A31D14 100%)',
                border: '1.5px solid #FFD700',
                color: 'white',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(215, 55, 43, 0.5)',
                transition: 'all 0.2s ease'
              }}
              title="Close Letter (Esc)"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Scroll Header */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            padding: 'clamp(12px, 2.2vw, 20px) clamp(14px, 3vw, 32px) clamp(10px, 1.8vw, 14px)',
            borderBottom: '1.5px solid rgba(201, 162, 75, 0.4)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            background: 'linear-gradient(180deg, rgba(255, 253, 248, 0.98) 0%, rgba(250, 242, 226, 0.92) 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '200px', flex: 1 }}>
            {/* Heart Emblem */}
            <div
              style={{
                width: 'clamp(40px, 6vw, 48px)',
                height: 'clamp(40px, 6vw, 48px)',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #D7372B 0%, #8A1710 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(215, 55, 43, 0.45)',
                border: '2px solid #FFD700',
                flexShrink: 0,
                animation: 'heartBeat 2.2s infinite'
              }}
            >
              <Heart size={22} color="#FFFDF9" fill="#FFFDF9" />
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(10px, 1.7vw, 12px)', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--vaigai-red)' }}>
                A Heartfelt Tribute • Alma Mater
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.15rem, 2.4vw, 1.75rem)', fontWeight: 800, color: 'var(--navy)', lineHeight: 1.15, margin: 0 }}>
                {ammaData?.letter?.title || "In Honour & Eternal Gratitude to Vaigai"}
              </h2>
            </div>
          </div>

          {/* Reveal Controls (Replay & Reveal All) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <button
              onClick={handleReplay}
              style={{
                background: 'rgba(20, 33, 61, 0.08)',
                border: '1px solid rgba(201, 162, 75, 0.5)',
                borderRadius: '20px',
                padding: '5px 11px',
                fontFamily: 'var(--font-ui)',
                fontSize: 'clamp(11px, 1.6vw, 12.5px)',
                fontWeight: 700,
                color: 'var(--navy)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              title="Replay slow reveal animation"
            >
              <RotateCcw size={13} />
              <span>Replay</span>
            </button>

            {revealedIndex < lines.length && (
              <button
                onClick={handleShowAll}
                style={{
                  background: 'rgba(215, 55, 43, 0.1)',
                  border: '1px solid rgba(215, 55, 43, 0.4)',
                  borderRadius: '20px',
                  padding: '5px 11px',
                  fontFamily: 'var(--font-ui)',
                  fontSize: 'clamp(11px, 1.6vw, 12.5px)',
                  fontWeight: 700,
                  color: 'var(--vaigai-red)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                title="Show all lines immediately"
              >
                <Eye size={13} />
                <span>Show All</span>
              </button>
            )}
          </div>
        </div>

        {/* Scroll Body: Cinematic Staggered Reveal */}
        <div
          ref={scrollContainerRef}
          style={{
            position: 'relative',
            zIndex: 2,
            padding: 'clamp(14px, 2.5vw, 24px) clamp(16px, 3.5vw, 36px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(12px, 2.2vw, 18px)',
            overflowY: 'auto',
            overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch',
            flex: 1
          }}
        >
          {/* Featured Graduate Artwork Showcase Card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 238, 220, 0.95) 100%)',
              border: '1.5px solid rgba(201, 162, 75, 0.55)',
              borderRadius: '14px',
              padding: 'clamp(10px, 1.8vw, 14px)',
              boxShadow: '0 8px 24px rgba(20, 33, 61, 0.08)',
              marginBottom: '4px',
              flexShrink: 0
            }}
          >
            <div
              style={{
                width: '100%',
                maxHeight: 'clamp(160px, 32vw, 260px)',
                borderRadius: '10px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                background: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(201, 162, 75, 0.3)'
              }}
            >
              <img
                src="/assets/images/college_tribute_bg.webp"
                alt="Vaigai Graduates Honouring Alma Mater"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: 'clamp(160px, 32vw, 260px)',
                  objectFit: 'contain',
                  filter: 'contrast(1.05) saturate(1.05)'
                }}
              />
            </div>
            <div
              style={{
                marginTop: '8px',
                fontFamily: 'var(--font-ui)',
                fontSize: 'clamp(11px, 2vw, 13.5px)',
                fontWeight: 800,
                color: 'var(--vaigai-red)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Sparkles size={13} color="#FFD700" />
              <span>{ammaData?.letter?.tamilLine || "வைகை பொறியியல் கல்லூரி — எங்கள் பெருமை"}</span>
              <Sparkles size={13} color="#FFD700" />
            </div>
          </div>

          {/* Staggered Lines Appearing Slowly Like a Video Edit */}
          {lines.map((line, idx) => {
            const isVisible = idx < revealedIndex;
            const isJustRevealed = idx === revealedIndex - 1;
            const isLast = idx === lines.length - 1;

            if (!isVisible) return null;

            return (
              <div
                key={idx}
                className="cinematic-line"
                style={{
                  opacity: 1,
                  transform: 'translateY(0)',
                  transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  animation: 'lineGlideIn 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                  paddingLeft: isLast ? '0' : '12px',
                  borderLeft: isLast ? 'none' : isJustRevealed ? '3px solid #FFD700' : '3px solid rgba(201, 162, 75, 0.35)',
                  background: isJustRevealed ? 'linear-gradient(90deg, rgba(255, 215, 0, 0.08) 0%, transparent 100%)' : 'transparent',
                  borderRadius: '0 8px 8px 0',
                  paddingTop: '2px',
                  paddingBottom: '2px'
                }}
              >
                {isLast ? (
                  <div
                    style={{
                      background: 'linear-gradient(135deg, rgba(215, 55, 43, 0.08) 0%, rgba(201, 162, 75, 0.12) 100%)',
                      border: '2px dashed var(--gold)',
                      borderRadius: '12px',
                      padding: '16px 20px',
                      textAlign: 'center',
                      marginTop: '8px'
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)',
                        fontWeight: 800,
                        color: 'var(--vaigai-red)',
                        lineHeight: 1.35,
                        letterSpacing: '0.02em'
                      }}
                    >
                      {line}
                    </p>
                    <div
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: 'var(--navy)',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        marginTop: '8px'
                      }}
                    >
                      Class of 2026 • Forever Vaigaians
                    </div>
                  </div>
                ) : (
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)',
                      lineHeight: 1.65,
                      color: idx === 0 ? 'var(--navy)' : 'var(--ink)',
                      fontWeight: idx === 0 ? 600 : 400
                    }}
                  >
                    {line}
                  </p>
                )}
              </div>
            );
          })}

          {/* Reveal Indicator while lines are still appearing */}
          {revealedIndex < lines.length && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--gold)',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.85rem',
                fontWeight: 700,
                padding: '6px 12px',
                borderRadius: '16px',
                background: 'rgba(201, 162, 75, 0.1)',
                width: 'fit-content'
              }}
            >
              <Sparkles size={14} className="sparkle-pulse" />
              <span>Unfolding memories... ({revealedIndex} of {lines.length})</span>
            </div>
          )}
        </div>

        {/* Scroll Footer */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            padding: '14px clamp(20px, 3.5vw, 36px)',
            borderTop: '1.5px solid rgba(201, 162, 75, 0.4)',
            background: 'rgba(250, 242, 226, 0.96)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)', fontWeight: 800, color: 'var(--vaigai-red)' }}>
            VAIGAI COLLEGE OF ENGINEERING • OUR PRIDE
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'linear-gradient(135deg, var(--navy) 0%, #101626 100%)',
              color: 'var(--gold)',
              border: '1.5px solid var(--gold)',
              padding: '8px 24px',
              borderRadius: '24px',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.92rem',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05) translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(201, 162, 75, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)';
            }}
          >
            Back to Magazine →
          </button>
        </div>
      </div>

      {/* Embedded Styles for Video-Edit Keyframes */}
      <style>{`
        @keyframes lineGlideIn {
          0% {
            opacity: 0;
            transform: translateY(22px);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }

        .sparkle-pulse {
          animation: spinPulse 2s linear infinite;
        }

        @keyframes spinPulse {
          0% { transform: rotate(0deg) scale(0.9); }
          50% { transform: rotate(180deg) scale(1.15); }
          100% { transform: rotate(360deg) scale(0.9); }
        }

        .eq-bar {
          width: 3px;
          background: #FFD700;
          border-radius: 2px;
          display: inline-block;
        }

        .eq-bar-1 { animation: eqHeight1 0.8s ease-in-out infinite; }
        .eq-bar-2 { animation: eqHeight2 1.1s ease-in-out infinite; }
        .eq-bar-3 { animation: eqHeight3 0.7s ease-in-out infinite; }
        .eq-bar-4 { animation: eqHeight4 1s ease-in-out infinite; }

        @keyframes eqHeight1 {
          0%, 100% { height: 4px; }
          50% { height: 14px; }
        }
        @keyframes eqHeight2 {
          0%, 100% { height: 12px; }
          50% { height: 5px; }
        }
        @keyframes eqHeight3 {
          0%, 100% { height: 6px; }
          50% { height: 13px; }
        }
        @keyframes eqHeight4 {
          0%, 100% { height: 10px; }
          50% { height: 3px; }
        }
      `}</style>
    </div>
  );
};

export default HeartLetterExperience;
