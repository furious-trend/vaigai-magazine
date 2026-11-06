import React from 'react';
import { X, Heart } from 'lucide-react';

const AmmaLetterModal = ({ isOpen, onClose, ammaData }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(15, 15, 25, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: '740px',
          width: '100%',
          maxHeight: '90vh',
          background: '#FFFDF9',
          borderRadius: '12px',
          boxShadow: '0 25px 70px rgba(0,0,0,0.3)',
          border: '1px solid #E6DDCF',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Artwork */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: "url('/assets/images/amma-letter-bg.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            opacity: 0.18,
            pointerEvents: 'none'
          }}
        />

        {/* Modal Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            padding: 'clamp(24px, 4vw, 36px)',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto'
          }}
        >
          {/* Modal Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(27,27,47,0.1)', paddingBottom: '14px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Heart size={24} color="var(--vaigai-red)" fill="var(--vaigai-red)" />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--navy)' }}>
                A Tribute to Vaigai
              </h3>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--ink-muted)',
                padding: '4px'
              }}
            >
              <X size={24} />
            </button>
          </div>

          {/* Letter Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {ammaData?.letter?.lines?.map((line, idx) => (
              <p
                key={idx}
                style={{
                  fontFamily: 'var(--font-hand)',
                  fontSize: '1.5rem',
                  lineHeight: 1.5,
                  color: idx === ammaData.letter.lines.length - 1 ? 'var(--vaigai-red)' : 'var(--ink)',
                  fontWeight: idx === ammaData.letter.lines.length - 1 ? 700 : 400
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmmaLetterModal;
