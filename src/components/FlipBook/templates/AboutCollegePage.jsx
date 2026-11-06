import React, { forwardRef } from 'react';
import PageShell from '../PageShell';

const AboutCollegePage = forwardRef(function AboutCollegePage({ about }, ref) {
  return (
    <PageShell
      ref={ref}
      pageNumber={5}
      isLeft={false}
      sectionName="ABOUT THE COLLEGE"
    >
      <div style={{ padding: "clamp(14px, 2.2cqw, 24px) clamp(12px, 1.8cqw, 20px)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {/* Kicker & Title */}
        <div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.8cqw, 13px)", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--vaigai-red)", marginBottom: "3px" }}>
            Campus Profile
          </div>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 4.6cqw, 34px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1.15, marginBottom: "clamp(10px, 1.6cqw, 16px)" }}>
            {about?.title || "About Vaigai College"}
          </h2>
        </div>

        {/* Campus Imagery Banner - High Res Campus Hero */}
        <div
          className="photo-frame"
          style={{
            height: "clamp(170px, 30cqw, 240px)",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 8px 24px rgba(20, 33, 61, 0.16)",
            border: "2.5px solid #FFFFFF",
            marginBottom: "clamp(10px, 1.6cqw, 16px)",
            position: "relative",
            padding: 0
          }}
        >
          <img
            src="/assets/images/events/cover_campus_hero.webp"
            alt="Vaigai College Campus"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "contrast(1.05) saturate(1.1)",
              transition: "transform 0.5s ease"
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(180deg, transparent 0%, rgba(16, 27, 51, 0.92) 100%)",
              padding: "clamp(10px, 1.8cqw, 16px)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11.5px, 1.8cqw, 14px)", fontWeight: 700, letterSpacing: "0.04em", color: "#FFFDF9" }}>
              A Serene 15-Acre Eco-Friendly Learning Sanctuary
            </span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(10px, 1.5cqw, 12px)", color: "var(--gold)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Madurai
            </span>
          </div>
        </div>

        {/* Paragraphs with Drop Cap on the first paragraph */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "clamp(10px, 1.6cqw, 16px)",
            fontFamily: "var(--font-body)",
            fontSize: "clamp(14px, 2.4cqw, 17px)",
            lineHeight: 1.65,
            color: "#1E1E2F",
            overflowY: "auto"
          }}
        >
          {about?.paragraphs?.map((p, idx) => (
            <p key={idx} className={idx === 0 ? "drop-cap" : ""}>
              {p}
            </p>
          ))}
        </div>

        {/* Footer Metric Strip */}
        <div
          style={{
            marginTop: "clamp(8px, 1.2cqw, 14px)",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(8px, 1.2cqw, 14px)",
            padding: "clamp(10px, 1.5cqw, 16px)",
            background: "white",
            borderRadius: "8px",
            border: "1.5px solid #E8DFD0",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
          }}
        >
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 3.6cqw, 26px)", fontWeight: 800, color: "var(--navy)" }}>
              2012
            </div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.7cqw, 13px)", color: "var(--ink-muted)", textTransform: "uppercase", fontWeight: 700, marginTop: "2px" }}>
              Established
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 3.6cqw, 26px)", fontWeight: 800, color: "var(--vaigai-blue)" }}>
              15+
            </div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.7cqw, 13px)", color: "var(--ink-muted)", textTransform: "uppercase", fontWeight: 700, marginTop: "2px" }}>
              Acres Campus
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 3.6cqw, 26px)", fontWeight: 800, color: "var(--vaigai-red)" }}>
              Anna Univ
            </div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.7cqw, 13px)", color: "var(--ink-muted)", textTransform: "uppercase", fontWeight: 700, marginTop: "2px" }}>
              Affiliation
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
});

export default AboutCollegePage;
