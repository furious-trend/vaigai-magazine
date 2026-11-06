import React, { forwardRef } from 'react';
import PageShell from '../PageShell';
import { BookOpen, Sparkles, ArrowRight } from 'lucide-react';

const CoverPage = forwardRef(function CoverPage({ meta, onOpen }, ref) {
  return (
    <PageShell
      ref={ref}
      pageNumber={1}
      isLeft={false}
      showHeader={false}
      showFooter={false}
      className="cover-page"
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "clamp(20px, 3.5cqw, 36px)",
          background: "linear-gradient(180deg, #FFFDF9 0%, #FAF4E8 60%, #F5EBD8 100%)",
          position: "relative",
          border: "2px solid rgba(201, 162, 75, 0.4)",
          boxShadow: "inset 0 0 50px rgba(20, 33, 61, 0.06)"
        }}
      >
        {/* Decorative Golden Corner Borders */}
        <div style={{ position: "absolute", top: "12px", left: "12px", width: "24px", height: "24px", borderTop: "2.5px solid var(--gold)", borderLeft: "2.5px solid var(--gold)" }} />
        <div style={{ position: "absolute", top: "12px", right: "12px", width: "24px", height: "24px", borderTop: "2.5px solid var(--gold)", borderRight: "2.5px solid var(--gold)" }} />
        <div style={{ position: "absolute", bottom: "12px", left: "12px", width: "24px", height: "24px", borderBottom: "2.5px solid var(--gold)", borderLeft: "2.5px solid var(--gold)" }} />
        <div style={{ position: "absolute", bottom: "12px", right: "12px", width: "24px", height: "24px", borderBottom: "2.5px solid var(--gold)", borderRight: "2.5px solid var(--gold)" }} />

        {/* Top Header & Logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "2px solid var(--navy)", paddingBottom: "clamp(8px, 1.4cqw, 16px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(10px, 1.8cqw, 16px)" }}>
            <img
              src="/assets/images/logo.webp"
              onError={(e) => { e.target.src = "/assets/images/logo.png"; }}
              alt="Vaigai Logo"
              style={{ width: "clamp(60px, 10cqw, 85px)", height: "auto", objectFit: "contain", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.15))" }}
            />
            <div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(18px, 3.2cqw, 24px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1.15 }}>
                VAIGAI COLLEGE OF ENGINEERING
              </h2>
              <p style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.8cqw, 13px)", color: "var(--ink-muted)", letterSpacing: "0.04em", marginTop: "2px" }}>
                Approved by AICTE, New Delhi & Affiliated to Anna University, Chennai
              </p>
            </div>
          </div>
          <div style={{ textAlign: "right", fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.8cqw, 13px)", fontWeight: 700, color: "var(--vaigai-red)", textTransform: "uppercase" }}>
            <div style={{ letterSpacing: "0.1em" }}>{meta?.volume || "VOL. 01"} • {meta?.issue || "ISSUE 01"}</div>
            <div style={{ color: "var(--navy)", fontSize: "clamp(10px, 1.6cqw, 12px)", marginTop: "2px" }}>{meta?.period || "JULY – AUGUST 2026"}</div>
          </div>
        </div>

        {/* Big Masthead */}
        <div style={{ textAlign: "center", margin: "clamp(8px, 1.5cqw, 16px) 0" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(12px, 2cqw, 15px)", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--vaigai-blue-dark)", fontWeight: 700, marginBottom: "4px" }}>
            The Bimonthly Newsletter
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(38px, 8.2cqw, 62px)",
              fontWeight: 900,
              background: "linear-gradient(135deg, #14213D 0%, #1F7AB8 50%, #C9A24B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              textShadow: "0 2px 10px rgba(20, 33, 61, 0.15)"
            }}
          >
            VAIGAI'S IKIGAI
          </h1>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(16px, 3cqw, 22px)",
              color: "var(--vaigai-red)",
              marginTop: "4px",
              fontWeight: 600
            }}
          >
            Where Purpose Meets Possibility.
          </p>
        </div>

        {/* Campus Hero Image with Overlay & Call to Action */}
        <div
          style={{
            flex: 1,
            position: "relative",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 12px 32px rgba(20, 33, 61, 0.25)",
            border: "3px solid #FFFFFF",
            minHeight: "240px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end"
          }}
        >
          <img
            src="/assets/images/events/cover_campus_hero.webp"
            alt="Vaigai College Campus"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "contrast(1.05) saturate(1.1)",
              transition: "transform 0.6s ease"
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 2,
              background: "linear-gradient(180deg, transparent 0%, rgba(16, 27, 51, 0.75) 35%, rgba(10, 16, 32, 0.98) 100%)",
              padding: "clamp(16px, 2.8cqw, 24px)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px"
            }}
          >
            <div>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.8cqw, 13px)", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700 }}>
                Official Inaugural Publication
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(16px, 2.8cqw, 22px)", fontWeight: 800, marginTop: "2px" }}>
                Vaigai College of Engineering • Madurai
              </div>
            </div>

            {/* Click to Open / Continue Button */}
            <button
              onClick={onOpen}
              style={{
                background: "linear-gradient(135deg, #D7372B 0%, #B8251A 100%)",
                border: "2px solid #FFD700",
                color: "white",
                borderRadius: "32px",
                padding: "clamp(10px, 1.6cqw, 14px) clamp(18px, 2.6cqw, 26px)",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                boxShadow: "0 6px 22px rgba(215, 55, 43, 0.55), 0 0 18px rgba(255, 215, 0, 0.35)",
                transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
                fontFamily: "var(--font-ui)",
                fontSize: "clamp(13px, 2cqw, 16px)",
                fontWeight: 800,
                letterSpacing: "0.03em",
                flexShrink: 0,
                animation: "openPulse 2.2s infinite"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.06) translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(215, 55, 43, 0.75), 0 0 28px rgba(255, 215, 0, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1) translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 22px rgba(215, 55, 43, 0.55), 0 0 18px rgba(255, 215, 0, 0.35)";
              }}
            >
              <BookOpen size={18} color="#FFD700" />
              <span>Click to Continue & Open</span>
              <ArrowRight size={18} color="#FFD700" />
            </button>
          </div>
        </div>

        <style>{`
          @keyframes openPulse {
            0%, 100% {
              box-shadow: 0 6px 20px rgba(215, 55, 43, 0.5), 0 0 15px rgba(255, 215, 0, 0.3);
            }
            50% {
              box-shadow: 0 8px 26px rgba(215, 55, 43, 0.8), 0 0 25px rgba(255, 215, 0, 0.6);
            }
          }
        `}</style>

        {/* Cover Footer Strip */}
        <div
          style={{
            marginTop: "clamp(10px, 1.8cqw, 16px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "var(--font-ui)",
            fontSize: "clamp(11px, 1.8cqw, 13px)",
            color: "var(--ink-muted)",
            borderTop: "1px solid rgba(27, 27, 47, 0.15)",
            paddingTop: "clamp(8px, 1.2cqw, 12px)"
          }}
        >
          <span>{meta?.address || "Vinayagapuram, Therkutheru, Madurai - 625122"}</span>
          <span style={{ fontWeight: 700, color: "var(--vaigai-blue)" }}>{meta?.website || "www.vaigai.org"}</span>
        </div>
      </div>
    </PageShell>
  );
});

export default CoverPage;
