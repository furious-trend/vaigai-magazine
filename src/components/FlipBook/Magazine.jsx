import React, { useState, useEffect, useMemo, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';

import CoverPage from './templates/CoverPage';
import EditorialPage from './templates/EditorialPage';
import ContentsPage from './templates/ContentsPage';
import IkigaiPage from './templates/IkigaiPage';
import AboutCollegePage from './templates/AboutCollegePage';
import SingleEventPage from './templates/SingleEventPage';
import { RankHoldersStory, RankHoldersPoster } from './templates/RankHoldersSpread';
import CombinedPlacementPage from './templates/CombinedPlacementPage';
import { FacultyProgrammesLeft, FacultyProgrammesRight } from './templates/TableSpread';
import { StudentAchievementPoster, StudentAchievementTable } from './templates/StudentAchievementSpread';
import { FacultyPublicationsLeft, FacultyPublicationsRight } from './templates/PublicationsSpread';
import { ToppersPage } from './templates/ToppersSpread';
import { ClosingRightPage } from './templates/ClosingSpread';
import HeartLetterPage from './templates/HeartLetterPage';
import BackCoverPage from './templates/BackCoverPage';

const Magazine = ({
  content,
  ammaData,
  currentPage,
  onPageChange,
  onOpenLightbox,
  onFlipAudio,
  flipBookRef,
  onOpenHeartExperience
}) => {
  const [dimensions, setDimensions] = useState({ width: 550, height: 778, isMobile: false });
  const [remountKey, setRemountKey] = useState(0);
  const touchStartRef = React.useRef(null);

  // Responsive book dimension calculation
  const updateDimensions = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isMobile = vw < 768;

    let targetWidth, targetHeight;

    if (isMobile) {
      // Single page view optimized for smartphone screens
      const availableWidth = Math.min(vw - 12, 480);
      const availableHeight = vh - 68; // space for bottom mobile toolbar

      targetWidth = Math.max(availableWidth, 280);
      targetHeight = Math.min(availableHeight, Math.round(targetWidth * 1.52));
    } else {
      // Dual-page spread for tablets and desktops
      const availableWidth = vw - 30;
      const availableHeight = vh - 85;
      const maxSingleWidth = (availableWidth - 30) / 2;

      targetHeight = Math.min(availableHeight, 920);
      targetWidth = targetHeight / 1.414;

      if (targetWidth > maxSingleWidth) {
        targetWidth = maxSingleWidth;
        targetHeight = targetWidth * 1.414;
      }
    }

    setDimensions({
      width: Math.floor(targetWidth),
      height: Math.floor(targetHeight),
      isMobile
    });
    setRemountKey((k) => k + 1);
  }, []);

  // Native touch-swipe gesture support for mobile phones
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now()
      };
    }
  };

  const handleTouchEnd = (e) => {
    if (!touchStartRef.current || e.changedTouches.length === 0) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;

    // Detect horizontal swipe (horizontal delta > vertical delta, min 45px distance, within 450ms)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 45 && deltaTime < 450) {
      if (deltaX < 0) {
        // Swipe left -> Next page
        flipBookRef?.current?.pageFlip()?.flipNext();
      } else {
        // Swipe right -> Prev page
        flipBookRef?.current?.pageFlip()?.flipPrev();
      }
    }
    touchStartRef.current = null;
  };

  useEffect(() => {
    updateDimensions();
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateDimensions, 250);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [updateDimensions]);

  const handleFlip = useCallback((e) => {
    const newPage = e.data;
    if (onPageChange) {
      onPageChange(newPage);
    }
    if (onFlipAudio) {
      onFlipAudio();
    }
  }, [onPageChange, onFlipAudio]);

  const handleJumpToPage = useCallback((pageNum) => {
    if (flipBookRef?.current) {
      try {
        flipBookRef.current.pageFlip().flip(pageNum);
      } catch (err) {
        console.warn("Flip jump error:", err);
      }
    }
  }, [flipBookRef]);

  // Memoize event objects lookup
  const eventsMap = useMemo(() => {
    const map = {};
    content?.events?.forEach((e) => {
      map[e.id] = e;
    });
    return map;
  }, [content]);

  // Exactly 36 pages: 35 content pages + 1 standalone back cover
  const pages = useMemo(() => {
    if (!content) return [];

    return [
      // P1: Cover
      <CoverPage
        key="p1"
        meta={content.meta}
        onOpen={() => handleJumpToPage(1)}
      />,

      // P2-P3: Spread 1 (Editorial & Contents)
      <EditorialPage key="p2" editorial={content.editorial} pageNumber={2} />,
      <ContentsPage key="p3" toc={content.toc} onJumpToPage={handleJumpToPage} pageNumber={3} />,

      // P4-P5: Spread 2 (Ikigai & About College)
      <IkigaiPage key="p4" ikigai={content.ikigai} pageNumber={4} />,
      <AboutCollegePage key="p5" about={content.aboutCollege} pageNumber={5} />,

      // P6-P7: Spread 3 (Civil RACE & Mech MESA)
      <SingleEventPage key="p6" event={eventsMap["civil-race"]} pageNumber={6} onOpenLightbox={onOpenLightbox} />,
      <SingleEventPage key="p7" event={eventsMap["mech-mesa"]} pageNumber={7} onOpenLightbox={onOpenLightbox} />,

      // P8-P9: Spread 4 (ECE & EEE IoT & Faculty FDC)
      <SingleEventPage key="p8" event={eventsMap["ece-eee-iot"]} pageNumber={8} onOpenLightbox={onOpenLightbox} />,
      <SingleEventPage key="p9" event={eventsMap["cells-fdc"]} pageNumber={9} onOpenLightbox={onOpenLightbox} />,

      // P10-P11: Spread 5 (YRC Health & NSS Blood Donation)
      <SingleEventPage key="p10" event={eventsMap["yrc-rrc-health"]} pageNumber={10} onOpenLightbox={onOpenLightbox} />,
      <SingleEventPage key="p11" event={eventsMap["nss-blood-donation"]} pageNumber={11} onOpenLightbox={onOpenLightbox} />,

      // P12-P13: Spread 6 (RRC Quiz & Anti-Drug Club)
      <SingleEventPage key="p12" event={eventsMap["rrc-quiz"]} pageNumber={12} onOpenLightbox={onOpenLightbox} />,
      <SingleEventPage key="p13" event={eventsMap["anti-drug"]} pageNumber={13} onOpenLightbox={onOpenLightbox} />,

      // P14-P15: Spread 7 (EDC Startup & NSS 78th Independence)
      <SingleEventPage key="p14" event={eventsMap["edc-startup"]} pageNumber={14} onOpenLightbox={onOpenLightbox} />,
      <SingleEventPage key="p15" event={eventsMap["nss-independence"]} pageNumber={15} onOpenLightbox={onOpenLightbox} />,

      // P16-P17: Spread 8 (Anna University Rank Holders Story & Poster)
      <RankHoldersStory key="p16" event={eventsMap["anna-univ-rank"]} pageNumber={16} onOpenLightbox={onOpenLightbox} />,
      <RankHoldersPoster key="p17" event={eventsMap["anna-univ-rank"]} pageNumber={17} onOpenLightbox={onOpenLightbox} />,

      // P18-P19: Spread 9 (TPC Expert Talk & Beasant Drive)
      <SingleEventPage key="p18" event={eventsMap["tpc-expert-talk"]} pageNumber={18} onOpenLightbox={onOpenLightbox} />,
      <SingleEventPage key="p19" event={eventsMap["tpc-beasant"]} pageNumber={19} onOpenLightbox={onOpenLightbox} />,

      // P20-P21: Spread 10 (JRIP Selected 16 & INOVONZ Pooled)
      <SingleEventPage key="p20" event={eventsMap["tpc-jrip-selected"]} pageNumber={20} onOpenLightbox={onOpenLightbox} />,
      <SingleEventPage key="p21" event={eventsMap["tpc-inovonz-pooled"]} pageNumber={21} onOpenLightbox={onOpenLightbox} />,

      // P22-P23: Spread 11 (Newrta Off-Campus & Maadhesh / TACT Level 1)
      <SingleEventPage key="p22" event={eventsMap["tpc-newrta-offcampus"]} pageNumber={22} onOpenLightbox={onOpenLightbox} />,
      <CombinedPlacementPage
        key="p23"
        eventMaadhesh={eventsMap["tpc-maadhesh-selected"]}
        eventTact={eventsMap["tpc-tact-level1"]}
        pageNumber={23}
        onOpenLightbox={onOpenLightbox}
      />,

      // P24-P25: Spread 12 (Faculty Programmes Attended 1-16)
      <FacultyProgrammesLeft key="p24" table={content.tables.facultyProgrammes} pageNumber={24} />,
      <FacultyProgrammesRight key="p25" table={content.tables.facultyProgrammes} pageNumber={25} />,

      // P26-P27: Spread 13 (Student Achievements Table & Poster)
      <StudentAchievementTable key="p26" table={content.tables.studentAchievements} pageNumber={26} />,
      <StudentAchievementPoster key="p27" poster={content.tables.studentAchievements.poster} pageNumber={27} onOpenLightbox={onOpenLightbox} />,

      // P28-P29: Spread 14 (Faculty Publications in Reputed Journals 1-7)
      <FacultyPublicationsLeft key="p28" publications={content.tables.facultyPublications} pageNumber={28} />,
      <FacultyPublicationsRight key="p29" publications={content.tables.facultyPublications} pageNumber={29} />,

      // P30-P31: Spread 15 (NPTEL Toppers Oct 2025)
      <ToppersPage
        key="p30"
        title={content.tables.nptelOct2025.title}
        subtitle={content.tables.nptelOct2025.subtitle}
        rows={content.tables.nptelOct2025.rows.slice(0, 3)}
        pageNumber={30}
        isLeft={true}
        sectionName="NPTEL TOPPERS • OCT 2025"
        onOpenLightbox={onOpenLightbox}
      />,
      <ToppersPage
        key="p31"
        title={content.tables.nptelOct2025.title}
        subtitle={content.tables.nptelOct2025.subtitle}
        rows={content.tables.nptelOct2025.rows.slice(3, 7)}
        pageNumber={31}
        isLeft={false}
        sectionName="NPTEL TOPPERS • OCT 2025"
        onOpenLightbox={onOpenLightbox}
      />,

      // P32-P33: Spread 16 (NPTEL Toppers April 2026)
      <ToppersPage
        key="p32"
        title={content.tables.nptelApril2026.title}
        subtitle={content.tables.nptelApril2026.subtitle}
        rows={content.tables.nptelApril2026.rows.slice(0, 4)}
        pageNumber={32}
        isLeft={true}
        sectionName="NPTEL TOPPERS • APR 2026"
        onOpenLightbox={onOpenLightbox}
      />,
      <ToppersPage
        key="p33"
        title={content.tables.nptelApril2026.title}
        subtitle={content.tables.nptelApril2026.subtitle}
        rows={content.tables.nptelApril2026.rows.slice(4, 8)}
        pageNumber={33}
        isLeft={false}
        sectionName="NPTEL TOPPERS • APR 2026"
        onOpenLightbox={onOpenLightbox}
      />,

      // P34-P35: Spread 17 (Closing Acknowledgements & The Heart Letter)
      <ClosingRightPage key="p34" closing={content.closing} pageNumber={34} />,
      <HeartLetterPage key="p35" onOpenExperience={onOpenHeartExperience} pageNumber={35} />,

      // P36: Back Cover
      <BackCoverPage key="p36" backCover={content.backCover} pageNumber={36} />
    ];
  }, [content, eventsMap, onOpenLightbox, handleJumpToPage, onOpenHeartExperience]);

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        position: "relative",
        touchAction: "pan-y"
      }}
    >
      <HTMLFlipBook
        key={remountKey}
        ref={flipBookRef}
        width={dimensions.width}
        height={dimensions.height}
        size="fixed"
        minWidth={260}
        maxWidth={880}
        minHeight={380}
        maxHeight={1250}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        onFlip={handleFlip}
        flippingTime={750}
        usePortrait={dimensions.isMobile}
        startPage={currentPage}
        drawShadow={true}
        style={{
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.55), 0 10px 25px rgba(0, 0, 0, 0.4)",
          margin: "auto"
        }}
      >
        {pages}
      </HTMLFlipBook>
    </div>
  );
};

export default Magazine;
