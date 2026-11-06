import React, { forwardRef, useState, useEffect } from 'react';
import PageShell from '../PageShell';

export const DividerLeftPage = forwardRef(function DividerLeftPage(
  { divider, pageNumber },
  ref
) {
  return (
    <PageShell
      ref={ref}
      pageNumber={pageNumber}
      isLeft={true}
      showHeader={false}
      showFooter={false}
      className="divider-left"
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "6cqw",
          background: "linear-gradient(135deg, #14213D 0%, #1B1B2F 100%)",
          color: "white",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Giant Outlined Section Number in Background */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "var(--font-display)",
            fontSize: "42cqw",
            fontWeight: 800,
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: "2px rgba(201, 162, 75, 0.2)",
            pointerEvents: "none",
            userSelect: "none"
          }}
        >
          {divider?.num || "01"}
        </div>

        {/* Foreground Content */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "1.8cqw",
              fontWeight: 700,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "1.5cqw"
            }}
          >
            SECTION {divider?.num || "01"}
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "6.5cqw",
              fontWeight: 800,
              lineHeight: 1.05,
              color: "#FFFDF9",
              letterSpacing: "-0.01em",
              maxWidth: "85%"
            }}
          >
            {divider?.title}
          </h1>

          <div
            style={{
              width: "10cqw",
              height: "4px",
              background: "var(--vaigai-red)",
              marginTop: "3cqw"
            }}
          />
        </div>
      </div>
    </PageShell>
  );
});

export const DividerRightPage = forwardRef(function DividerRightPage(
  { divider, pageNumber, onJumpToPage },
  ref
) {
  const [typedWhisper, setTypedWhisper] = useState("");

  useEffect(() => {
    const whisper = divider?.whisper || "";
    let i = 0;
    setTypedWhisper("");
    const interval = setInterval(() => {
      if (i < whisper.length) {
        setTypedWhisper((prev) => prev + whisper.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 35);
    return () => clearInterval(interval);
  }, [divider]);

  return (
    <PageShell
      ref={ref}
      pageNumber={pageNumber}
      isLeft={false}
      showHeader={true}
      showFooter={true}
      sectionName={divider?.title?.toUpperCase()}
    >
      <div style={{ padding: "2cqw 1cqw", height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Amma Whisper Card */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(201, 162, 75, 0.12), rgba(250, 244, 232, 0.8))",
            border: "1px solid var(--gold)",
            borderRadius: "8px",
            padding: "2.5cqw 3cqw",
            marginBottom: "3cqw",
            position: "relative",
            boxShadow: "0 4px 12px rgba(201, 162, 75, 0.1)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1cqw", marginBottom: "1cqw" }}>
            <span style={{ fontSize: "2.2cqw" }}>🕊️</span>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: "1.3cqw", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)" }}>
              Amma's Whisper
            </span>
          </div>
          <div
            style={{
              fontFamily: "var(--font-hand)",
              fontSize: "3cqw",
              lineHeight: 1.3,
              color: "var(--navy)",
              minHeight: "6cqw"
            }}
          >
            "{typedWhisper}"
          </div>
        </div>

        {/* In This Section Header */}
        <div style={{ borderBottom: "2px solid var(--navy)", paddingBottom: "1cqw", marginBottom: "2cqw" }}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "3.2cqw",
              fontWeight: 700,
              color: "var(--navy)"
            }}
          >
            In This Section
          </h3>
        </div>

        {/* Clickable Section Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5cqw", flex: 1 }}>
          {divider?.items?.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onJumpToPage && onJumpToPage(item.page - 1)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1.6cqw 2cqw",
                background: "white",
                border: "1px solid rgba(27, 27, 47, 0.08)",
                borderRadius: "6px",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#FAF4E8";
                e.currentTarget.style.transform = "translateX(5px)";
                e.currentTarget.style.borderColor = "var(--vaigai-blue)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.transform = "translateX(0)";
                e.currentTarget.style.borderColor = "rgba(27, 27, 47, 0.08)";
              }}
            >
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "2.2cqw", fontWeight: 700, color: "var(--ink)" }}>
                  {item.title}
                </div>
                <div style={{ fontFamily: "var(--font-ui)", fontSize: "1.4cqw", color: "var(--ink-muted)", marginTop: "0.3cqw" }}>
                  {item.date}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.4cqw",
                  fontWeight: 800,
                  color: "var(--vaigai-red)"
                }}
              >
                {item.page < 10 ? `0${item.page}` : item.page} →
              </div>
            </button>
          ))}
        </div>
      </div>
    </PageShell>
  );
});

