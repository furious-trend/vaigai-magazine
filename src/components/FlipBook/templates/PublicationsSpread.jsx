import React, { forwardRef } from 'react';
import PageShell from '../PageShell';

export const FacultyPublicationsLeft = forwardRef(function FacultyPublicationsLeft(
  { publications, pageNumber },
  ref
) {
  const rows = publications?.rows?.slice(0, 4) || [];

  return (
    <PageShell
      ref={ref}
      pageNumber={pageNumber}
      isLeft={true}
      sectionName="RESEARCH PUBLICATIONS (1/2)"
    >
      <div style={{ padding: "clamp(12px, 2cqw, 20px) clamp(10px, 1.6cqw, 16px)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.8cqw, 13px)", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--vaigai-red)", marginBottom: "3px" }}>
            Scholarly Contributions
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 3.8cqw, 28px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1.15 }}>
            {publications?.title}
          </h2>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(12px, 1.9cqw, 14px)", color: "var(--ink-muted)", marginTop: "2px", fontWeight: 600 }}>
            {publications?.subtitle} • Papers 01–04
          </div>
        </div>

        {/* Publication Cards with High Legibility */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px, 1.5cqw, 14px)", flex: 1, justifyContent: "center", margin: "auto 0" }}>
          {rows.map((pub, idx) => (
            <div
              key={idx}
              style={{
                background: "white",
                border: "1.5px solid #E6DDCF",
                borderRadius: "8px",
                padding: "clamp(10px, 1.6cqw, 16px) clamp(12px, 1.8cqw, 18px)",
                boxShadow: "0 3px 10px rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column",
                gap: "4px"
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(15px, 2.5cqw, 19px)", fontWeight: 700, color: "var(--navy)" }}>
                  {pub.name} • <span style={{ color: "var(--vaigai-red)" }}>{pub.dept}</span>
                </span>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(10px, 1.6cqw, 12px)", fontWeight: 800, background: "rgba(20, 33, 61, 0.08)", padding: "2px 8px", borderRadius: "4px" }}>
                  #{pub.sl}
                </span>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(13px, 2.2cqw, 16px)", lineHeight: 1.45, color: "var(--ink)" }}>
                "{pub.title}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.7cqw, 13px)", fontWeight: 800, color: "var(--gold)", textTransform: "uppercase" }}>
                  Journal:
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(12px, 2cqw, 15px)", color: "var(--vaigai-blue-dark)", fontWeight: 600 }}>
                  {pub.journal}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
});

export const FacultyPublicationsRight = forwardRef(function FacultyPublicationsRight(
  { publications, pageNumber },
  ref
) {
  const rows = publications?.rows?.slice(4, 7) || [];

  return (
    <PageShell
      ref={ref}
      pageNumber={pageNumber}
      isLeft={false}
      sectionName="RESEARCH PUBLICATIONS (2/2)"
    >
      <div style={{ padding: "clamp(12px, 2cqw, 20px) clamp(10px, 1.6cqw, 16px)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.8cqw, 13px)", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--vaigai-blue)" }}>
            Scholarly Contributions
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 3.8cqw, 28px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1.15 }}>
            {publications?.title}
          </h2>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(12px, 1.9cqw, 14px)", color: "var(--ink-muted)", marginTop: "2px", fontWeight: 600 }}>
            {publications?.subtitle} • Papers 05–07
          </div>
        </div>

        {/* Publication Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px, 1.8cqw, 16px)", flex: 1, justifyContent: "center", margin: "auto 0" }}>
          {rows.map((pub, idx) => (
            <div
              key={idx}
              style={{
                background: "white",
                border: "1.5px solid #E6DDCF",
                borderRadius: "8px",
                padding: "clamp(12px, 1.8cqw, 18px) clamp(14px, 2cqw, 20px)",
                boxShadow: "0 3px 10px rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column",
                gap: "5px"
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(15px, 2.5cqw, 19px)", fontWeight: 700, color: "var(--navy)" }}>
                  {pub.name} • <span style={{ color: "var(--vaigai-blue)" }}>{pub.dept}</span>
                </span>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(10px, 1.6cqw, 12px)", fontWeight: 800, background: "rgba(20, 33, 61, 0.08)", padding: "2px 8px", borderRadius: "4px" }}>
                  #{pub.sl}
                </span>
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(13px, 2.2cqw, 16px)", lineHeight: 1.45, color: "var(--ink)" }}>
                "{pub.title}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.7cqw, 13px)", fontWeight: 800, color: "var(--gold)", textTransform: "uppercase" }}>
                  Journal:
                </span>
                <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(12px, 2cqw, 15px)", color: "var(--vaigai-blue-dark)", fontWeight: 600 }}>
                  {pub.journal}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
});
