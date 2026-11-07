import React, { forwardRef } from 'react';

const PageShell = forwardRef(function PageShell(
  {
    pageNumber,
    isLeft = false,
    showHeader = true,
    showFooter = true,
    sectionName = "VAIGAI'S IKIGAI",
    className = "",
    children,
    ...props
  },
  ref
) {
  // Spine shadow logic: Left page has shadow on its right edge; Right page has shadow on its left edge
  const spineClass = isLeft ? "spine-left" : "spine-right";

  return (
    <div
      ref={ref}
      className={`page-container paper-grain ${spineClass} select-none ${className}`}
      data-page-number={pageNumber}
      {...props}
    >
      {/* Running Header */}
      {showHeader && (
        <header
          style={{
            height: "clamp(24px, 5cqw, 34px)",
            minHeight: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 clamp(10px, 3cqw, 18px)",
            borderBottom: "1px solid rgba(27, 27, 47, 0.08)",
            color: "var(--ink-muted)",
            fontFamily: "var(--font-ui)",
            fontSize: "clamp(10px, 1.6cqw, 13px)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            flexShrink: 0
          }}
        >
          {isLeft ? (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <img
                  src="/assets/images/logo.webp"
                  onError={(e) => { e.target.src = "/assets/images/logo.png"; }}
                  alt="Vaigai Logo"
                  style={{ height: "clamp(12px, 2.8cqw, 18px)", width: "auto" }}
                />
                <span style={{ fontWeight: 600, color: "var(--navy)" }}>Vaigai's Ikigai</span>
              </div>
              <span>Vol. 01 • Issue 01</span>
            </>
          ) : (
            <>
              <span>{sectionName}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span>July – August 2026</span>
                <img
                  src="/assets/images/logo.webp"
                  onError={(e) => { e.target.src = "/assets/images/logo.png"; }}
                  alt="Vaigai Logo"
                  style={{ height: "clamp(12px, 2.8cqw, 18px)", width: "auto" }}
                />
              </div>
            </>
          )}
        </header>
      )}

      {/* Main Page Content Body */}
      <main
        style={{
          flex: 1,
          height: "100%",
          padding: showHeader || showFooter ? "clamp(4px, 1.2cqw, 12px) clamp(8px, 2.5cqw, 18px)" : "0",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflowY: "auto",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch"
        }}
      >
        {children}
      </main>

      {/* Running Folio / Footer */}
      {showFooter && (
        <footer
          style={{
            height: "clamp(18px, 3.8cqw, 26px)",
            minHeight: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: isLeft ? "flex-start" : "flex-end",
            padding: "0 clamp(10px, 3cqw, 18px)",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(11px, 1.8cqw, 14px)",
            fontWeight: 700,
            color: "var(--ink-muted)",
            borderTop: "1px solid rgba(27, 27, 47, 0.06)",
            flexShrink: 0
          }}
        >
          <span>{pageNumber}</span>
        </footer>
      )}
    </div>
  );
});

export default PageShell;

