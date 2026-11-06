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
            height: "5cqw",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 4cqw",
            borderBottom: "1px solid rgba(27, 27, 47, 0.08)",
            color: "var(--ink-muted)",
            fontFamily: "var(--font-ui)",
            fontSize: "1.4cqw",
            textTransform: "uppercase",
            letterSpacing: "0.08em"
          }}
        >
          {isLeft ? (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: "1cqw" }}>
                <img
                  src="/assets/images/logo.webp"
                  onError={(e) => { e.target.src = "/assets/images/logo.png"; }}
                  alt="Vaigai Logo"
                  style={{ height: "3cqw", width: "auto" }}
                />
                <span style={{ fontWeight: 600, color: "var(--navy)" }}>Vaigai's Ikigai</span>
              </div>
              <span>Vol. 01 • Issue 01</span>
            </>
          ) : (
            <>
              <span>{sectionName}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "1cqw" }}>
                <span>July – August 2026</span>
                <img
                  src="/assets/images/logo.webp"
                  onError={(e) => { e.target.src = "/assets/images/logo.png"; }}
                  alt="Vaigai Logo"
                  style={{ height: "3cqw", width: "auto" }}
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
          padding: showHeader || showFooter ? "2cqw 4cqw" : "0",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {children}
      </main>

      {/* Running Folio / Footer */}
      {showFooter && (
        <footer
          style={{
            height: "4cqw",
            display: "flex",
            alignItems: "center",
            justifyContent: isLeft ? "flex-start" : "flex-end",
            padding: "0 4cqw",
            fontFamily: "var(--font-display)",
            fontSize: "1.6cqw",
            color: "var(--ink-muted)",
            borderTop: "1px solid rgba(27, 27, 47, 0.06)"
          }}
        >
          <span>{pageNumber}</span>
        </footer>
      )}
    </div>
  );
});

export default PageShell;

