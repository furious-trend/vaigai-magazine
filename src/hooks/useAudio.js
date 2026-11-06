import { useState, useEffect, useRef, useCallback } from 'react';
import { Howl, Howler } from 'howler';

export const useAudio = () => {
  const [isMuted, setIsMuted] = useState(() => {
    try {
      return localStorage.getItem('magazine_muted') === 'true';
    } catch {
      return false;
    }
  });

  const [volume, setVolume] = useState(() => {
    try {
      const saved = localStorage.getItem('magazine_volume');
      return saved !== null ? parseFloat(saved) : 0.7;
    } catch {
      return 0.7;
    }
  });

  const [activeTrack, setActiveTrack] = useState('none'); // 'sentiment' | 'magazine' | 'none'
  const magazineBgmRef = useRef(null);
  const sentimentBgmRef = useRef(null);
  const pageTurnRef = useRef(null);

  // Initialize audio tracks with silent fallback
  useEffect(() => {
    try {
      // 1. Magazine background song: background bgm for magazine.m4a
      magazineBgmRef.current = new Howl({
        src: ['/assets/audio/magazine-bgm.m4a', '/assets/audio/ambient.mp3'],
        html5: true,
        loop: true,
        volume: 0,
        onloaderror: (id, err) => {
          console.warn('Magazine BGM load error (silent fallback):', err);
        }
      });

      // 2. Sentiment song: sentiment bgm.mp3 (for Amma letter experience)
      sentimentBgmRef.current = new Howl({
        src: ['/assets/audio/sentiment-bgm.mp3'],
        html5: true,
        loop: true,
        volume: 0,
        onloaderror: (id, err) => {
          console.warn('Sentiment BGM load error (silent fallback):', err);
        }
      });

      // 3. Page flip sound effect
      pageTurnRef.current = new Howl({
        src: ['/assets/audio/page-turn.mp3'],
        volume: 0.65,
        onloaderror: (id, err) => {
          console.warn('Page-turn sound error (silent fallback):', err);
        }
      });
    } catch (e) {
      console.warn('Howler init warning:', e);
    }

    return () => {
      try {
        if (magazineBgmRef.current) magazineBgmRef.current.unload();
        if (sentimentBgmRef.current) sentimentBgmRef.current.unload();
        if (pageTurnRef.current) pageTurnRef.current.unload();
      } catch {}
    };
  }, []);

  // Sync mute state
  useEffect(() => {
    try {
      Howler.mute(isMuted);
      localStorage.setItem('magazine_muted', String(isMuted));
    } catch {}
  }, [isMuted]);

  // Sync volume state across active tracks
  useEffect(() => {
    try {
      const targetVol = volume * 0.35;
      if (activeTrack === 'magazine' && magazineBgmRef.current && !isMuted) {
        magazineBgmRef.current.volume(targetVol);
      } else if (activeTrack === 'sentiment' && sentimentBgmRef.current && !isMuted) {
        sentimentBgmRef.current.volume(targetVol);
      }
      localStorage.setItem('magazine_volume', String(volume));
    } catch {}
  }, [volume, activeTrack, isMuted]);

  const unlockAudioContext = () => {
    if (Howler.ctx && Howler.ctx.state === 'suspended') {
      Howler.ctx.resume();
    }
  };

  // Play sentiment song during Amma's letter
  const playSentimentBgm = useCallback(() => {
    unlockAudioContext();
    setActiveTrack('sentiment');

    if (magazineBgmRef.current?.playing()) {
      magazineBgmRef.current.fade(magazineBgmRef.current.volume(), 0, 1000);
      setTimeout(() => magazineBgmRef.current?.stop(), 1000);
    }

    if (sentimentBgmRef.current && !isMuted) {
      try {
        sentimentBgmRef.current.stop();
        sentimentBgmRef.current.play();
        sentimentBgmRef.current.fade(0, volume * 0.35, 3000);
      } catch (err) {
        console.warn('Sentiment play error:', err);
      }
    }
  }, [volume, isMuted]);

  // Play background song for magazine reading
  const playMagazineBgm = useCallback(() => {
    unlockAudioContext();
    setActiveTrack('magazine');

    // Fade out sentiment song if it was playing
    if (sentimentBgmRef.current?.playing()) {
      sentimentBgmRef.current.fade(sentimentBgmRef.current.volume(), 0, 1200);
      setTimeout(() => sentimentBgmRef.current?.stop(), 1200);
    }

    // Fade in magazine background song
    if (magazineBgmRef.current && !isMuted) {
      try {
        if (!magazineBgmRef.current.playing()) {
          magazineBgmRef.current.play();
        }
        magazineBgmRef.current.fade(magazineBgmRef.current.volume(), volume * 0.35, 2000);
      } catch (err) {
        console.warn('Magazine BGM play error:', err);
      }
    }
  }, [volume, isMuted]);

  // Play page turn SFX with randomized rate (0.95 - 1.05) & ducking
  const playPageTurn = useCallback(() => {
    if (isMuted) return;

    try {
      if (pageTurnRef.current) {
        const rate = 0.95 + Math.random() * 0.1;
        const id = pageTurnRef.current.play();
        pageTurnRef.current.rate(rate, id);
      }

      // Gentle ducking of current background track during flip
      const currentTrack = activeTrack === 'magazine' ? magazineBgmRef.current : sentimentBgmRef.current;
      if (currentTrack && currentTrack.playing()) {
        const baseVol = volume * 0.35;
        const duckedVol = baseVol * 0.35;
        currentTrack.fade(baseVol, duckedVol, 150);
        setTimeout(() => {
          if (currentTrack && !isMuted) {
            currentTrack.fade(duckedVol, baseVol, 350);
          }
        }, 650);
      }
    } catch (e) {
      console.warn('Play page-turn warning:', e);
    }
  }, [isMuted, activeTrack, volume]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return {
    isMuted,
    volume,
    setVolume,
    activeTrack,
    playSentimentBgm,
    playMagazineBgm,
    playPageTurn,
    toggleMute
  };
};
