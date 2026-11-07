import React, { forwardRef } from 'react';
import PageShell from '../PageShell';

export const FacultyProgrammesLeft = forwardRef(function FacultyProgrammesLeft(
  { table, pageNumber },
  ref
) {
  const rows = table?.rows?.slice(0, 8) || [];

  return (
    <PageShell
      ref={ref}
      pageNumber={pageNumber}
      isLeft={true}
      sectionName="FACULTY ENRICHMENT (1/2)"
    >
      <div style={{ padding: "clamp(12px, 2cqw, 20px) clamp(10px, 1.6cqw, 16px)", height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Title */}
        <div style={{ marginBottom: "clamp(8px, 1.4cqw, 14px)" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.8cqw, 13px)", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--vaigai-red)" }}>
            Academic Development
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 3.8cqw, 28px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1.15 }}>
            {table?.title}
          </h2>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(12px, 1.9cqw, 14px)", color: "var(--ink-muted)", marginTop: "2px", fontWeight: 600 }}>
            {table?.subtitle} • Rows 01–08
          </div>
        </div>

        {/* Paper-styled Table with High-Legibility Typography */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "8px",
            border: "1.5px solid #DFD5C3",
            background: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
          }}
        >
          <table style={{ width: "100%", minWidth: "460px", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "var(--navy)", color: "white", fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.8cqw, 13px)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                <th style={{ padding: "10px 12px", width: "8%" }}>Sl.</th>
                <th style={{ padding: "10px 12px", width: "26%" }}>Faculty & Dept</th>
                <th style={{ padding: "10px 12px", width: "40%" }}>Programme Name</th>
                <th style={{ padding: "10px 12px", width: "26%" }}>Date & Host</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr
                  key={idx}
                  style={{
                    background: idx % 2 === 0 ? "#FAF6EE" : "white",
                    borderBottom: "1px solid #ECE3D4",
                    fontSize: "clamp(12px, 2cqw, 15px)"
                  }}
                >
                  <td style={{ padding: "8px 12px", fontWeight: 800, color: "var(--vaigai-red)", verticalAlign: "top" }}>
                    {r.sl}
                  </td>
                  <td style={{ padding: "8px 12px", verticalAlign: "top" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--ink)", fontSize: "clamp(13px, 2.1cqw, 16px)" }}>{r.name}</div>
                    <span style={{ fontSize: "clamp(10px, 1.6cqw, 12px)", background: "rgba(31, 122, 184, 0.15)", color: "var(--vaigai-blue-dark)", padding: "2px 6px", borderRadius: "3px", fontWeight: 700, display: "inline-block", marginTop: "2px" }}>
                      {r.dept}
                    </span>
                  </td>
                  <td style={{ padding: "8px 12px", color: "var(--ink)", verticalAlign: "top", lineHeight: 1.45, fontSize: "clamp(12px, 2cqw, 15px)" }}>
                    {r.programme}
                  </td>
                  <td style={{ padding: "8px 12px", verticalAlign: "top", fontSize: "clamp(11px, 1.8cqw, 13px)", color: "var(--ink-light)" }}>
                    <div style={{ fontWeight: 700, color: "var(--navy)" }}>{r.date}</div>
                    <div style={{ color: "var(--ink-muted)", marginTop: "2px" }}>{r.host}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  );
});

export const FacultyProgrammesRight = forwardRef(function FacultyProgrammesRight(
  { table, pageNumber },
  ref
) {
  const rows = table?.rows?.slice(8, 16) || [];

  return (
    <PageShell
      ref={ref}
      pageNumber={pageNumber}
      isLeft={false}
      sectionName="FACULTY ENRICHMENT (2/2)"
    >
      <div style={{ padding: "clamp(12px, 2cqw, 20px) clamp(10px, 1.6cqw, 16px)", height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Title */}
        <div style={{ marginBottom: "clamp(8px, 1.4cqw, 14px)" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.8cqw, 13px)", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--vaigai-blue)" }}>
            Academic Development
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 3.8cqw, 28px)", fontWeight: 800, color: "var(--navy)", lineHeight: 1.15 }}>
            {table?.title}
          </h2>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "clamp(12px, 1.9cqw, 14px)", color: "var(--ink-muted)", marginTop: "2px", fontWeight: 600 }}>
            {table?.subtitle} • Rows 09–16
          </div>
        </div>

        {/* Paper-styled Table */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "8px",
            border: "1.5px solid #DFD5C3",
            background: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
          }}
        >
          <table style={{ width: "100%", minWidth: "460px", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "var(--navy)", color: "white", fontFamily: "var(--font-ui)", fontSize: "clamp(11px, 1.8cqw, 13px)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                <th style={{ padding: "10px 12px", width: "8%" }}>Sl.</th>
                <th style={{ padding: "10px 12px", width: "26%" }}>Faculty & Dept</th>
                <th style={{ padding: "10px 12px", width: "40%" }}>Programme Name</th>
                <th style={{ padding: "10px 12px", width: "26%" }}>Date & Host</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr
                  key={idx}
                  style={{
                    background: idx % 2 === 0 ? "#FAF6EE" : "white",
                    borderBottom: "1px solid #ECE3D4",
                    fontSize: "clamp(12px, 2cqw, 15px)"
                  }}
                >
                  <td style={{ padding: "8px 12px", fontWeight: 800, color: "var(--vaigai-blue)", verticalAlign: "top" }}>
                    {r.sl}
                  </td>
                  <td style={{ padding: "8px 12px", verticalAlign: "top" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--ink)", fontSize: "clamp(13px, 2.1cqw, 16px)" }}>{r.name}</div>
                    <span style={{ fontSize: "clamp(10px, 1.6cqw, 12px)", background: "rgba(215, 55, 43, 0.12)", color: "var(--vaigai-red)", padding: "2px 6px", borderRadius: "3px", fontWeight: 700, display: "inline-block", marginTop: "2px" }}>
                      {r.dept}
                    </span>
                  </td>
                  <td style={{ padding: "8px 12px", color: "var(--ink)", verticalAlign: "top", lineHeight: 1.45, fontSize: "clamp(12px, 2cqw, 15px)" }}>
                    {r.programme}
                  </td>
                  <td style={{ padding: "8px 12px", verticalAlign: "top", fontSize: "clamp(11px, 1.8cqw, 13px)", color: "var(--ink-light)" }}>
                    <div style={{ fontWeight: 700, color: "var(--navy)" }}>{r.date}</div>
                    <div style={{ color: "var(--ink-muted)", marginTop: "2px" }}>{r.host}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  );
});
