import { useEffect, useRef, useState } from "react";

interface ShowcaseVideoProps {
  /** Accessible description of what the video shows. */
  label: string;
  /** Basename under /public/videos: `<name>.webm`, `<name>.mp4` and `<name>.jpg` (poster). */
  name: string;
  /** Shown in the window title bar. */
  title: string;
}

/**
 * A motion-design showcase in a window frame. It is muted, inline and looping, plays only while
 * on screen, and never autoplays under prefers-reduced-motion: those visitors get the poster and
 * a play control. Playback starts from JS (not the `autoplay` attribute) so a video below the fold
 * does not download or run before it is seen, and reduced-motion users never see a first frame move.
 * The bar button lets anyone pause it at any time (WCAG 2.2.2).
 */
export function ShowcaseVideo({ label, name, title }: ShowcaseVideoProps) {
  "use no memo";
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
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
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

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
    return () => {
      observer.disconnect();
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
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
      </figcaption>
      <div className="window__stage">
        <video
          aria-label={label}
          className="window__video"
          height={1080}
          loop
          muted
          playsInline
          poster={`/public/videos/${name}.jpg`}
          preload="metadata"
          ref={ref}
          width={1920}
        >
          <source src={`/public/videos/${name}.webm`} type="video/webm" />
          <source src={`/public/videos/${name}.mp4`} type="video/mp4" />
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
