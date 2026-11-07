import React from 'react';
import { Sparkles, Maximize2, BookOpen, Layers, Award, Calendar } from 'lucide-react';

const highlights = [
  {
    id: 1,
    title: 'CIVIL RACE 2024 NATIONAL SYMPOSIUM',
    subtitle: 'Department of Civil Engineering',
    desc: 'Technical paper presentations, bridge design challenge, and total station survey contest.',
    pageIndex: 5, // P6
    image: '/assets/images/friend_media/image11.jpeg',
    badge: "EDITOR'S PICK",
    date: 'OCTOBER 2024',
    colSpan: 'lg:col-span-2'
  },
  {
    id: 2,
    title: 'MESA 2024 MECHANICAL CONCLAVE',
    subtitle: 'Department of Mechanical Engineering',
    desc: 'CAD design wars, technical quiz, water rocketry, and automated robot obstacle showcase.',
    pageIndex: 6, // P7
    image: '/assets/images/friend_media/image12.jpeg',
    badge: 'TECHNICAL FEST',
    date: 'NOVEMBER 2024',
    colSpan: 'lg:col-span-1'
  },
  {
    id: 3,
    title: 'TACT LEVEL-1 INDUSTRIAL CERTIFICATION',
    subtitle: 'Centre for Advanced Training',
    desc: '42 Mechanical engineering graduates certified in industrial manufacturing standards.',
    pageIndex: 9, // P10
    image: '/assets/images/friend_media/image13.jpeg',
    badge: 'INDUSTRY CERTIFIED',
    date: 'ANNUAL BATCH',
    colSpan: 'lg:col-span-1'
  },
  {
    id: 4,
    title: 'EDC ENTREPRENEURSHIP SUMMIT',
    subtitle: 'Startup & Innovation Cell',
    desc: 'Ideation bootcamps, venture funding guidance, and student enterprise incubation.',
    pageIndex: 10, // P11
    image: '/assets/images/friend_media/image15.jpeg',
    badge: 'INNOVATION',
    date: 'CAMPUS DRIVE',
    colSpan: 'lg:col-span-2'
  },
  {
    id: 5,
    title: 'ROTARACT & COMMUNITY OUTREACH',
    subtitle: 'Youth Red Cross & Social Wings',
    desc: 'Distributing education kits, planting native saplings, and village school upliftment.',
    pageIndex: 11, // P12
    image: '/assets/images/friend_media/image18.jpeg',
    badge: 'COMMUNITY',
    date: 'COMMUNITY SERVICE',
    colSpan: 'lg:col-span-1'
  },
  {
    id: 6,
    title: 'CENTRE OF EXCELLENCE IOT LAB',
    subtitle: 'Electronics & Communication',
    desc: 'Microcontroller firmware, edge cloud computing, and real-time sensor analytics.',
    pageIndex: 7, // P8
    image: '/assets/images/friend_media/image14.jpeg',
    badge: 'R&D SUMMIT',
    date: 'TECHNICAL LAB',
    colSpan: 'lg:col-span-2'
  }
];

const HighlightsGrid = ({ onJumpToPage, onOpenLightbox }) => {
  const handleOpenPage = (pageIndex) => {
    if (onJumpToPage) onJumpToPage(pageIndex);
    const stage = document.getElementById('flipbook-stage');
    if (stage) stage.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="highlights-section"
      style={{
        width: '100%',
        padding: '90px 20px',
        background: '#0a0a0a',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#FFC83D',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '1.1rem',
              letterSpacing: '0.2em',
              marginBottom: '8px'
            }}
          >
            <Sparkles size={18} /> THE SPOTLIGHT REEL
          </div>
          <h2
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
              color: '#FFFFFF',
              letterSpacing: '0.04em',
              lineHeight: 1.1,
              margin: '0 0 12px',
              textTransform: 'uppercase'
            }}
          >
            CAMPUS <span style={{ color: '#E50914' }}>HIGHLIGHTS</span> & EVENTS
          </h2>
          <p
            style={{
              color: 'rgba(255, 255, 255, 0.65)',
              fontSize: '1rem',
              maxWidth: '680px',
              margin: '0 auto'
            }}
          >
            Experience the pulse of Vaigai College of Engineering — high-octane technical symposiums, research breakthroughs, and community impact.
          </p>
        </div>

        {/* Cinematic Bento Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {highlights.map((item) => (
            <div
              key={item.id}
              className="highlight-card"
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                minHeight: '360px',
                background: '#141414',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '28px 24px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Background Photo */}
              <div
                className="highlight-bg"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'contrast(1.15) brightness(0.65)',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease'
                }}
              />

              {/* Gradient Scrim */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(10, 10, 10, 0.1) 0%, rgba(10, 10, 10, 0.7) 50%, rgba(10, 10, 10, 0.98) 100%)',
                  pointerEvents: 'none'
                }}
              />

              {/* Light leak glow */}
              <div
                style={{
                  position: 'absolute',
                  top: '-40%',
                  right: '-40%',
                  width: '300px',
                  height: '300px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 200, 61, 0.15) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }}
              />

              {/* Top Meta: Badge & Lightbox Trigger */}
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  right: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  zIndex: 2
                }}
              >
                <span
                  style={{
                    background: 'rgba(229, 9, 20, 0.88)',
                    backdropFilter: 'blur(8px)',
                    color: '#FFF',
                    fontWeight: 800,
                    fontSize: '0.68rem',
                    letterSpacing: '0.14em',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    boxShadow: '0 0 12px rgba(229, 9, 20, 0.4)'
                  }}
                >
                  {item.badge}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenLightbox) onOpenLightbox(item.image, item.title);
                  }}
                  title="Expand Full Photo"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Maximize2 size={16} />
                </button>
              </div>

              {/* Bottom Card Content */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#FFC83D',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    marginBottom: '6px'
                  }}
                >
                  <Calendar size={13} /> {item.date} • {item.subtitle}
                </div>

                <h3
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '1.8rem',
                    lineHeight: 1.15,
                    letterSpacing: '0.06em',
                    color: '#FFFFFF',
                    margin: '0 0 8px'
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.86rem',
                    lineHeight: 1.5,
                    color: 'rgba(255, 255, 255, 0.75)',
                    margin: '0 0 16px'
                  }}
                >
                  {item.desc}
                </p>

                {/* Read In Flipbook Action Button */}
                <button
                  onClick={() => handleOpenPage(item.pageIndex)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255, 200, 61, 0.12)',
                    border: '1px solid rgba(255, 200, 61, 0.4)',
                    color: '#FFC83D',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '0.95rem',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <BookOpen size={15} /> OPEN SPREAD (PAGE {item.pageIndex + 1})
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .highlight-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255, 200, 61, 0.8) !important;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.9), 0 0 25px rgba(255, 200, 61, 0.2) !important;
        }
        .highlight-card:hover .highlight-bg {
          transform: scale(1.08);
          filter: contrast(1.25) brightness(0.85);
        }
      `}</style>
    </section>
  );
};

export default HighlightsGrid;
