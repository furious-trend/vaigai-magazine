import React, { forwardRef } from 'react';
import PageShell from '../PageShell';

const BackCoverPage = forwardRef(function BackCoverPage({ backCover, pageNumber = 36 }, ref) {
  return (
    <PageShell
      ref={ref}
      pageNumber={pageNumber}
      isLeft={true}
      showHeader={false}
      showFooter={false}
      className="back-cover"
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "clamp(24px, 4cqw, 42px)",
          background: "linear-gradient(180deg, #14213D 0%, #0D1629 100%)",
          color: "white",
          textAlign: "center",
          position: "relative",
          boxShadow: "inset 0 0 50px rgba(0,0,0,0.5)"
        }}
      >
        {/* Subtle Decorative Golden Border */}
        <div style={{ position: "absolute", top: "14px", left: "14px", right: "14px", bottom: "14px", border: "1.5px solid rgba(201, 162, 75, 0.4)", pointerEvents: "none" }} />

        {/* Top Header */}
        <div style={{ marginTop: "clamp(8px, 1.5cqw, 16px)" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.8cqw, 13px)", fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)" }}>
            The Bimonthly Newsletter
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 5.5cqw, 44px)", fontWeight: 900, color: "#FAF4E8", marginTop: "4px", letterSpacing: "0.02em" }}>
            VAIGAI'S IKIGAI
          </h2>
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(15px, 2.6cqw, 20px)", color: "rgba(250, 244, 232, 0.85)", marginTop: "4px" }}>
            Where Purpose Meets Possibility.
          </p>
        </div>

        {/* Center Large Emblem */}
        <div
          style={{
            width: "clamp(160px, 28cqw, 220px)",
            height: "clamp(70px, 12cqw, 95px)",
            borderRadius: "16px",
            background: "radial-gradient(ellipse at center, rgba(201, 162, 75, 0.3) 0%, transparent 75%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px"
          }}
        >
          <img
            src="/assets/images/logo.webp"
            onError={(e) => { e.target.src = "/assets/images/logo.png"; }}
            alt="Vaigai Emblem"
            style={{ width: "100%", height: "100%", objectFit: "contain", filter: "brightness(1.15) drop-shadow(0 0 20px rgba(201, 162, 75, 0.6))" }}
          />
        </div>

        {/* Bottom Details & Trust Info */}
        <div style={{ width: "100%", marginBottom: "4px" }}>
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(13px, 2.2cqw, 17px)", color: "rgba(250, 244, 232, 0.85)", maxWidth: "86%", margin: "0 auto clamp(12px, 2cqw, 20px)", lineHeight: 1.5 }}>
            "{backCover?.quote || "Inspiring young minds to become skilled, confident, and responsible contributors to society."}"
          </p>

          <div style={{ borderTop: "1px solid rgba(201, 162, 75, 0.35)", paddingTop: "clamp(10px, 1.5cqw, 16px)" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(17px, 3cqw, 22px)", fontWeight: 800, color: "var(--gold)" }}>
              {backCover?.college || "Vaigai College of Engineering"}
            </div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(12px, 1.8cqw, 14px)", color: "rgba(255,255,255,0.75)", marginTop: "3px" }}>
              {backCover?.address}
            </div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(12px, 1.8cqw, 14px)", color: "rgba(255,255,255,0.9)", marginTop: "4px", fontWeight: 600 }}>
              <span>{backCover?.website}</span> • <span>{backCover?.email}</span>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
});

export default BackCoverPage;
