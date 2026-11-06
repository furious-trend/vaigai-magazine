import React, { forwardRef } from 'react';
import PageShell from '../PageShell';

const CombinedPlacementPage = forwardRef(function CombinedPlacementPage(
  { eventMaadhesh, eventTact, onOpenLightbox, pageNumber = 23 },
  ref
) {
  return (
    <PageShell
      ref={ref}
      pageNumber={pageNumber}
      isLeft={pageNumber % 2 === 0}
      sectionName="TRAINING & PLACEMENT CELL"
    >
      <div style={{ padding: "clamp(12px, 2cqw, 20px) clamp(10px, 1.6cqw, 16px)", height: "100%", display: "flex", flexDirection: "column", gap: "clamp(10px, 1.6cqw, 16px)" }}>
        {/* Top Section: S. Maadhesh Placement Spotlight */}
        <div
          style={{
            background: "linear-gradient(135deg, #FFFDF8 0%, #FAF4E8 100%)",
            border: "2px solid var(--gold)",
            borderRadius: "10px",
            padding: "clamp(12px, 2cqw, 18px)",
            boxShadow: "0 6px 18px rgba(201, 162, 75, 0.18)",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(8px, 1.2cqw, 12px)"
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.8cqw, 13px)", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--vaigai-red)" }}>
              Placement Spotlight
            </span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.8cqw, 13px)", fontWeight: 700, background: "var(--navy)", color: "var(--gold)", padding: "3px 10px", borderRadius: "14px" }}>
              Software Developer Offer
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "clamp(14px, 2.2cqw, 20px)" }}>
            <div
              className="photo-frame"
              onClick={() => eventMaadhesh?.heroImage && onOpenLightbox && onOpenLightbox(eventMaadhesh.heroImage, "Mr. S. Maadhesh")}
              style={{
                width: "clamp(75px, 16cqw, 105px)",
                height: "clamp(75px, 16cqw, 105px)",
                borderRadius: "8px",
                overflow: "hidden",
                flexShrink: 0,
                cursor: "pointer",
                padding: "3px",
                border: "2px solid var(--gold)"
              }}
            >
              <img
                src={eventMaadhesh?.heroImage || "/assets/images/events/p33_img01.webp"}
                alt="Mr. S. Maadhesh"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "6px" }}
              />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(19px, 3.2cqw, 26px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1.15 }}>
                Mr. S. Maadhesh
              </div>
              <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(13px, 2.1cqw, 16px)", fontWeight: 800, color: "var(--vaigai-blue)", marginTop: "3px" }}>
                NEWRTA SOLUTIONS Pvt Ltd
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "clamp(13px, 2.1cqw, 16px)", color: "var(--ink-light)", marginTop: "4px", lineHeight: 1.45 }}>
                Selected as Software Developer through the Off-Campus Recruitment Drive.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: TACT - Level 1 Programme */}
        <div
          style={{
            background: "white",
            border: "1.5px solid #E6DDCF",
            borderRadius: "10px",
            padding: "clamp(12px, 2cqw, 18px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "8px" }}>
              <div>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.8cqw, 13px)", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--vaigai-blue-dark)" }}>
                  Technical & Aptitude Training
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(19px, 3.2cqw, 26px)", fontWeight: 800, color: "var(--navy)", marginTop: "2px" }}>
                  TACT – Level 1
                </h3>
              </div>
              <div className="date-badge" style={{ flexShrink: 0 }}>
                <div className="date-badge-month">AUG</div>
                <div className="date-badge-day">20</div>
              </div>
            </div>

            <div style={{ fontFamily: "var(--font-body)", fontSize: "clamp(13px, 2.1cqw, 16px)", lineHeight: 1.55, color: "var(--ink)", marginBottom: "clamp(10px, 1.6cqw, 16px)" }}>
              <p>
                The Training and Placement Cell (TPC) organized TACT – Level 1 on 20 August 2026 for IV year students. Dr. R. Sivaranjani, Principal (i/c), along with the Heads of Departments, supported and guided the programme. The initiative focused on enhancing students' aptitude, technical competencies and career readiness through structured training sessions.
              </p>
            </div>
          </div>

          {/* TACT Photo Gallery / Poster Showcase */}
          <div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(10.5px, 1.7cqw, 13px)", fontWeight: 700, color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
              TACT Programme Posters
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
              {[
                { img: "/assets/images/events/p34_img01.webp", cap: "TACT Level 1 - Curriculum & Framework" },
                { img: "/assets/images/events/p35_img01.webp", cap: "TACT Level 1 - Assessment & Modules" }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="photo-frame"
                  onClick={() => onOpenLightbox && onOpenLightbox(item.img, item.cap)}
                  style={{
                    height: "clamp(90px, 15cqw, 125px)",
                    borderRadius: "8px",
                    overflow: "hidden",
                    cursor: "pointer",
                    padding: "3px",
                    background: "#FAF4E8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative"
                  }}
                  title={item.cap}
                >
                  <img
                    src={item.img}
                    alt={item.cap}
                    style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "4px" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "4px",
                      right: "6px",
                      background: "rgba(16, 27, 51, 0.82)",
                      color: "white",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      fontFamily: "var(--font-ui)",
                      fontSize: "clamp(9px, 1.4cqw, 11px)",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "4px"
                    }}
                  >
                    <span>Enlarge</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
});

export default CombinedPlacementPage;
