import React from 'react';
import { ArrowUp, BookOpen, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

const CinematicFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        width: '100%',
        background: '#070707',
        borderTop: '1px solid rgba(255, 200, 61, 0.2)',
        padding: '60px 20px 40px',
        position: 'relative',
        zIndex: 10,
        color: '#FFFFFF'
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px',
            marginBottom: '40px'
          }}
        >
          {/* Col 1: Brand & Identity */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img
                src="/assets/images/logo.webp"
                onError={(e) => { e.target.src = "/assets/images/logo.png"; }}
                alt="Vaigai Crest"
                style={{ height: '48px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 2px 8px rgba(255, 200, 61, 0.35))' }}
              />
              <div>
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '1.4rem',
                    letterSpacing: '0.12em'
                  }}
                >
                  VAIGAI COLLEGE OF ENGINEERING
                </div>
                <div
                  style={{
                    fontSize: '0.7rem',
                    color: '#FFC83D',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase'
                  }}
                >
                  AICTE Approved • Affiliated to Anna University
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.6 }}>
              Therkutheru, Melur Taluk, Madurai — 625 122, Tamil Nadu.
              Dedicated to imparting transformative engineering education, cutting-edge technical innovation, and value-driven leadership.
            </p>
          </div>

          {/* Col 2: Magazine Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '1.2rem',
                letterSpacing: '0.14em',
                color: '#FFC83D',
                marginBottom: '16px'
              }}
            >
              IKIGAI EDITION SPECIFICATIONS
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: 2
              }}
            >
              <li>• Volume 01 — Inaugural Blockbuster Edition</li>
              <li>• Total Pagination: 36 Master Pages</li>
              <li>• Official Website: <a href="https://vaigaice.deti.in" target="_blank" rel="noreferrer" style={{ color: '#00E5FF', textDecoration: 'none' }}>vaigaice.deti.in</a></li>
              <li>• 100% Mobile Phone & Desktop Responsive Experience</li>
            </ul>
          </div>

          {/* Col 3: Editorial Accreditation */}
          <div>
            <h4
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '1.2rem',
                letterSpacing: '0.14em',
                color: '#FFC83D',
                marginBottom: '16px'
              }}
            >
              EXECUTIVE PATRONAGE
            </h4>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
              <div style={{ fontWeight: 700, color: '#FFF' }}>Dr. R. SIVARANJANI, M.E., Ph.D.</div>
              <div style={{ fontSize: '0.78rem', color: '#FFC83D', marginBottom: '8px' }}>Principal & Patron</div>
              <div style={{ fontWeight: 700, color: '#FFF' }}>Editorial Committee & HOD Council</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.5)' }}>Civil • Mech • EEE • ECE • CSE • S&H</div>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.45)' }}>
            © {new Date().getFullYear()} Vaigai College of Engineering. All Rights Reserved. Ikigai Magazine Vol. 01.
          </div>

          <button
            onClick={scrollToTop}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 200, 61, 0.15)',
              border: '1px solid rgba(255, 200, 61, 0.4)',
              color: '#FFC83D',
              padding: '6px 14px',
              borderRadius: '20px',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '0.9rem',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            BACK TO TOP <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default CinematicFooter;

