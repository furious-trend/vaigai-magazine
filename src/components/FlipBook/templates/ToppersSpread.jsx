import React, { forwardRef } from 'react';
import PageShell from '../PageShell';

export const ToppersPage = forwardRef(function ToppersPage(
  {
    title,
    subtitle,
    rows,
    pageNumber,
    isLeft,
    sectionName = "NPTEL TOPPERS",
    onOpenLightbox
  },
  ref
) {
  return (
    <PageShell
      ref={ref}
      pageNumber={pageNumber}
      isLeft={isLeft}
      sectionName={sectionName}
    >
      <div style={{ padding: "clamp(12px, 2cqw, 20px) clamp(10px, 1.6cqw, 16px)", height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Title */}
        <div style={{ marginBottom: "clamp(8px, 1.2cqw, 12px)" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.8cqw, 13px)", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)" }}>
            National Certification Honours
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(19px, 3.4cqw, 26px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1.15 }}>
            {title}
          </h2>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(12px, 1.9cqw, 14px)", color: "var(--vaigai-red)", marginTop: "2px", fontWeight: 700 }}>
            {subtitle}
          </div>
        </div>

        {/* Toppers Cards Grid */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateRows: `repeat(${rows.length}, 1fr)`,
            gap: "clamp(6px, 1cqw, 10px)",
            overflowY: "auto"
          }}
        >
          {rows.map((topper, idx) => (
            <div
              key={idx}
              style={{
                background: "white",
                border: "1.5px solid #E6DDCF",
                borderRadius: "8px",
                padding: "clamp(6px, 1cqw, 10px) clamp(10px, 1.4cqw, 14px)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                display: "flex",
                alignItems: "center",
                gap: "clamp(10px, 1.5cqw, 14px)"
              }}
            >
              {/* Sl No */}
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(15px, 2.5cqw, 19px)",
                  fontWeight: 800,
                  color: "var(--navy)",
                  width: "24px",
                  textAlign: "center",
                  flexShrink: 0
                }}
              >
                {topper.sl}.
              </div>

              {/* Photo */}
              <div
                className="photo-frame"
                onClick={() => topper.photo && onOpenLightbox && onOpenLightbox(topper.photo, `${topper.name} (${topper.role})`)}
                style={{
                  width: "clamp(48px, 9cqw, 64px)",
                  height: "clamp(48px, 9cqw, 64px)",
                  borderRadius: "6px",
                  overflow: "hidden",
                  flexShrink: 0,
                  cursor: topper.photo ? "pointer" : "default",
                  padding: "2px"
                }}
              >
                <img
                  src={topper.photo || "/assets/images/logo.png"}
                  alt={topper.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px" }}
                  onError={(e) => { e.target.src = "/assets/images/logo.png"; }}
                />
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(14px, 2.3cqw, 17px)", fontWeight: 700, color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {topper.name}
                  </span>
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(10px, 1.6cqw, 12px)", fontWeight: 700, color: "var(--vaigai-red)", background: "rgba(215, 55, 43, 0.1)", padding: "1px 6px", borderRadius: "3px", flexShrink: 0 }}>
                    {topper.role}
                  </span>
                </div>

                <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.8cqw, 13px)", color: "var(--vaigai-blue-dark)", fontWeight: 600, marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {topper.course}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "3px", fontSize: "clamp(10px, 1.6cqw, 12px)", color: "var(--ink-muted)", fontFamily: "var(--font-ui)", flexWrap: "wrap" }}>
                  {topper.badges?.map((badge, bIdx) => (
                    <span
                      key={bIdx}
                      style={{
                        fontWeight: 700,
                        background: badge.toLowerCase().includes("gold") || badge.toLowerCase().includes("topper")
                          ? "rgba(201, 162, 75, 0.18)"
                          : "rgba(20, 33, 61, 0.08)",
                        color: badge.toLowerCase().includes("gold") || badge.toLowerCase().includes("topper")
                          ? "#8A6510"
                          : "var(--navy)",
                        padding: "1px 6px",
                        borderRadius: "3px"
                      }}
                    >
                      🏅 {badge}
                    </span>
                  ))}
                  {topper.score && <span>• Score: <strong>{topper.score}</strong></span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
});
