import React, { forwardRef } from 'react';
import PageShell from '../PageShell';
import { Award, BookOpen, Building, CheckCircle2, Globe, Mail, MapPin } from 'lucide-react';

// Page 34: Academic Journey & Acknowledgements
export const ClosingLeftPage = forwardRef(function ClosingLeftPage(
  { closing, pageNumber = 34 },
  ref
) {
  const isLeft = pageNumber ? pageNumber % 2 === 0 : true;

  return (
    <PageShell
      ref={ref}
      pageNumber={pageNumber}
      isLeft={isLeft}
      showHeader={true}
      showFooter={true}
      sectionName="ACKNOWLEDGEMENTS"
    >
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(14px, 2.2cqw, 24px) clamp(12px, 1.8cqw, 20px)',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {/* Header Block */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(10.5px, 1.7cqw, 13px)',
              fontWeight: 800,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--vaigai-red)',
              marginBottom: '3px'
            }}
          >
            Academic Milestones
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(22px, 4cqw, 32px)',
              fontWeight: 800,
              color: 'var(--navy)',
              lineHeight: 1.15,
              marginBottom: '4px'
            }}
          >
            The Journey Continues
          </h2>
          <div
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(12px, 1.8cqw, 14px)',
              color: 'var(--ink-muted)',
              fontWeight: 600
            }}
          >
            Reflections on the Inaugural Edition • Vol. 01, Issue 01
          </div>
        </div>

        {/* Editorial Narrative */}
        <div style={{ margin: 'clamp(8px, 1.2cqw, 14px) 0' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(14px, 2.2cqw, 16.5px)',
              lineHeight: 1.6,
              color: 'var(--ink)',
              marginBottom: 'clamp(8px, 1.2cqw, 12px)'
            }}
          >
            {closing?.message ||
              "Thank you for reading the inaugural issue of Vaigai's Ikigai. This bimonthly publication chronicles our relentless pursuit of academic rigor, technical craftsmanship, student enterprise, and institutional excellence across all departments."}
          </p>

          <blockquote
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(13px, 2cqw, 16.5px)',
              lineHeight: 1.5,
              color: 'var(--navy)',
              borderLeft: '3.5px solid var(--gold)',
              paddingLeft: 'clamp(10px, 1.6cqw, 16px)',
              margin: 'clamp(8px, 1.2cqw, 14px) 0',
              background: 'rgba(201, 162, 75, 0.08)',
              paddingTop: '8px',
              paddingBottom: '8px',
              borderRadius: '0 6px 6px 0'
            }}
          >
            "Education is not merely the accumulation of facts, but the elevation of human consciousness and capability."
          </blockquote>
        </div>

        {/* Issue Highlights Summary Card */}
        <div
          style={{
            background: 'white',
            borderRadius: '10px',
            border: '1.5px solid #E6DDCF',
            padding: 'clamp(12px, 1.8cqw, 18px)',
            boxShadow: '0 4px 14px rgba(20, 33, 61, 0.04)'
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(11px, 1.7cqw, 13px)',
              fontWeight: 800,
              color: 'var(--navy)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Award size={16} color="var(--vaigai-red)" />
            <span>Volume 01 Summary & Highlights</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
            {[
              '18 Departmental Associations, Symposia & Club Events',
              '24 Faculty Development & Enrichment Programmes Attended',
              '7 High-Impact Research Publications in Reputed Journals',
              '15 National Certification Toppers in NPTEL Examinations',
              'Over 100+ Campus Placement Offers in Leading Tech & Core Sectors'
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-ui)',
                  fontSize: 'clamp(11.5px, 1.7cqw, 13.5px)',
                  color: 'var(--ink)'
                }}
              >
                <CheckCircle2 size={15} color="var(--vaigai-blue)" style={{ flexShrink: 0 }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div
          style={{
            paddingTop: '8px',
            borderTop: '1px solid rgba(20, 33, 61, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-ui)',
            fontSize: 'clamp(10.5px, 1.5cqw, 12px)',
            color: 'var(--ink-muted)'
          }}
        >
          <span>Vaigai College of Engineering</span>
          <span style={{ fontWeight: 700, color: 'var(--vaigai-red)' }}>July – August 2026</span>
        </div>
      </div>
    </PageShell>
  );
});

// Page 35: Official Institutional Directory & Colophon
export const ClosingRightPage = forwardRef(function ClosingRightPage(
  { closing, pageNumber = 35 },
  ref
) {
  const isLeft = pageNumber ? pageNumber % 2 === 0 : false;

  return (
    <PageShell
      ref={ref}
      pageNumber={pageNumber}
      isLeft={isLeft}
      showHeader={true}
      showFooter={true}
      sectionName="OFFICIAL DIRECTORY"
    >
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(14px, 2.2cqw, 24px) clamp(12px, 1.8cqw, 20px)',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {/* Header Block */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(10.5px, 1.7cqw, 13px)',
              fontWeight: 800,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--vaigai-blue)',
              marginBottom: '3px'
            }}
          >
            Institutional Directory
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(22px, 4cqw, 32px)',
              fontWeight: 800,
              color: 'var(--navy)',
              lineHeight: 1.15,
              marginBottom: '4px'
            }}
          >
            Vaigai College of Engineering
          </h2>
          <div
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(11.5px, 1.7cqw, 13.5px)',
              color: 'var(--ink-muted)',
              fontWeight: 600
            }}
          >
            Approved by AICTE, New Delhi & Affiliated to Anna University, Chennai
          </div>
        </div>

        {/* Campus Photograph Showcase */}
        <div
          style={{
            width: '100%',
            height: 'clamp(130px, 20cqw, 175px)',
            borderRadius: '10px',
            overflow: 'hidden',
            border: '2px solid #E6DDCF',
            boxShadow: '0 6px 18px rgba(20, 33, 61, 0.08)',
            position: 'relative',
            margin: 'clamp(6px, 1cqw, 12px) 0'
          }}
        >
          <img
            src="/assets/images/events/cover_campus_hero.webp"
            alt="Vaigai College Campus"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              insetInline: 0,
              background: 'linear-gradient(180deg, transparent 0%, rgba(16, 27, 51, 0.85) 100%)',
              padding: '6px 12px',
              color: 'white',
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(10px, 1.5cqw, 12px)',
              fontWeight: 700
            }}
          >
            Main Academic Campus • Madurai, Tamil Nadu
          </div>
        </div>

        {/* Official Contact & Registration Details */}
        <div
          style={{
            background: 'white',
            borderRadius: '10px',
            border: '1.5px solid #E6DDCF',
            padding: 'clamp(12px, 1.8cqw, 18px)',
            boxShadow: '0 4px 14px rgba(20, 33, 61, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src="/assets/images/logo.webp"
              alt="Vaigai Emblem"
              style={{ width: '38px', height: '38px', objectFit: 'contain' }}
              onError={(e) => { e.target.src = '/assets/images/logo.png'; }}
            />
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(14.5px, 2.2cqw, 18px)',
                  fontWeight: 800,
                  color: 'var(--navy)'
                }}
              >
                Vaigai College of Engineering
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 'clamp(10px, 1.5cqw, 12px)',
                  color: 'var(--ink-muted)'
                }}
              >
                Managed by Vaigai Educational Trust (VET)
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: '1px solid #ECE3D4',
              paddingTop: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(11.5px, 1.7cqw, 13.5px)',
              color: 'var(--ink)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <MapPin size={16} color="var(--vaigai-red)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{closing?.contact?.address || 'Vinayagapuram, Therkutheru, Madurai - 625122, Tamil Nadu'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={16} color="var(--vaigai-blue)" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 700, color: 'var(--vaigai-blue)' }}>
                {closing?.contact?.website || 'www.vaigai.org'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={16} color="var(--gold)" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 700, color: 'var(--navy)' }}>
                {closing?.contact?.email || 'vaigaioffice@gmail.com'}
              </span>
            </div>
          </div>
        </div>

        {/* Colophon & Circulation Notice */}
        <div
          style={{
            padding: '8px 12px',
            background: 'rgba(20, 33, 61, 0.04)',
            borderRadius: '6px',
            border: '1px solid rgba(20, 33, 61, 0.08)',
            textAlign: 'center',
            fontFamily: 'var(--font-ui)',
            fontSize: 'clamp(10px, 1.5cqw, 11.5px)',
            color: 'var(--ink-muted)'
          }}
        >
          VAIGAI'S IKIGAI • Published for Internal Academic Circulation • All Rights Reserved.
        </div>
      </div>
    </PageShell>
  );
});
