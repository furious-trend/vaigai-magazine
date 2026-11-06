import React, { forwardRef } from 'react';
import PageShell from '../PageShell';
import { Trophy, Award, ZoomIn } from 'lucide-react';

export const StudentAchievementPoster = forwardRef(function StudentAchievementPoster(
  { poster, onOpenLightbox, pageNumber },
  ref
) {
  const isLeft = pageNumber ? pageNumber % 2 === 0 : true;
  return (
    <PageShell
      ref={ref}
      pageNumber={pageNumber}
      isLeft={isLeft}
      sectionName="STUDENT HONOURS • POSTER"
    >
      <div style={{ padding: "clamp(12px, 2cqw, 20px) clamp(10px, 1.6cqw, 16px)", height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.8cqw, 13px)", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--vaigai-red)", marginBottom: "3px" }}>
          Literary Recognition
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 3.6cqw, 28px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1.15, marginBottom: "clamp(8px, 1.2cqw, 14px)" }}>
          Vairamuthu Speech Contest
        </h2>

        {/* Big Poster Frame */}
        <div
          className="photo-frame"
          onClick={() => onOpenLightbox && onOpenLightbox(poster, "Vairamuthu Speech Contest Poster")}
          style={{
            flex: 1,
            position: "relative",
            cursor: "pointer",
            borderRadius: "8px",
            overflow: "hidden",
            border: "2px solid #E6DDCF",
            boxShadow: "0 8px 24px rgba(20, 33, 61, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#FAF4E8"
          }}
        >
          <div className="tape-top" />
          <img
            src={poster || "/assets/images/events/p38_img01.webp"}
            alt="Vairamuthu Speech Contest"
            style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "6px" }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              right: "12px",
              background: "rgba(20, 33, 61, 0.85)",
              color: "white",
              padding: "4px 12px",
              borderRadius: "20px",
              fontFamily: "var(--font-ui)",
              fontSize: "clamp(11px, 1.6cqw, 13px)",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "5px"
            }}
          >
            <ZoomIn size={13} color="var(--gold)" />
            <span>Click to view full poster</span>
          </div>
        </div>
      </div>
    </PageShell>
  );
});

export const StudentAchievementTable = forwardRef(function StudentAchievementTable(
  { table, pageNumber },
  ref
) {
  const isLeft = pageNumber ? pageNumber % 2 === 0 : false;
  return (
    <PageShell
      ref={ref}
      pageNumber={pageNumber}
      isLeft={isLeft}
      sectionName="STUDENT ACHIEVEMENTS"
    >
      <div style={{ padding: "clamp(12px, 2cqw, 20px) clamp(10px, 1.6cqw, 16px)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.8cqw, 13px)", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "3px" }}>
            State & Regional Laurels
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 3.6cqw, 28px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1.15, marginBottom: "4px" }}>
            {table?.title}
          </h2>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(12px, 1.9cqw, 14px)", color: "var(--ink-muted)", marginBottom: "clamp(12px, 1.8cqw, 18px)", fontWeight: 600 }}>
            {table?.subtitle}
          </div>
        </div>

        {/* Achievement Cards with High Legibility */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px, 1.6cqw, 16px)", flex: 1, justifyContent: "center" }}>
          {table?.rows?.map((row, idx) => {
            const isFirst = row.prize.toLowerCase().includes("i prize") && !row.prize.toLowerCase().includes("ii");
            return (
              <div
                key={idx}
                style={{
                  background: isFirst ? "linear-gradient(135deg, #FFFDF5, #FFF9EB)" : "white",
                  border: isFirst ? "2px solid var(--gold)" : "1.5px solid #E6DDCF",
                  borderRadius: "10px",
                  padding: "clamp(12px, 2cqw, 18px) clamp(14px, 2.2cqw, 22px)",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px"
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(17px, 3cqw, 22px)",
                        fontWeight: 800,
                        color: "var(--navy)"
                      }}
                    >
                      {row.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-ui)",
                        fontSize: "clamp(11px, 1.8cqw, 13px)",
                        fontWeight: 700,
                        color: "var(--vaigai-blue-dark)",
                        background: "rgba(31, 122, 184, 0.12)",
                        padding: "2px 8px",
                        borderRadius: "4px"
                      }}
                    >
                      {row.year} {row.dept}
                    </span>
                  </div>

                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(13px, 2.2cqw, 16px)",
                      color: "var(--ink)",
                      marginTop: "4px",
                      lineHeight: 1.4
                    }}
                  >
                    Competed in <strong>"{row.event}"</strong>
                  </div>

                  <div
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "clamp(12px, 1.9cqw, 14px)",
                      color: "var(--ink-muted)",
                      marginTop: "2px"
                    }}
                  >
                    Hosted by {row.host}
                  </div>
                </div>

                <div
                  style={{
                    background: isFirst
                      ? "linear-gradient(135deg, #FFD700 0%, #D4AF37 50%, #AA771C 100%)"
                      : "linear-gradient(135deg, #14213D 0%, #1F7AB8 100%)",
                    color: isFirst ? "#3A2500" : "white",
                    padding: "clamp(8px, 1.2cqw, 12px) clamp(12px, 1.8cqw, 16px)",
                    borderRadius: "8px",
                    fontFamily: "var(--font-ui)",
                    fontSize: "clamp(12px, 2cqw, 15px)",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    textAlign: "center",
                    flexShrink: 0,
                    boxShadow: isFirst ? "0 4px 12px rgba(201, 162, 75, 0.4)" : "0 3px 8px rgba(0,0,0,0.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <Trophy size={16} />
                  <span>{row.prize}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
});
