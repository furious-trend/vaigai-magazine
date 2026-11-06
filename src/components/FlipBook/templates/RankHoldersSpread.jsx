import React, { forwardRef } from 'react';
import PageShell from '../PageShell';
import { Award, ZoomIn } from 'lucide-react';

export const RankHoldersStory = forwardRef(function RankHoldersStory(
  { event, onOpenLightbox, pageNumber = 16 },
  ref
) {
  const isLeft = pageNumber % 2 === 0;
  return (
    <PageShell
      ref={ref}
      pageNumber={pageNumber}
      isLeft={isLeft}
      sectionName="UNIVERSITY HONOURS"
    >
      <div style={{ padding: "clamp(12px, 2cqw, 22px) clamp(10px, 1.6cqw, 18px)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.8cqw, 13px)", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--vaigai-red)", marginBottom: "3px" }}>
            Academic Distinction
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 4cqw, 32px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1.15, marginBottom: "clamp(10px, 1.6cqw, 16px)" }}>
            {event.title}
          </h2>

          {/* Narrative */}
          <div style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px, 2.4cqw, 17px)", lineHeight: 1.65, color: "var(--ink)", marginBottom: "clamp(12px, 1.8cqw, 20px)" }}>
            <p className="drop-cap">
              Vaigai College of Engineering proudly represents our Anna University Rank Holders. Their unwavering commitment to scholarship, research, and discipline has brought laurels to the institution and inspired fellow students across all engineering streams.
            </p>
          </div>
        </div>

        {/* Spotlights of both Rank Holders */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px, 1.6cqw, 18px)", flex: 1, justifyContent: "center" }}>
          {event.students?.map((student, idx) => (
            <div
              key={idx}
              style={{
                background: "linear-gradient(135deg, #FFFDF8, #FAF4E8)",
                border: "2px solid var(--gold)",
                borderRadius: "10px",
                padding: "clamp(12px, 2cqw, 18px) clamp(14px, 2.2cqw, 22px)",
                boxShadow: "0 4px 14px rgba(201, 162, 75, 0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px"
              }}
            >
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(18px, 3.2cqw, 24px)", fontWeight: 800, color: "var(--navy)" }}>
                  {student.name}
                </div>
                <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(13px, 2.1cqw, 15px)", fontWeight: 700, color: "var(--vaigai-red)", marginTop: "3px" }}>
                  {student.department}
                </div>
                <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(12px, 1.8cqw, 14px)", color: "var(--ink-muted)", marginTop: "2px" }}>
                  {student.batch}
                </div>
              </div>
              <div
                style={{
                  background: "var(--navy)",
                  color: "var(--gold)",
                  padding: "clamp(6px, 1cqw, 10px) clamp(12px, 1.6cqw, 16px)",
                  borderRadius: "8px",
                  fontFamily: "var(--font-ui)",
                  fontSize: "clamp(11px, 1.8cqw, 13px)",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  textAlign: "center",
                  flexShrink: 0,
                  boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <Award size={16} color="var(--gold)" />
                <span>Rank Holder</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
});

export const RankHoldersPoster = forwardRef(function RankHoldersPoster(
  { event, onOpenLightbox, pageNumber = 17 },
  ref
) {
  const isLeft = pageNumber % 2 === 0;
  return (
    <PageShell
      ref={ref}
      pageNumber={pageNumber}
      isLeft={isLeft}
      sectionName="RANK HOLDERS • POSTER"
    >
      <div style={{ padding: "clamp(12px, 2cqw, 20px) clamp(10px, 1.6cqw, 16px)", height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.8cqw, 13px)", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "3px" }}>
          Official Commemoration
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 3.6cqw, 28px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1.15, marginBottom: "clamp(8px, 1.2cqw, 14px)" }}>
          Celebrating Academic Brilliance
        </h2>

        {/* Large Poster */}
        <div
          className="photo-frame"
          onClick={() => onOpenLightbox && onOpenLightbox(event.heroImage, "Anna University Rank Holders Poster")}
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
            src={event.heroImage}
            alt="Anna University Rank Holders"
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
