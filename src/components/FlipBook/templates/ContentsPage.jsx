import React, { forwardRef } from 'react';
import PageShell from '../PageShell';

const ContentsPage = forwardRef(function ContentsPage({ toc, onJumpToPage }, ref) {
  const getSectionColor = (section) => {
    switch (section?.toLowerCase()) {
      case "vision": return "var(--purple)";
      case "institution": return "var(--navy)";
      case "academics": return "var(--vaigai-blue)";
      case "clubs":
      case "social service": return "var(--vaigai-red)";
      case "innovation": return "#2E7D32";
      case "honours":
      case "placement": return "#D97706";
      case "research":
      case "faculty": return "#0284C7";
      case "nptel": return "#7C3AED";
      case "tribute": return "var(--vaigai-red)";
      default: return "var(--vaigai-blue)";
    }
  };

  return (
    <PageShell
      ref={ref}
      pageNumber={3}
      isLeft={false}
      sectionName="TABLE OF CONTENTS"
    >
      <div style={{ padding: "clamp(16px, 2.5cqw, 28px) clamp(14px, 2cqw, 24px)", height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderBottom: "2px solid var(--navy)", paddingBottom: "clamp(8px, 1.2cqw, 14px)", marginBottom: "clamp(12px, 1.8cqw, 20px)" }}>
          <div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.8cqw, 13px)", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--vaigai-red)", marginBottom: "0.3cqw" }}>
              Issue Overview • Vol. 01 Issue 01
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 5.2cqw, 38px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1 }}>
              Table of Contents
            </h2>
          </div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(12px, 1.8cqw, 14px)", color: "var(--ink-muted)", fontWeight: 600 }}>
            Click entry to jump
          </div>
        </div>

        {/* Scrollable / Compact Grid of TOC entries */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            paddingRight: "clamp(4px, 1cqw, 8px)",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(6px, 1cqw, 10px)"
          }}
        >
          {toc?.map((item, index) => (
            <button
              key={index}
              onClick={() => onJumpToPage && onJumpToPage(item.page - 1)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "clamp(10px, 1.4cqw, 15px) clamp(12px, 1.8cqw, 18px)",
                background: "white",
                border: "1px solid #E8DFD0",
                borderRadius: "8px",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
                boxShadow: "0 2px 5px rgba(0,0,0,0.03)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#FAF4E8";
                e.currentTarget.style.transform = "translateX(5px)";
                e.currentTarget.style.borderColor = "var(--gold)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(201, 162, 75, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.transform = "translateX(0)";
                e.currentTarget.style.borderColor = "#E8DFD0";
                e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.03)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "clamp(10px, 1.5cqw, 16px)", minWidth: 0, flex: 1 }}>
                <span
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "clamp(10px, 1.5cqw, 12px)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    background: getSectionColor(item.section),
                    color: "white",
                    flexShrink: 0
                  }}
                >
                  {item.section}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(14px, 2.3cqw, 18px)",
                    fontWeight: 700,
                    color: "var(--ink)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}
                >
                  {item.title}
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(15px, 2.5cqw, 19px)",
                  fontWeight: 800,
                  color: "var(--vaigai-red)",
                  marginLeft: "12px",
                  flexShrink: 0
                }}
              >
                P. {item.page < 10 ? `0${item.page}` : item.page}
              </span>
            </button>
          ))}
        </div>
      </div>
    </PageShell>
  );
});

export default ContentsPage;
