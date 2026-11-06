import React, { forwardRef, useState, useEffect } from 'react';
import PageShell from '../PageShell';

const IkigaiPage = forwardRef(function IkigaiPage({ ikigai }, ref) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % 6);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <PageShell
      ref={ref}
      pageNumber={4}
      isLeft={true}
      sectionName="INSTITUTIONAL PHILOSOPHY"
    >
      <div style={{ padding: "clamp(14px, 2.2cqw, 24px) clamp(12px, 1.8cqw, 20px)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.8cqw, 13px)", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--vaigai-red)", marginBottom: "3px" }}>
            Our Foundational Creed
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 4.6cqw, 34px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1.15 }}>
            {ikigai?.title || "What is Vaigai's Ikigai?"}
          </h2>
        </div>

        {/* Central Vaigai Emblem */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "clamp(6px, 1.2cqw, 12px) 0", position: "relative" }}>
          <div
            style={{
              width: "clamp(120px, 22cqw, 170px)",
              height: "clamp(48px, 9cqw, 68px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              filter: "drop-shadow(0 4px 14px rgba(20, 33, 61, 0.18))",
              animation: "emblemFloat 3s ease-in-out infinite"
            }}
          >
            <img
              src="/assets/images/logo.webp"
              onError={(e) => { e.target.src = "/assets/images/logo.png"; }}
              alt="Vaigai Emblem"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain"
              }}
            />
          </div>
          <style>{`
            @keyframes emblemFloat {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-3px); }
            }
          `}</style>
        </div>

        {/* The 6 V-A-I-G-A-I Pillars */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(8px, 1.3cqw, 14px)", flex: 1, justifyContent: "center" }}>
          {ikigai?.lines?.map((line, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(10px, 1.6cqw, 16px)",
                  padding: "clamp(8px, 1.2cqw, 12px) clamp(12px, 1.8cqw, 18px)",
                  borderRadius: "8px",
                  background: isActive ? "linear-gradient(90deg, rgba(201, 162, 75, 0.2), rgba(255, 255, 255, 0.9))" : "rgba(255, 255, 255, 0.7)",
                  border: isActive ? "1.5px solid var(--gold)" : "1px solid rgba(27, 27, 47, 0.08)",
                  transform: isActive ? "scale(1.02) translateX(4px)" : "scale(1)",
                  transition: "all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  boxShadow: isActive ? "0 4px 14px rgba(201, 162, 75, 0.25)" : "0 1px 3px rgba(0,0,0,0.02)"
                }}
              >
                {/* Highlighted V-A-I-G-A-I Letter */}
                <div
                  style={{
                    width: "clamp(34px, 5.5cqw, 44px)",
                    height: "clamp(34px, 5.5cqw, 44px)",
                    borderRadius: "6px",
                    background: isActive ? "var(--vaigai-red)" : "var(--navy)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(16px, 2.6cqw, 22px)",
                    fontWeight: 800,
                    flexShrink: 0,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    transition: "background 0.3s ease"
                  }}
                >
                  {line.letter}
                </div>

                {/* Meaning & Word */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(16px, 2.5cqw, 20px)", fontWeight: 800, color: "var(--ink)", lineHeight: 1.15 }}>
                    {line.word}
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "clamp(13px, 2.1cqw, 15.5px)", color: "#2A2A3E", marginTop: "2px", lineHeight: 1.4, fontWeight: 500 }}>
                    {line.text || line.meaning}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
});

export default IkigaiPage;
