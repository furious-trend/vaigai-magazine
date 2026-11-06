import React, { forwardRef } from 'react';
import PageShell from '../PageShell';

export const ClosingLeftPage = forwardRef(function ClosingLeftPage(
  { closing, ammaData, pageNumber },
  ref
) {
  const isLeft = pageNumber ? pageNumber % 2 === 0 : true;
  const letterLines = ammaData?.letter?.lines || [
    "Before you turn the final page, stay a moment in quiet reflection.",
    "Some institutions grant us a degree. Vaigai gave us our identity, our discipline, and our purpose.",
    "From the first morning we walked across this campus unsure of our path, to the late evenings of relentless curiosity, our teachers and mentors stood with us at every step. They never let us settle for ordinary, inspiring us always to reach higher.",
    "These classrooms sparked our intellect. These laboratories forged our technical craft. Every achievement, project, and milestone chronicled across these pages was nurtured under the guidance of visionary faculty and devoted leadership.",
    "With deep reverence, gratitude, and everlasting pride — Vaigai College of Engineering."
  ];

  return (
    <PageShell
      ref={ref}
      pageNumber={pageNumber}
      isLeft={isLeft}
      showHeader={false}
      showFooter={true}
      sectionName="A TRIBUTE TO VAIGAI"
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          borderRadius: "8px",
          overflow: "hidden"
        }}
      >
        {/* Background Artwork */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/assets/images/amma-letter-bg.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            opacity: 0.18,
            filter: "saturate(1.2)"
          }}
        />

        {/* Parchment Overlay & Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "clamp(16px, 2.5cqw, 28px) clamp(14px, 2.2cqw, 24px)",
            background: "linear-gradient(180deg, rgba(255, 253, 248, 0.88) 0%, rgba(250, 244, 232, 0.94) 100%)"
          }}
        >
          {/* Header */}
          <div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.8cqw, 13px)", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--vaigai-red)", marginBottom: "4px" }}>
              In Gratitude & Respect
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(20px, 3.8cqw, 28px)",
                fontWeight: 800,
                color: "var(--navy)",
                lineHeight: 1.15
              }}
            >
              {ammaData?.letter?.title || "In Honour & Eternal Gratitude to Vaigai"}
            </h2>
          </div>

          {/* Letter Body in Caveat Handwriting Font */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(10px, 1.5cqw, 16px)",
              fontFamily: "var(--font-hand)",
              fontSize: "clamp(16px, 2.8cqw, 22px)",
              lineHeight: 1.4,
              color: "var(--ink)",
              overflowY: "auto",
              paddingRight: "6px",
              margin: "clamp(8px, 1.2cqw, 14px) 0"
            }}
          >
            {letterLines.map((line, idx) => (
              <p
                key={idx}
                style={{
                  color: idx === letterLines.length - 1 ? "var(--vaigai-red)" : "var(--ink)",
                  fontWeight: idx === letterLines.length - 1 ? 700 : 400
                }}
              >
                {line}
              </p>
            ))}
          </div>

          {/* Closing Whisper at bottom */}
          <div
            style={{
              paddingTop: "10px",
              borderTop: "1.5px dashed rgba(201, 162, 75, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(13px, 2cqw, 16px)", color: "var(--navy)", fontWeight: 600 }}>
              "{closing?.whisper || "With deepest gratitude to our institution, faculty, and founders."}"
            </span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(13px, 2cqw, 16px)", fontWeight: 800, color: "var(--vaigai-red)" }}>
              VAIGAI • OUR PRIDE
            </span>
          </div>
        </div>
      </div>
    </PageShell>
  );
});

export const ClosingRightPage = forwardRef(function ClosingRightPage(
  { closing, pageNumber },
  ref
) {
  const isLeft = pageNumber ? pageNumber % 2 === 0 : false;
  return (
    <PageShell
      ref={ref}
      pageNumber={pageNumber}
      isLeft={isLeft}
      showHeader={false}
      showFooter={true}
      sectionName="ACKNOWLEDGEMENTS"
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "clamp(18px, 2.8cqw, 30px) clamp(14px, 2.2cqw, 26px)"
        }}
      >
        <div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.8cqw, 13px)", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--vaigai-blue)", marginBottom: "4px" }}>
            The Journey Continues
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 4.4cqw, 34px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1.1, marginBottom: "clamp(10px, 1.6cqw, 16px)" }}>
            Thank You for Reading
          </h2>

          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px, 2.3cqw, 17px)", lineHeight: 1.6, color: "var(--ink)", marginBottom: "clamp(12px, 1.8cqw, 20px)" }}>
            {closing?.message || "Thank you for reading the inaugural issue of Vaigai's Ikigai. We look forward to sharing our journey of purpose and possibility with you in the editions to come."}
          </p>

          <blockquote
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(14px, 2.3cqw, 18px)",
              lineHeight: 1.55,
              color: "var(--navy)",
              borderLeft: "4px solid var(--gold)",
              paddingLeft: "clamp(12px, 2cqw, 18px)",
              marginBottom: "clamp(12px, 1.8cqw, 20px)",
              background: "rgba(201, 162, 75, 0.08)",
              paddingTop: "10px",
              paddingBottom: "10px",
              borderRadius: "0 8px 8px 0"
            }}
          >
            "Education is not merely the accumulation of facts, but the elevation of human consciousness and capability."
          </blockquote>
        </div>

        {/* Contact and College Info Card */}
        <div
          style={{
            background: "white",
            padding: "clamp(12px, 2cqw, 20px) clamp(14px, 2.2cqw, 22px)",
            borderRadius: "10px",
            border: "1.5px solid #E4DAC9",
            boxShadow: "0 4px 16px rgba(0,0,0,0.05)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(12px, 1.8cqw, 18px)", marginBottom: "clamp(10px, 1.4cqw, 14px)" }}>
            <img
              src="/assets/images/logo.webp"
              onError={(e) => { e.target.src = "/assets/images/logo.png"; }}
              alt="Vaigai Logo"
              style={{ width: "clamp(42px, 6.5cqw, 54px)", height: "clamp(42px, 6.5cqw, 54px)", objectFit: "contain" }}
            />
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(16px, 2.8cqw, 22px)", fontWeight: 800, color: "var(--navy)" }}>
                {closing?.contact?.institution || "Vaigai College of Engineering"}
              </div>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.7cqw, 13px)", color: "var(--ink-muted)", marginTop: "2px" }}>
                {closing?.contact?.trust}
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #F0E8D9", paddingTop: "clamp(8px, 1.2cqw, 12px)", display: "flex", flexDirection: "column", gap: "6px", fontFamily: "var(--font-ui)", fontSize: "clamp(12px, 1.9cqw, 14px)", color: "var(--ink)" }}>
            <div>📍 {closing?.contact?.address}</div>
            <div>🌐 <span style={{ color: "var(--vaigai-blue)", fontWeight: 700 }}>{closing?.contact?.website}</span></div>
            <div>✉️ <span style={{ color: "var(--vaigai-red)", fontWeight: 700 }}>{closing?.contact?.email}</span></div>
          </div>
        </div>
      </div>
    </PageShell>
  );
});
