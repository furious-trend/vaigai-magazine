import React, { forwardRef } from 'react';
import PageShell from '../PageShell';

const EditorialPage = forwardRef(function EditorialPage({ editorial, pageNumber = 2 }, ref) {
  const getInitials = (name) => {
    return name
      .replace(/^Dr\.\s*|^Ms\.\s*|^Mr\.\s*/i, '')
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join('');
  };

  return (
    <PageShell
      ref={ref}
      pageNumber={pageNumber}
      isLeft={true}
      sectionName="EDITORIAL DESK"
    >
      <div style={{ padding: "clamp(16px, 2.5cqw, 28px) clamp(14px, 2cqw, 24px)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {/* Header Block */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "clamp(11px, 1.9cqw, 14px)",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--vaigai-red)",
              marginBottom: "0.5cqw"
            }}
          >
            From the Editorial Desk
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(26px, 5.2cqw, 38px)",
              fontWeight: 800,
              color: "var(--navy)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              marginBottom: "1.5cqw"
            }}
          >
            {editorial?.title || "Editorial Team"}
          </h2>

          {/* Inspirational Editorial Quote */}
          <blockquote
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(15px, 2.6cqw, 20px)",
              lineHeight: 1.55,
              color: "var(--navy)",
              borderLeft: "4px solid var(--gold)",
              paddingLeft: "clamp(12px, 2cqw, 18px)",
              margin: "1cqw 0 2cqw",
              background: "rgba(201, 162, 75, 0.08)",
              paddingTop: "clamp(10px, 1.5cqw, 14px)",
              paddingBottom: "clamp(10px, 1.5cqw, 14px)",
              borderRadius: "0 8px 8px 0"
            }}
          >
            "Words become memories, and memories shape legacy. Here is the spirit, scholarship, and service of Vaigai College of Engineering."
          </blockquote>
        </div>

        {/* Editorial Members List with Initials Badges */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px, 1.8cqw, 20px)", margin: "auto 0" }}>
          {editorial?.members?.map((member, idx) => (
            <div
              key={idx}
              style={{
                background: "white",
                padding: "clamp(14px, 2.2cqw, 22px) clamp(16px, 2.5cqw, 26px)",
                borderRadius: "10px",
                border: "1.5px solid #E8DFD0",
                boxShadow: "0 4px 14px rgba(20, 33, 61, 0.05)",
                display: "flex",
                alignItems: "center",
                gap: "clamp(14px, 2cqw, 20px)",
                transition: "all 0.25s ease"
              }}
            >
              {/* Initials Badge */}
              <div
                style={{
                  width: "clamp(42px, 6.5cqw, 54px)",
                  height: "clamp(42px, 6.5cqw, 54px)",
                  borderRadius: "50%",
                  background: idx === 0
                    ? "linear-gradient(135deg, var(--vaigai-red) 0%, #901B12 100%)"
                    : "linear-gradient(135deg, var(--navy) 0%, var(--vaigai-blue-dark) 100%)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(16px, 2.6cqw, 20px)",
                  fontWeight: 800,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                  flexShrink: 0
                }}
              >
                {getInitials(member.name)}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(17px, 2.9cqw, 22px)",
                    fontWeight: 800,
                    color: "var(--ink)",
                    lineHeight: 1.2
                  }}
                >
                  {member.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "clamp(13px, 2.1cqw, 16px)",
                    fontWeight: 700,
                    color: "var(--vaigai-red)",
                    marginTop: "0.2cqw"
                  }}
                >
                  {member.designation}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "clamp(12px, 1.9cqw, 14px)",
                    color: "var(--ink-muted)",
                    marginTop: "0.2cqw"
                  }}
                >
                  {member.institution}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom College Honour Callout - Amma removed */}
        <div
          style={{
            padding: "clamp(12px, 1.8cqw, 18px)",
            background: "linear-gradient(135deg, rgba(201, 162, 75, 0.12) 0%, rgba(20, 33, 61, 0.05) 100%)",
            borderRadius: "8px",
            border: "1.5px solid var(--gold)",
            textAlign: "center"
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(15px, 2.4cqw, 18px)",
              fontWeight: 800,
              color: "var(--navy)",
              letterSpacing: "0.04em"
            }}
          >
            VAIGAI COLLEGE OF ENGINEERING
          </p>
          <p
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "clamp(12px, 1.8cqw, 14px)",
              color: "var(--ink-muted)",
              marginTop: "0.3cqw"
            }}
          >
            Published by Vaigai Educational Trust (VET), Madurai • Where Purpose Meets Possibility.
          </p>
        </div>
      </div>
    </PageShell>
  );
});

export default EditorialPage;
