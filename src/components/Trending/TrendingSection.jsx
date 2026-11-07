import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Flame, ArrowUpRight, Trophy, Zap, Award, Sparkles } from 'lucide-react';

const trendingStories = [
  {
    rank: '01',
    title: 'ANNA UNIVERSITY 8TH RANK',
    subtitle: 'S. Manoj • Department of EEE',
    desc: 'Securing 8th Rank across thousands of engineering graduates under Anna University.',
    category: 'STATE HONOUR',
    pageIndex: 15, // P16 in 1-based index
    image: '/assets/images/friend_media/image24.jpeg',
    tagColor: '#FFC83D',
    stat: 'RANK #8'
  },
  {
    rank: '02',
    title: '100+ CAMPUS PLACEMENT OFFERS',
    subtitle: 'Top Tier-1 Multi-Nationals',
    desc: 'Foxconn, Tech Mahindra, Avalon Tech, Windcare & Excel Engineering placement drives.',
    category: 'CAREER GLORY',
    pageIndex: 21, // P22 in 1-based index
    image: '/assets/images/friend_media/image29.jpeg',
    tagColor: '#00E5FF',
    stat: '100+ OFFERS'
  },
  {
    rank: '03',
    title: '15 NPTEL IIT MADRAS TOPPERS',
    subtitle: 'Elite + Silver Certifications',
    desc: 'Exceptional faculty & student distinction across cutting-edge MOOC engineering domains.',
    category: 'ACADEMIC ELITE',
    pageIndex: 17, // P18 in 1-based index
    image: '/assets/images/friend_media/image27.jpeg',
    tagColor: '#E50914',
    stat: '15 TOPPERS'
  },
  {
    rank: '04',
    title: 'IOT & INDUSTRIAL AUTOMATION',
    subtitle: 'Centre of Excellence Lab',
    desc: 'Hands-on embedded systems, sensor integration, and industrial IoT architecture training.',
    category: 'TECH SUMMIT',
    pageIndex: 7, // P8 in 1-based index
    image: '/assets/images/friend_media/image14.jpeg',
    tagColor: '#FF7A00',
    stat: 'COE WORKSHOP'
  },
  {
    rank: '05',
    title: 'CM TROPHY CHESS CHAMPION',
    subtitle: 'Maadhesh S. • Mechanical Engg',
    desc: 'Gold Medal triumph in the Tamil Nadu State Level CM Trophy Championship.',
    category: 'SPORTS GOLD',
    pageIndex: 22, // P23 in 1-based index
    image: '/assets/images/friend_media/image31.jpeg',
    tagColor: '#FFC83D',
    stat: 'GOLD MEDAL'
  },
  {
    rank: '06',
    title: 'RACE & MESA 2024 SYMPOSIUMS',
    subtitle: 'Civil & Mechanical Flagships',
    desc: 'National level engineering competitions, CAD modeling, and tech design challenges.',
    category: 'SYMPOSIUM',
    pageIndex: 5, // P6 in 1-based index
    image: '/assets/images/friend_media/image11.jpeg',
    tagColor: '#00E5FF',
    stat: '500+ DELEGATES'
  },
  {
    rank: '07',
    title: 'MEGA BLOOD DONATION CAMP',
    subtitle: 'YRC, RRC & NSS Joint Drive',
    desc: 'Over 100 units of life-saving blood collected for Government Rajaji Hospital.',
    category: 'SOCIAL IMPACT',
    pageIndex: 11, // P12 in 1-based index
    image: '/assets/images/friend_media/image19.jpeg',
    tagColor: '#E50914',
    stat: '100+ UNITS'
  },
  {
    rank: '08',
    title: 'KAVIARASU VAIRAMUTHU RECITAL',
    subtitle: 'Tamil Literary Cultural Fest',
    desc: 'Celebrating poetic heritage, oratorical finesse, and Tamil literary tradition.',
    category: 'CULTURE',
    pageIndex: 12, // P13 in 1-based index
    image: '/assets/images/friend_media/image21.jpeg',
    tagColor: '#FFC83D',
    stat: 'STATE LEVEL'
  }
];

const TrendingSection = ({ onJumpToPage }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCardClick = (pageIndex) => {
    if (onJumpToPage) {
      onJumpToPage(pageIndex);
    }
    const stage = document.getElementById('flipbook-stage');
    if (stage) {
      stage.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="trending-section"
      style={{
        width: '100%',
        padding: '80px 20px',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#E50914',
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '1rem',
                letterSpacing: '0.2em'
              }}
            >
              <Flame size={18} /> TOP PICKS OF THE ISSUE
            </div>
            <h2
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                color: '#FFFFFF',
                letterSpacing: '0.04em',
                lineHeight: 1.1,
                margin: '6px 0 0',
                textTransform: 'uppercase'
              }}
            >
              TRENDING <span style={{ color: '#FFC83D' }}>NOW</span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => scroll('left')}
              title="Scroll Left"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 200, 61, 0.2)';
                e.currentTarget.style.borderColor = '#FFC83D';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              }}
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={() => scroll('right')}
              title="Scroll Right"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 200, 61, 0.2)';
                e.currentTarget.style.borderColor = '#FFC83D';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              }}
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Netflix-Style Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="trending-scroll-row"
          style={{
            display: 'flex',
            gap: '24px',
            overflowX: 'auto',
            paddingBottom: '24px',
            paddingTop: '10px',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {trendingStories.map((story) => (
            <div
              key={story.rank}
              onClick={() => handleCardClick(story.pageIndex)}
              className="trending-card"
              style={{
                flex: '0 0 320px',
                height: '460px',
                borderRadius: '14px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                background: '#161616',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                scrollSnapAlign: 'start',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {/* Background Poster Image */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${story.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="trending-bg-zoom"
              />

              {/* Gradient Dark Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(10, 10, 10, 0.2) 0%, rgba(10, 10, 10, 0.6) 50%, rgba(10, 10, 10, 0.98) 100%)',
                  pointerEvents: 'none'
                }}
              />

              {/* Huge Outlined Rank Number (Netflix Style) */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '14px',
                  fontFamily: "'Anton', sans-serif",
                  fontSize: '5.2rem',
                  lineHeight: 0.9,
                  fontWeight: 900,
                  WebkitTextStroke: '2px rgba(255, 255, 255, 0.85)',
                  color: 'transparent',
                  textShadow: '0 4px 15px rgba(0, 0, 0, 0.8)',
                  zIndex: 2,
                  pointerEvents: 'none',
                  letterSpacing: '-0.05em'
                }}
              >
                {story.rank}
              </div>

              {/* Stat Pill Top Right */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(0, 0, 0, 0.8)',
                  backdropFilter: 'blur(8px)',
                  border: `1px solid ${story.tagColor}`,
                  color: story.tagColor,
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '0.85rem',
                  letterSpacing: '0.12em',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  zIndex: 2
                }}
              >
                {story.stat}
              </div>

              {/* Card Bottom Content */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '24px 20px',
                  zIndex: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <span
                  style={{
                    color: story.tagColor,
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase'
                  }}
                >
                  {story.category}
                </span>

                <h3
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '1.65rem',
                    lineHeight: 1.1,
                    letterSpacing: '0.06em',
                    color: '#FFFFFF',
                    margin: 0
                  }}
                >
                  {story.title}
                </h3>

                <div
                  style={{
                    fontSize: '0.82rem',
                    color: '#FFC83D',
                    fontWeight: 600,
                    letterSpacing: '0.04em'
                  }}
                >
                  {story.subtitle}
                </div>

                <p
                  style={{
                    fontSize: '0.8rem',
                    lineHeight: 1.4,
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: '4px 0 10px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {story.desc}
                </p>

                {/* Read Button */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '8px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.12)'
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '0.9rem',
                      letterSpacing: '0.12em',
                      color: '#FFF',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    OPEN IN FLIPBOOK <ArrowUpRight size={14} color="#FFC83D" />
                  </span>

                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: "'Inter', sans-serif",
                      color: 'rgba(255, 255, 255, 0.45)'
                    }}
                  >
                    PAGE {story.pageIndex + 1}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .trending-scroll-row::-webkit-scrollbar {
          display: none;
        }
        .trending-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(255, 200, 61, 0.7) !important;
          box-shadow: 0 12px 35px rgba(229, 9, 20, 0.35), 0 0 25px rgba(255, 200, 61, 0.25) !important;
        }
        .trending-card:hover .trending-bg-zoom {
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
};

export default TrendingSection;

