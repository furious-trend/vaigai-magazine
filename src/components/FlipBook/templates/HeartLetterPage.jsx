import React, { forwardRef } from 'react';
import PageShell from '../PageShell';
import { Heart, Sparkles, Music } from 'lucide-react';

const HeartLetterPage = forwardRef(function HeartLetterPage(
  { onOpenExperience, pageNumber = 35 },
  ref
) {
  return (
    <PageShell
      ref={ref}
      pageNumber={pageNumber}
      isLeft={false}
      showHeader={true}
      showFooter={true}
      sectionName="A TRIBUTE TO VAIGAI"
    >
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'clamp(14px, 2.2cqw, 24px) clamp(10px, 1.6cqw, 18px)',
          position: 'relative'
        }}
      >
        {/* Top Header */}
        <div style={{ textAlign: 'center', width: '100%' }}>
          <div
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(11px, 1.8cqw, 13px)',
              fontWeight: 800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--vaigai-red)',
              marginBottom: '3px'
            }}
          >
            Special Closing Folio
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(22px, 3.8cqw, 32px)',
              fontWeight: 800,
              color: 'var(--navy)',
              lineHeight: 1.15
            }}
          >
            A Heartfelt Tribute to Vaigai
          </h2>
          <div
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(12px, 1.9cqw, 15px)',
              color: 'var(--gold)',
              fontWeight: 700,
              marginTop: '4px',
              letterSpacing: '0.04em'
            }}
          >
            To Our Alma Mater • With Deep Respect & Gratitude
          </div>
        </div>

        {/* Vintage Envelope & Wax Seal Card */}
        <div
          onClick={onOpenExperience}
          style={{
            width: '98%',
            maxWidth: '540px',
            background: 'linear-gradient(135deg, #FFFDF8 0%, #F9F1E2 100%)',
            border: '2px solid rgba(201, 162, 75, 0.75)',
            borderRadius: '16px',
            boxShadow: '0 14px 40px rgba(20, 33, 61, 0.16), inset 0 0 30px rgba(201, 162, 75, 0.12)',
            padding: 'clamp(14px, 2.4cqw, 24px) clamp(14px, 2.2cqw, 22px)',
            position: 'relative',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
            margin: 'clamp(6px, 1cqw, 12px) 0'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 20px 48px rgba(215, 55, 43, 0.25), 0 0 35px rgba(201, 162, 75, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 14px 40px rgba(20, 33, 61, 0.16), inset 0 0 30px rgba(201, 162, 75, 0.12)';
          }}
        >
          {/* Decorative Corner Ornaments */}
          <div style={{ position: 'absolute', top: '10px', left: '10px', width: '22px', height: '22px', borderTop: '2px solid var(--gold)', borderLeft: '2px solid var(--gold)' }} />
          <div style={{ position: 'absolute', top: '10px', right: '10px', width: '22px', height: '22px', borderTop: '2px solid var(--gold)', borderRight: '2px solid var(--gold)' }} />
          <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '22px', height: '22px', borderBottom: '2px solid var(--gold)', borderLeft: '2px solid var(--gold)' }} />
          <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '22px', height: '22px', borderBottom: '2px solid var(--gold)', borderRight: '2px solid var(--gold)' }} />

          {/* Graduate Artwork Preview */}
          <div
            style={{
              width: '100%',
              height: 'clamp(120px, 20cqw, 160px)',
              borderRadius: '10px',
              overflow: 'hidden',
              marginBottom: '12px',
              border: '1.5px solid rgba(201, 162, 75, 0.4)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              background: '#FFFFFF'
            }}
          >
            <img
              src="/assets/images/college_tribute_bg.webp"
              alt="Vaigai Graduates"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          </div>

          {/* 3D Wax Heart Seal */}
          <div
            style={{
              width: 'clamp(58px, 10cqw, 74px)',
              height: 'clamp(58px, 10cqw, 74px)',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #FF4D3D 0%, #D7372B 50%, #8A1710 100%)',
              boxShadow: '0 8px 24px rgba(215, 55, 43, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.5), inset 0 -3px 6px rgba(0, 0, 0, 0.4)',
              border: '2.5px solid #FFD700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 3,
              marginBottom: 'clamp(8px, 1.4cqw, 14px)',
              animation: 'heartBeat 2.2s ease-in-out infinite'
            }}
          >
            <Heart size={30} color="#FFFDF9" fill="#FFFDF9" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
          </div>

          <style>{`
            @keyframes heartBeat {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.08); }
            }
          `}</style>

          {/* Letter Excerpt */}
          <p
            style={{
              fontFamily: 'var(--font-hand)',
              fontSize: 'clamp(17px, 2.8cqw, 23px)',
              lineHeight: 1.4,
              color: 'var(--ink)',
              margin: '0 0 clamp(10px, 1.6cqw, 16px)',
              maxWidth: '94%'
            }}
          >
            "Within these hallowed halls, dreams found direction and knowledge found purpose. To the mentors, teachers, and leadership that built our future — we offer our deepest gratitude..."
          </p>

          {/* Interactive Button */}
          <div
            style={{
              background: 'linear-gradient(135deg, var(--vaigai-red) 0%, #B8251A 100%)',
              color: 'white',
              borderRadius: '30px',
              padding: 'clamp(10px, 1.4cqw, 14px) clamp(20px, 2.6cqw, 28px)',
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(13px, 1.9cqw, 16px)',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 6px 20px rgba(215, 55, 43, 0.45)',
              border: '1.5px solid #FFD700',
              letterSpacing: '0.03em'
            }}
          >
            <Sparkles size={18} color="#FFD700" />
            <span>Click to Experience Letter</span>
            <Sparkles size={18} color="#FFD700" />
          </div>
        </div>

        {/* Bottom Note */}
        <div style={{ textAlign: 'center', paddingBottom: '4px' }}>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 'clamp(12px, 1.8cqw, 14px)', color: 'var(--ink-muted)', fontWeight: 600 }}>
            Tap the card above to open the full musical letter experience.
          </p>
        </div>
      </div>
    </PageShell>
  );
});

export default HeartLetterPage;
