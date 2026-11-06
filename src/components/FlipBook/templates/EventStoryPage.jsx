import React, { forwardRef, useState, useEffect } from 'react';
import PageShell from '../PageShell';

const EventStoryPage = forwardRef(function EventStoryPage(
  { event, onOpenLightbox },
  ref
) {
  // Count-up animation for numbers if present
  const [counts, setCounts] = useState(() => (event?.numbers || []).map(() => 0));

  useEffect(() => {
    if (!event?.numbers || event.numbers.length === 0) return;
    const duration = 1200; // ms
    const startTime = performance.now();

    const frame = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts(
        event.numbers.map((n) => Math.round(n.value * easeOut))
      );

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [event]);

  return (
    <PageShell
      ref={ref}
      pageNumber={event.leftPage}
      isLeft={true}
      sectionName={event.kicker?.slice(0, 30)}
    >
      <div style={{ padding: "1.5cqw 1cqw", height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Top Bar: Kicker + Date Badge */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "2cqw", marginBottom: "1.5cqw" }}>
          <div>
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "1.3cqw",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--vaigai-red)",
                display: "inline-block",
                marginBottom: "0.5cqw"
              }}
            >
              {event.kicker}
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "3.6cqw",
                fontWeight: 800,
                color: "var(--navy)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em"
              }}
            >
              {event.title}
            </h2>
          </div>

          {/* Tear-Off Date Badge */}
          {event.dateBadge && (
            <div className="date-badge" style={{ flexShrink: 0 }}>
              <div className="date-badge-month">{event.dateBadge.month}</div>
              <div className="date-badge-day">{event.dateBadge.day}</div>
            </div>
          )}
        </div>

        {/* Hero Print Frame */}
        {event.heroImage && (
          <div
            className="photo-frame"
            onClick={() => onOpenLightbox && onOpenLightbox(event.heroImage, event.title)}
            style={{
              position: "relative",
              height: "24cqw",
              marginBottom: "2cqw",
              cursor: "pointer",
              borderRadius: "4px",
              overflow: "hidden"
            }}
          >
            <div className="tape-top" />
            <img
              src={event.heroImage}
              alt={event.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "0.5cqw",
                right: "1cqw",
                background: "rgba(20, 33, 61, 0.75)",
                color: "white",
                padding: "0.2cqw 0.8cqw",
                borderRadius: "3px",
                fontFamily: "var(--font-ui)",
                fontSize: "1.1cqw"
              }}
            >
              🔍 Tap to enlarge
            </div>
          </div>
        )}

        {/* Body Text with Drop Cap */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "1.5cqw",
            fontFamily: "var(--font-body)",
            fontSize: "1.7cqw",
            lineHeight: 1.55,
            color: "var(--ink)",
            overflowY: "auto"
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

        {/* Number Callouts (Count-Up Animation) */}
        {event.numbers && event.numbers.length > 0 && (
          <div
            style={{
              marginTop: "auto",
              paddingTop: "1.5cqw",
              borderTop: "1px dashed rgba(27, 27, 47, 0.15)",
              display: "flex",
              gap: "2cqw"
            }}
          >
            {event.numbers.map((num, nIdx) => (
              <div
                key={nIdx}
                style={{
                  background: "white",
                  padding: "1cqw 2cqw",
                  borderRadius: "6px",
                  border: "1px solid #E4DAC9",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  flex: 1
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "3.2cqw",
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
                    fontSize: "1.3cqw",
                    fontWeight: 600,
                    color: "var(--navy)",
                    marginTop: "0.4cqw"
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

export default EventStoryPage;

