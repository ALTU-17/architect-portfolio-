"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const statusFor = (progress: number) => {
  if (progress < 24) {
    return {
      title: "Surveying the room",
      detail: "Reading light, proportion and the existing bones.",
    };
  }
  if (progress < 52) {
    return {
      title: "Drafting the plan",
      detail: "Walls, thresholds and the path between them.",
    };
  }
  if (progress < 78) {
    return {
      title: "Selecting materials",
      detail: "Stone, lime, smoked oak, a thread of brass.",
    };
  }
  return {
    title: "Setting the atmosphere",
    detail: "Almost still. Almost ready to be lived in.",
  };
};

const stroke = {
  fill: "none",
  stroke: "rgba(241,237,229,0.82)",
  strokeWidth: 1.2,
  strokeLinecap: "square" as const,
};

const accentStroke = {
  fill: "none",
  stroke: "#aa5032",
  strokeWidth: 1.6,
  strokeLinecap: "square" as const,
};

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [finished, setFinished] = useState(false);
  const finishedRef = useRef(false);
  const finishRef = useRef<() => void>(() => {});
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let raf = 0;
    let exitTimer = 0;
    let seen = false;

    try {
      seen = window.sessionStorage.getItem("av-intro-seen") === "1";
    } catch {
      seen = false;
    }

    const duration = reduceMotion ? 360 : seen ? 1150 : 3900;

    document.documentElement.classList.add("is-locked");

    finishRef.current = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setLeaving(true);

      try {
        window.sessionStorage.setItem("av-intro-seen", "1");
      } catch {
        // Storage can be unavailable in private browsing; the intro still works.
      }

      exitTimer = window.setTimeout(
        () => {
          document.documentElement.classList.remove("is-locked");
          setFinished(true);
          onCompleteRef.current();
        },
        reduceMotion ? 180 : 1080,
      );
    };

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setProgress(Math.min(100, Math.round(eased * 100)));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        finishRef.current();
      }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(exitTimer);
      document.documentElement.classList.remove("is-locked");
    };
  }, [reduceMotion]);

  if (finished) return null;

  const status = statusFor(progress);
  const count = String(progress).padStart(3, "0");

  return (
    <div
      className="preloader"
      role="status"
      aria-label="Atelier Vance is loading"
      aria-live="polite"
    >
      <div className="preloader__panels" aria-hidden="true">
        {[0, 1, 2, 3].map((panel) => (
          <motion.div
            key={panel}
            className="preloader__panel"
            initial={{ y: 0 }}
            animate={leaving ? { y: "-101%" } : { y: 0 }}
            transition={{
              duration: reduceMotion ? 0.01 : 1.05,
              ease: EASE,
              delay: reduceMotion ? 0 : panel * 0.055,
            }}
          />
        ))}
      </div>

      <motion.div
        className="preloader__grid"
        aria-hidden="true"
        animate={{ opacity: leaving ? 0 : 0.7 }}
        transition={{ duration: 0.35 }}
      />

      <motion.div
        className="preloader__content"
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ duration: reduceMotion ? 0.01 : 0.35 }}
      >
        <div className="loader-top">
          <div className="loader-top__brand">
            <span className="loader-top__mark">AV</span>
            <div>
              Atelier Vance
              <br />
              Interior architecture
            </div>
          </div>
          <div>
            45.4642° N / 9.1900° E
            <br />
            Milano — København
          </div>
          <div>
            Drawing no. AV—001
            <br />
            Scale 1:20
          </div>
        </div>

        <div className="loader-center">
          <span className="loader-side" aria-hidden="true">
            Space / Light / Material
          </span>

          <div className="loader-blueprint" aria-hidden="true">
            <svg viewBox="0 0 600 400">
              <motion.rect
                x="60"
                y="50"
                width="480"
                height="300"
                style={stroke}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.35, ease: EASE, delay: 0.1 }}
              />

              <motion.path
                d="M60 200H280M280 50V350M430 200H540M430 200V350M280 280H430"
                style={stroke}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: EASE, delay: 0.35 }}
              />

              <motion.path
                d="M280 200a34 34 0 0 1-34 34M430 280a30 30 0 0 0 30-30M330 50a26 26 0 0 0-26 26"
                style={{ ...stroke, stroke: "rgba(241,237,229,0.5)", strokeWidth: 0.9 }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: EASE, delay: 0.9 }}
              />

              <motion.rect
                x="92"
                y="84"
                width="138"
                height="72"
                style={{ ...stroke, strokeWidth: 0.85 }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.85 }}
              />
              <motion.path
                d="M92 120h138M126 84v72M168 84v72"
                style={{ ...stroke, strokeWidth: 0.7, stroke: "rgba(241,237,229,0.42)" }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, ease: EASE, delay: 1 }}
              />

              <motion.rect
                x="312"
                y="82"
                width="88"
                height="52"
                style={{ ...stroke, strokeWidth: 0.8 }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, ease: EASE, delay: 1 }}
              />
              <motion.circle
                cx="356"
                cy="108"
                r="19"
                style={{ ...stroke, strokeWidth: 0.7 }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: EASE, delay: 1.15 }}
              />

              <motion.rect
                x="304"
                y="238"
                width="96"
                height="74"
                style={{ ...accentStroke, opacity: 0.9 }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: EASE, delay: 1.1 }}
              />
              <motion.path
                d="M304 268h96M330 238v74M374 238v74"
                style={{ ...accentStroke, strokeWidth: 0.8, opacity: 0.55 }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: EASE, delay: 1.25 }}
              />

              <motion.path
                d="M60 200h14M46 50v12M540 50v12M60 350h14"
                style={{ ...stroke, stroke: "rgba(241,237,229,0.4)", strokeWidth: 0.8 }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              />

              <motion.path
                d="M60 380h480M60 374v12M540 374v12"
                style={{ fill: "none", stroke: "rgba(241,237,229,0.26)", strokeWidth: 0.8 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.3 }}
              />
              <motion.text
                x="272"
                y="394"
                style={{
                  fill: "rgba(241,237,229,0.4)",
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontSize: 7,
                  letterSpacing: "0.12em",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                12 400 MM
              </motion.text>

              <motion.circle
                cx="520"
                cy="74"
                r="15"
                style={{ ...stroke, stroke: "rgba(241,237,229,0.35)", strokeWidth: 0.7 }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, delay: 1.2 }}
              />
              <motion.path
                d="M520 64v15l9 5"
                style={{ ...accentStroke, strokeWidth: 1.2 }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, delay: 1.35 }}
              />
              <motion.text
                x="514"
                y="110"
                style={{
                  fill: "rgba(241,237,229,0.35)",
                  fontFamily: "var(--font-manrope), sans-serif",
                  fontSize: 6,
                  letterSpacing: "0.12em",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.5 }}
              >
                N
              </motion.text>
            </svg>
            <span className="loader-scanline" aria-hidden="true" />
          </div>

          <span className="loader-mono hidden lg:block" aria-hidden="true">
            AV
          </span>
        </div>

        <div className="loader-bottom">
          <div className="loader-status">
            <strong>{status.title}</strong>
            {status.detail}
          </div>
          <div className="loader-count">
            <span className="loader-count__num">{count}</span>
            <span className="loader-count__label">
              per cent
              <br />
              drafted
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="loader-progress"
        aria-hidden="true"
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ duration: 0.25 }}
      >
        <div
          className="loader-progress__fill"
          style={{ transform: `scaleX(${Math.max(progress, 1) / 100})` }}
        />
      </motion.div>

      <motion.button
        type="button"
        className="loader-skip"
        onClick={() => finishRef.current()}
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ duration: 0.25 }}
        disabled={leaving}
        data-cursor="hover"
      >
        Skip intro
        <span aria-hidden="true" />
      </motion.button>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        aria-label="Portfolio loading progress"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
        }}
      >
        {progress}%
      </div>
    </div>
  );
}
