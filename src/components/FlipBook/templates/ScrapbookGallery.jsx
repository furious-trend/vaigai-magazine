import React, { forwardRef } from 'react';
import PageShell from '../PageShell';

const ScrapbookGallery = forwardRef(function ScrapbookGallery(
  { event, onOpenLightbox },
  ref
) {
  const hasGallery = event.galleryImages && event.galleryImages.length > 0;

  // Pre-configured scrapbook rotation offsets for natural polaroid collage feel
  const rotations = [-2.5, 2.8, -1.8, 2.2, -3];

  return (
    <PageShell
      ref={ref}
      pageNumber={event.rightPage}
      isLeft={false}
      sectionName={`${event.title?.slice(0, 24)} • GALLERY`}
    >
      <div style={{ padding: "1.5cqw 1cqw", height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(27, 27, 47, 0.1)", paddingBottom: "1cqw", marginBottom: "2cqw" }}>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "1.3cqw", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--navy)" }}>
            {hasGallery ? "Event Scrapbook & Field Moments" : "Official Event Presentation"}
          </div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: "1.2cqw", color: "var(--ink-muted)" }}>
            Tap photo to zoom
          </div>
        </div>

        {/* Content Area */}
        {hasGallery ? (
          /* Multi-Photo Scrapbook Collage */
          <div
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: event.galleryImages.length === 1 ? "1fr" : "repeat(2, 1fr)",
              gap: "2.5cqw",
              alignContent: "center",
              padding: "1cqw"
            }}
          >
            {event.galleryImages.map((img, idx) => {
              const rot = rotations[idx % rotations.length];
              return (
                <div
                  key={idx}
                  className="photo-frame"
                  onClick={() => onOpenLightbox && onOpenLightbox(img.src, img.caption || event.title)}
                  style={{
                    position: "relative",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transform: `rotate(${rot}deg)`,
                    height: event.galleryImages.length === 1 ? "42cqw" : "26cqw"
                  }}
                >
                  <div className="tape-top" />
                  <img
                    src={img.src}
                    alt={img.caption || "Event Photo"}
                    style={{ width: "100%", height: "82%", objectFit: "cover", borderRadius: "2px" }}
                  />
                  {img.caption && (
                    <div
                      style={{
                        height: "18%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0 1cqw",
                        fontFamily: "var(--font-hand)",
                        fontSize: "2cqw",
                        color: "var(--ink-light)",
                        textAlign: "center",
                        overflow: "hidden"
                      }}
                    >
                      {img.caption}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Large Poster / Focal Presentation View */
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2cqw"
            }}
          >
            <div
              className="photo-frame"
              onClick={() => onOpenLightbox && onOpenLightbox(event.heroImage, event.title)}
              style={{
                width: "92%",
                height: "52cqw",
                position: "relative",
                cursor: "pointer",
                borderRadius: "6px",
                transform: "rotate(0.5deg)"
              }}
            >
              <div className="tape-top" />
              <img
                src={event.heroImage}
                alt={event.title}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>

            {/* Poster Highlight Card */}
            <div
              style={{
                width: "92%",
                background: "white",
                padding: "1.5cqw 2cqw",
                borderRadius: "6px",
                border: "1px solid #E6DDCF",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <div>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "1.2cqw", fontWeight: 700, color: "var(--vaigai-red)", textTransform: "uppercase" }}>
                  Venue
                </span>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "2cqw", fontWeight: 700, color: "var(--navy)" }}>
                  {event.venue || "Vaigai College Campus"}
                </div>
              </div>
              <div>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: "1.2cqw", fontWeight: 700, color: "var(--gold)", textTransform: "uppercase" }}>
                  Date
                </span>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "2cqw", fontWeight: 700, color: "var(--navy)" }}>
                  {event.date}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
});

export default ScrapbookGallery;

