import React from 'react';
import { Award, Zap, Trophy, BookOpen, Users, Star } from 'lucide-react';

const stats = [
  {
    value: '36',
    label: 'MAGAZINE PAGES',
    desc: 'Blockbuster Inaugural Edition',
    icon: BookOpen,
    color: '#FFC83D'
  },
  {
    value: '100+',
    label: 'PLACEMENT OFFERS',
    desc: 'Foxconn, Tech M, Avalon & Tier-1s',
    icon: Zap,
    color: '#00E5FF'
  },
  {
    value: '#8',
    label: 'ANNA UNIV RANK',
    desc: 'S. Manoj (EEE) State Distinction',
    icon: Trophy,
    color: '#FFC83D'
  },
  {
    value: '15',
    label: 'NPTEL IIT TOPPERS',
    desc: 'Elite Gold & Silver Scholars',
    icon: Award,
    color: '#E50914'
  },
  {
    value: '24',
    label: 'FDP PROGRAMMES',
    desc: 'Advanced Faculty Development',
    icon: Users,
    color: '#00E5FF'
  },
  {
    value: '100%',
    label: 'DEDICATED GLORY',
    desc: 'Vaigai College of Engineering',
    icon: Star,
    color: '#FF7A00'
  }
];

const CinematicStats = () => {
  return (
    <section
      style={{
        width: '100%',
        padding: '70px 20px',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #121212 50%, #0a0a0a 100%)',
        borderTop: '1px solid rgba(255, 200, 61, 0.15)',
        borderBottom: '1px solid rgba(255, 200, 61, 0.15)',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '1rem',
              letterSpacing: '0.22em',
              color: '#E50914',
              textTransform: 'uppercase'
            }}
          >
            THE BENCHMARK OF EXCELLENCE
          </span>
          <h2
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              color: '#FFFFFF',
              letterSpacing: '0.04em',
              margin: '4px 0 0'
            }}
          >
            NUMBERS THAT DEFINE OUR <span style={{ color: '#FFC83D' }}>LEGACY</span>
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '24px 20px',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 200, 61, 0.6)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.8), 0 0 15px rgba(255, 200, 61, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.04)',
                    color: stat.color,
                    marginBottom: '12px'
                  }}
                >
                  <Icon size={20} />
                </div>

                <div
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: '3rem',
                    lineHeight: 1,
                    color: '#FFFFFF',
                    letterSpacing: '0.02em',
                    marginBottom: '6px',
                    textShadow: `0 0 20px ${stat.color}44`
                  }}
                >
                  {stat.value}
                </div>

                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '1.15rem',
                    letterSpacing: '0.1em',
                    color: stat.color,
                    marginBottom: '4px'
                  }}
                >
                  {stat.label}
                </div>

                <div
                  style={{
                    fontSize: '0.78rem',
                    color: 'rgba(255, 255, 255, 0.55)',
                    lineHeight: 1.3
                  }}
                >
                  {stat.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CinematicStats;
