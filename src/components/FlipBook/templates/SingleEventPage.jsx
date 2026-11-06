import React, { forwardRef, useState, useEffect } from 'react';
import PageShell from '../PageShell';
import { ZoomIn, Calendar } from 'lucide-react';

const SingleEventPage = forwardRef(function SingleEventPage(
  { event, pageNumber, onOpenLightbox },
  ref
) {
  const isLeft = pageNumber % 2 === 0;

  // Count-up animation for numbers if present
  const [counts, setCounts] = useState(() => (event?.numbers || []).map(() => 0));

  useEffect(() => {
    if (!event?.numbers || event.numbers.length === 0) return;
    const duration = 1200;
    const startTime = performance.now();

    const frame = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts(event.numbers.map((n) => Math.round(n.value * easeOut)));

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [event]);

  if (!event) return null;

  const hasNumbers = event.numbers && event.numbers.length > 0;

  return (
    <PageShell
      ref={ref}
      pageNumber={pageNumber}
      isLeft={isLeft}
      sectionName={event.kicker?.slice(0, 30)}
    >
      <div style={{ padding: "clamp(12px, 2cqw, 22px) clamp(10px, 1.6cqw, 18px)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {/* Header Strip: Kicker & Date Badge */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "clamp(8px, 1.2cqw, 14px)" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "clamp(11px, 1.8cqw, 13px)",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--vaigai-red)",
                display: "inline-block",
                marginBottom: "3px"
              }}
            >
              {event.kicker}
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(19px, 3.4cqw, 26px)",
                fontWeight: 800,
                color: "var(--navy)",
                lineHeight: 1.2,
                letterSpacing: "-0.01em"
              }}
            >
              {event.title}
            </h2>
          </div>

          {/* Tear-Off Date Badge */}
          {event.dateBadge && (
            <div className="date-badge" style={{ flexShrink: 0, boxShadow: "0 4px 10px rgba(0,0,0,0.12)" }}>
              <div className="date-badge-month">{event.dateBadge.month}</div>
              <div className="date-badge-day">{event.dateBadge.day}</div>
            </div>
          )}
        </div>

        {/* Large High-Impact Hero Photo */}
        {event.heroImage && (
          <div
            className="photo-frame"
            onClick={() => onOpenLightbox && onOpenLightbox(event.heroImage, event.title)}
            style={{
              position: "relative",
              height: hasNumbers ? "clamp(200px, 32cqw, 260px)" : "clamp(240px, 42cqw, 330px)",
              marginBottom: "clamp(10px, 1.4cqw, 16px)",
              cursor: "pointer",
              borderRadius: "10px",
              overflow: "hidden",
              border: "2.5px solid #FFFFFF",
              boxShadow: "0 8px 24px rgba(20, 33, 61, 0.16)",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            <div className="tape-top" />
            <img
              src={event.heroImage}
              alt={event.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: event.isPoster ? "contain" : "cover",
                borderRadius: "6px",
                transition: "transform 0.5s ease"
              }}
            />
            {/* View Fullscreen / Enlarge Prompt Overlay */}
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                right: "12px",
                background: "rgba(16, 27, 51, 0.88)",
                backdropFilter: "blur(6px)",
                color: "white",
                padding: "4px 12px",
                borderRadius: "20px",
                fontFamily: "var(--font-ui)",
                fontSize: "clamp(11.5px, 1.7cqw, 13.5px)",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
                border: "1px solid rgba(255, 215, 0, 0.3)"
              }}
            >
              <ZoomIn size={14} color="#FFD700" />
              <span>{event.galleryImages?.length ? `+${event.galleryImages.length} photos` : "Click to view full"}</span>
            </div>
          </div>
        )}

        {/* Full Original Body Text - Large, Viewable Easily */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "clamp(8px, 1.2cqw, 14px)",
            fontFamily: "var(--font-body)",
            fontSize: "clamp(15px, 2.5cqw, 18px)",
            lineHeight: 1.68,
            color: "#181828",
            overflowY: "auto",
            paddingRight: "4px"
          }}
        >
          {event.body.map((para, pIdx) => (
            <p key={pIdx} className={pIdx === 0 ? "drop-cap" : ""}>
              {para.map((run, rIdx) => {
                let style = {};
                if (run.bold) {
                  style.fontWeight = 700;
                  style.color = "var(--navy)";
                }
                if (run.italic) {
                  style.fontStyle = "italic";
                }
                return (
                  <span key={rIdx} style={style}>
                    {run.text}
                  </span>
                );
              })}
            </p>
          ))}
        </div>

        {/* Number Callouts with Animated Count-Up */}
        {hasNumbers && (
          <div
            style={{
              marginTop: "clamp(8px, 1.2cqw, 14px)",
              paddingTop: "clamp(8px, 1.2cqw, 12px)",
              borderTop: "1.5px dashed rgba(201, 162, 75, 0.4)",
              display: "flex",
              gap: "clamp(10px, 1.6cqw, 16px)"
            }}
          >
            {event.numbers.map((num, nIdx) => (
              <div
                key={nIdx}
                style={{
                  background: "linear-gradient(135deg, #FFFDF8 0%, #FAF4E8 100%)",
                  padding: "clamp(8px, 1.2cqw, 12px) clamp(12px, 1.8cqw, 18px)",
                  borderRadius: "8px",
                  border: "1px solid #E4DAC9",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  flex: 1
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(22px, 3.8cqw, 28px)",
                    fontWeight: 800,
                    color: "var(--vaigai-red)",
                    lineHeight: 1
                  }}
                >
                  {counts[nIdx] || num.value}+
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "clamp(12px, 1.9cqw, 14px)",
                    fontWeight: 700,
                    color: "var(--navy)",
                    marginTop: "4px"
                  }}
                >
                  {num.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
});

export default SingleEventPage;
