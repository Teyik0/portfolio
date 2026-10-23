"use client";

import { useEffect, useRef, useState } from "react";

interface ShowcaseVideoProps {
  /** Accessible description of what the video shows. */
  label: string;
  /** URL without extension: `<path>.webm`, `<path>.mp4` and `<path>.jpg` (poster). */
  path: string;
  /** Shown in the window title bar. */
  title: string;
}

/**
 * A motion-design showcase in a window frame. It is muted, inline and looping, plays only while
 * on screen, and never autoplays under prefers-reduced-motion: those visitors get the poster and
 * a play control. Nothing downloads, not even the poster, until the frame is a viewport away
 * (`preload="none"`), and playback starts from JS rather than the `autoplay` attribute, so
 * reduced-motion users never see a first frame move.
 * The bar buttons let anyone pause it at any time (WCAG 2.2.2) and opt into its soundtrack;
 * leaving the viewport pauses it and keeps its sound setting.
 */
export function ShowcaseVideo({ label, path, title }: ShowcaseVideoProps) {
  "use no memo";
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [near, setNear] = useState(false);
  const [muted, setMuted] = useState(true);
  const userPaused = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) {
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(reduced);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onVolume = () => setMuted(video.muted);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("volumechange", onVolume);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }
        if (!entry.isIntersecting) {
          video.pause();
          return;
        }
        if (!(reduced || userPaused.current)) {
          video.play().catch(() => {
            // Autoplay refused (data saver, policy): the poster stays and the control still works.
          });
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(video);
    // The frame sits below the fold: fetch its poster only once it is a viewport away.
    const proximity = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNear(true);
          proximity.disconnect();
        }
      },
      { rootMargin: "100% 0px" }
    );
    proximity.observe(video);
    return () => {
      observer.disconnect();
      proximity.disconnect();
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("volumechange", onVolume);
    };
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) {
      return;
    }
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {
        // Playback blocked: the poster frame remains.
      });
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  // Autoplay must start muted; sound is opt-in, and only one showcase plays sound at a time.
  const toggleSound = () => {
    const video = ref.current;
    if (!video) {
      return;
    }
    if (video.muted) {
      for (const other of document.querySelectorAll("video")) {
        other.muted = other !== video;
      }
    } else {
      video.muted = true;
    }
  };

  const action = playing ? "Pause" : "Play";

  return (
    <figure className="window window--showcase">
      <figcaption className="window__bar">
        <span aria-hidden="true" className="window__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="window__title">{title}</span>
        <span className="window__actions">
          <button
            aria-label={`${action} the ${title} video`}
            className="window__control"
            onClick={toggle}
            type="button"
          >
            <span
              aria-hidden="true"
              className="window__control-icon"
              data-state={playing ? "pause" : "play"}
            />
            {action}
          </button>
          <button
            aria-label={
              muted ? `Turn on the ${title} video sound` : `Turn off the ${title} video sound`
            }
            aria-pressed={!muted}
            className="window__control"
            onClick={toggleSound}
            type="button"
          >
            {muted ? "Sound off" : "Sound on"}
          </button>
        </span>
      </figcaption>
      <div className="window__stage">
        <video
          aria-label={label}
          className="window__video"
          height={1080}
          loop
          muted
          playsInline
          poster={near ? `${path}.jpg` : undefined}
          preload="none"
          ref={ref}
          width={1920}
        >
          <source src={`${path}.webm`} type="video/webm" />
          <source src={`${path}.mp4`} type="video/mp4" />
        </video>
        {reducedMotion && !playing ? (
          <button
            aria-label={`Play the ${title} video`}
            className="window__play"
            onClick={toggle}
            type="button"
          >
            <span aria-hidden="true" className="window__control-icon" data-state="play" />
          </button>
        ) : null}
      </div>
    </figure>
  );
}
