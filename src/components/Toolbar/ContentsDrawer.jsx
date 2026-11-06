import React from 'react';
import { X, BookOpen } from 'lucide-react';

const ContentsDrawer = ({ isOpen, onClose, toc, onSelectPage }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2200,
        background: 'rgba(10, 10, 18, 0.75)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '960px',
          maxHeight: '75vh',
          background: '#FFFDF9',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.35)',
          border: '1px solid #E6DDCF',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(27,27,47,0.1)', paddingBottom: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BookOpen size={22} color="var(--vaigai-blue)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--navy)' }}>
              Jump to Page / Section
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Spread Navigation Grid */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
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
                padding: '12px 16px',
                background: 'white',
                border: '1px solid #EADBCE',
                borderRadius: '8px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FAF4E8';
                e.currentTarget.style.borderColor = 'var(--vaigai-blue)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.borderColor = '#EADBCE';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--vaigai-red)',
                    letterSpacing: '0.05em'
                  }}
                >
                  {item.section}
                </span>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--ink)', marginTop: '2px' }}>
                  {item.title}
                </div>
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy)', marginLeft: '12px' }}>
                p. {item.page}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentsDrawer;

