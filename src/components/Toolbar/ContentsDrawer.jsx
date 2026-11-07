import React from 'react';
import { X, BookOpen, ChevronRight, Film } from 'lucide-react';

const ContentsDrawer = ({ isOpen, onClose, toc, onSelectPage }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2200,
        background: 'rgba(5, 5, 5, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1000px',
          maxHeight: '80vh',
          background: '#111111',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          boxShadow: '0 -15px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(255, 200, 61, 0.15)',
          border: '1px solid rgba(255, 200, 61, 0.3)',
          borderBottom: 'none',
          padding: '28px 24px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            paddingBottom: '16px',
            marginBottom: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(255, 200, 61, 0.15)',
                border: '1px solid rgba(255, 200, 61, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFC83D'
              }}
            >
              <Film size={20} />
            </div>
            <div>
              <h3
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '1.6rem',
                  letterSpacing: '0.08em',
                  color: '#FFFFFF',
                  margin: 0,
                  lineHeight: 1
                }}
              >
                TABLE OF <span style={{ color: '#FFC83D' }}>CONTENTS</span>
              </h3>
              <div
                style={{
                  fontSize: '0.72rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase'
                }}
              >
                Select Any Section To Jump Instantly In The Flipbook
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              cursor: 'pointer',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Spread Navigation Grid */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '12px',
            paddingRight: '6px'
          }}
        >
          {toc?.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                onSelectPage(item.page - 1);
                onClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 200, 61, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(255, 200, 61, 0.6)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.7rem',
                    color: '#FFC83D',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: '2px'
                  }}
                >
                  {item.category || 'FEATURE'}
                </span>
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '1.15rem',
                    letterSpacing: '0.04em',
                    color: '#FFFFFF'
                  }}
                >
                  {item.title}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontFamily: "'Bebas Neue', monospace",
                    color: 'rgba(255, 255, 255, 0.5)',
                    background: 'rgba(0, 0, 0, 0.5)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  P.{item.page}
                </span>
                <ChevronRight size={16} color="#FFC83D" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentsDrawer;
