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

  const magazineBgmRef = useRef(null);
  const pageTurnRef = useRef(null);

  // Initialize audio tracks: Magazine BGM and Page Turn SFX only
  useEffect(() => {
    try {
      // 1. Magazine background music: background bgm for magazine.m4a
      magazineBgmRef.current = new Howl({
        src: ['/assets/audio/magazine-bgm.m4a', '/assets/audio/ambient.mp3'],
        html5: true,
        loop: true,
        volume: 0,
        onloaderror: (id, err) => {
          console.warn('Magazine BGM load error (silent fallback):', err);
        }
      });

      // 2. Page flip sound effect
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

  // Sync volume state
  useEffect(() => {
    try {
      const targetVol = volume * 0.35;
      if (magazineBgmRef.current && !isMuted && magazineBgmRef.current.playing()) {
        magazineBgmRef.current.volume(targetVol);
      }
      localStorage.setItem('magazine_volume', String(volume));
    } catch {}
  }, [volume, isMuted]);

  const unlockAudioContext = () => {
    if (Howler.ctx && Howler.ctx.state === 'suspended') {
      Howler.ctx.resume();
    }
  };

  // Play background song for magazine reading
  const playMagazineBgm = useCallback(() => {
    unlockAudioContext();
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

  // Fallback alias pointing to standard magazine BGM (no sentiment music)
  const playSentimentBgm = useCallback(() => {
    playMagazineBgm();
  }, [playMagazineBgm]);

  // Play page turn SFX with subtle rate variation (0.95 - 1.05)
  const playPageTurn = useCallback(() => {
    if (isMuted) return;

    try {
      if (pageTurnRef.current) {
        const rate = 0.95 + Math.random() * 0.1;
        const id = pageTurnRef.current.play();
        pageTurnRef.current.rate(rate, id);
      }

      // Gentle ducking of background music during flip
      if (magazineBgmRef.current && magazineBgmRef.current.playing()) {
        const baseVol = volume * 0.35;
        const duckedVol = baseVol * 0.35;
        magazineBgmRef.current.fade(baseVol, duckedVol, 150);
        setTimeout(() => {
          if (magazineBgmRef.current && !isMuted) {
            magazineBgmRef.current.fade(duckedVol, baseVol, 350);
          }
        }, 650);
      }
    } catch (e) {
      console.warn('Play page-turn warning:', e);
    }
  }, [isMuted, volume]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return {
    isMuted,
    volume,
    setVolume,
    playMagazineBgm,
    playSentimentBgm,
    playPageTurn,
    toggleMute
  };
};
