"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => null,
});

const SCENE = "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode";

export function SplineObject() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { rootMargin: "300px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || loaded || failed || reduceMotion) return;
    const timer = window.setTimeout(() => setFailed(true), 18_000);
    return () => window.clearTimeout(timer);
  }, [visible, loaded, failed, reduceMotion]);

  const showScene = visible && !reduceMotion && !failed;

  return (
    <div
      ref={ref}
      className="spline-orb"
      data-cursor="drag"
      data-cursor-label="Orbit"
      aria-label="Interactive 3D material study. Drag to orbit."
    >
      <div className="spline-orb__fallback" aria-hidden="true">
        <span className="spline-orb__fallback-ring" />
        <span className="spline-orb__fallback-ring" />
        <span className="spline-orb__fallback-core" />
      </div>

      {showScene ? (
        <div className="spline-orb__canvas">
          <Spline
            scene={SCENE}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        </div>
      ) : null}

      {showScene && !loaded ? (
        <span className="spline-orb__loading">Loading form</span>
      ) : null}

      <span className="spline-orb__hint">
        {loaded ? "Drag to orbit" : "Material study"}
      </span>
    </div>
  );
}
