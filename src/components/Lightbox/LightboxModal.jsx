import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

const LightboxModal = ({ isOpen, imageSrc, caption, onClose }) => {
  const [scale, setScale] = useState(1);

  if (!isOpen || !imageSrc) return null;

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.35, 2.5));
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.35, 0.7));

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2500,
        background: 'rgba(10, 10, 18, 0.92)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      {/* Top Floating Control Bar */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 10
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleZoomIn}
          style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}
          title="Zoom In"
        >
          <ZoomIn size={20} />
        </button>
        <button
          onClick={handleZoomOut}
          style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}
          title="Zoom Out"
        >
          <ZoomOut size={20} />
        </button>
        <button
          onClick={onClose}
          style={{ background: 'rgba(215,55,43,0.85)', border: 'none', color: 'white', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}
          title="Close (Esc)"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Image */}
      <div
        style={{
          maxHeight: '82vh',
          maxWidth: '90vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageSrc}
          alt={caption || "Expanded Photo"}
          style={{
            maxWidth: '100%',
            maxHeight: '82vh',
            objectFit: 'contain',
            borderRadius: '6px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            transform: `scale(${scale})`,
            transition: 'transform 0.25s ease'
          }}
        />
      </div>

      {/* Caption at bottom */}
      {caption && (
        <div
          style={{
            marginTop: '16px',
            background: 'rgba(255, 255, 255, 0.12)',
            padding: '8px 24px',
            borderRadius: '20px',
            color: 'white',
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            textAlign: 'center',
            maxWidth: '80%'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {caption}
        </div>
      )}
    </div>
  );
};

export default LightboxModal;

