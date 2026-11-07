import React from 'react';
import { Flame, Star, Trophy, Zap, Award } from 'lucide-react';

const CinematicTicker = () => {
  const tickerItems = [
    { text: "VAIGAI'S IKIGAI VOL. 01 RELEASED", tag: 'SPECIAL', icon: Flame, color: '#E50914' },
    { text: "ANNA UNIVERSITY 8TH RANK • S. MANOJ (EEE)", tag: 'HONOUR', icon: Trophy, color: '#FFC83D' },
    { text: "100+ TOTAL PLACEMENT OFFERS ACROSS TIER-1 CORPS", tag: 'PLACEMENT', icon: Zap, color: '#00E5FF' },
    { text: "15 NPTEL IIT MADRAS TOPPERS & ELITE AWARDS", tag: 'ACADEMIC', icon: Award, color: '#FFC83D' },
    { text: "MAADHESH S. (MECH) • TAMIL NADU CM CHESS CHAMPION", tag: 'SPORTS', icon: Trophy, color: '#FF7A00' },
    { text: "NATIONAL LEVEL SYMPOSIUMS RACE '24 & MESA '24 CONCLUDED", tag: 'EVENTS', icon: Star, color: '#FFC83D' },
    { text: "24 FACULTY ENHANCEMENT DEVELOPMENT PROGRAMMES (FDP)", tag: 'RESEARCH', icon: Zap, color: '#00E5FF' },
    { text: "BLOOD DONATION CAMP • 100+ UNITS COLLECTED FOR GOVT HOSPITAL", tag: 'YRC', icon: Flame, color: '#E50914' }
  ];

  return (
    <div
      style={{
        width: '100%',
        overflow: 'hidden',
        background: 'linear-gradient(90deg, #0d0d0d 0%, #151515 50%, #0d0d0d 100%)',
        borderTop: '1px solid rgba(255, 200, 61, 0.25)',
        borderBottom: '1px solid rgba(255, 200, 61, 0.25)',
        padding: '12px 0',
        position: 'relative',
        zIndex: 20,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)'
      }}
    >
      {/* Golden Edge Gradients */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '80px',
          height: '100%',
          background: 'linear-gradient(90deg, #0a0a0a 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '80px',
          height: '100%',
          background: 'linear-gradient(270deg, #0a0a0a 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      <div className="marquee-track" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
        {/* Render twice for continuous loop */}
        {[...tickerItems, ...tickerItems].map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '0 32px'
              }}
            >
              <span
                style={{
                  background: item.color,
                  color: '#000',
                  fontWeight: 900,
                  fontSize: '0.65rem',
                  fontFamily: "'Inter', sans-serif",
                  padding: '3px 8px',
                  borderRadius: '3px',
                  letterSpacing: '0.12em',
                  boxShadow: `0 0 10px ${item.color}66`
                }}
              >
                {item.tag}
              </span>

              <span
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '1.25rem',
                  letterSpacing: '0.1em',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <IconComponent size={16} color={item.color} />
                {item.text}
              </span>

              <span style={{ color: 'rgba(255, 200, 61, 0.4)', fontSize: '1rem' }}>★</span>
            </div>
          );
        })}
      </div>

      <style>{`
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeScroll 38s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marqueeScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default CinematicTicker;
