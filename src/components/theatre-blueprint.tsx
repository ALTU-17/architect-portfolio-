"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { getProject } from "@theatre/core";
import theatreState from "@/lib/theatre-state.json";
import { stages } from "@/data/studio";

type SequenceLike = { position: number };

function setPlanValues(
  element: HTMLElement | null,
  trace: number,
  tilt: number,
  rotate: number,
  glow: number,
) {
  if (!element) return;
  element.style.setProperty("--trace", trace.toFixed(4));
  element.style.setProperty("--tilt", tilt.toFixed(3));
  element.style.setProperty("--rotate", rotate.toFixed(3));
  element.style.setProperty("--glow", glow.toFixed(3));
  element.style.setProperty("--layers", Math.max(0.12, glow).toFixed(3));
}

export function TheatreBlueprint() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const planRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<SequenceLike | null>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [theatreReady, setTheatreReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  useEffect(() => {
    let cancelled = false;

    try {
      const config = { state: theatreState } as unknown as Parameters<
        typeof getProject
      >[1];
      const project = getProject("Atelier Vance — Process", config);
      const sheet = project.sheet("Process");
      const blueprint = sheet.object("Blueprint", {
        trace: 0,
        tilt: 0,
        rotate: 0,
        glow: 0,
      });

      blueprint.onValuesChange((values) => {
        if (cancelled) return;
        setPlanValues(
          planRef.current,
          values.trace,
          values.tilt,
          values.rotate,
          values.glow,
        );
      });

      sequenceRef.current = sheet.sequence;

      void project.ready.then(() => {
        if (cancelled) return;
        setTheatreReady(true);
        sheet.sequence.position = scrollYProgress.get();
      });
    } catch {
      // Scroll-driven CSS fallback remains active through setPlanValues.
    }

    return () => {
      cancelled = true;
    };
  }, [scrollYProgress]);

  useMotionValueEvent(smoothProgress, "change", (value) => {
    const clamped = Math.min(1, Math.max(0, value));

    if (sequenceRef.current) {
      sequenceRef.current.position = clamped;
    } else {
      // Graceful fallback if WebGL/Theatre cannot initialise.
      setPlanValues(
        planRef.current,
        clamped,
        clamped * 2.6,
        clamped * -2.2,
        clamped,
      );
    }

    const stage = Math.min(stages.length - 1, Math.floor(clamped * stages.length));
    setActiveStage(stage);
  });

  useEffect(() => {
    if (!reduceMotion) return;
    setPlanValues(planRef.current, 1, 2.6, -2.2, 1);
    const frame = window.requestAnimationFrame(() =>
      setActiveStage(stages.length - 1),
    );
    return () => window.cancelAnimationFrame(frame);
  }, [reduceMotion]);

  const progressNumber = String(
    Math.min(stages.length, activeStage + 1),
  ).padStart(2, "0");

  return (
    <section className="process" id="process" ref={containerRef}>
      <div className="process__sticky">
        <div className="shell process__grid">
          <div>
            <div className="process__intro">
              <p className="eyebrow">03 — Process</p>
              <h2 className="process__title display" style={{ marginTop: "1.2rem" }}>
                Behind
                <br />
                the <em className="serif-italic">lines</em>.
              </h2>
              <p
                style={{
                  maxWidth: "27rem",
                  marginTop: "1.4rem",
                  fontSize: "0.88rem",
                  lineHeight: 1.75,
                  color: "var(--ink-soft)",
                }}
              >
                Every project begins as a drawing. Scroll to move through the
                plan and watch the rooms, furniture and circulation settle into
                place.
              </p>
            </div>

            <div className="process__rail" aria-label="Design process stages">
              {stages.map((stage, index) => (
                <div
                  className={`process__stage ${index === activeStage ? "is-active" : ""}`}
                  key={stage.number}
                  aria-current={index === activeStage ? "step" : undefined}
                >
                  <span className="process__num">{stage.number}</span>
                  <span className="process__label">{stage.label}</span>
                  <div className="process__copy">
                    <strong>{stage.title}</strong>
                    {stage.body}
                  </div>
                </div>
              ))}
            </div>

            <div className="process__progress">
              <span>
                {progressNumber} / {String(stages.length).padStart(2, "0")}
              </span>
              <span className="process__progress-bar" aria-hidden="true">
                <motion.span
                  className="process__progress-fill"
                  style={{ scaleX: smoothProgress, display: "block" }}
                />
              </span>
              <span>{theatreReady ? "Theatre.js" : "Draft"}</span>
            </div>
          </div>

          <div className="process__visual">
            <div className="plan-canvas" ref={planRef}>
              <svg
                className="plan-svg"
                viewBox="0 0 900 620"
                role="img"
                aria-label="Architectural floor plan of a residence being drawn"
              >
                <title>Ground-floor plan, residence</title>
                <rect x="100" y="70" width="300" height="260" className="plan-fill" />
                <rect x="520" y="70" width="280" height="230" className="plan-fill" />
                <rect x="560" y="330" width="220" height="170" className="plan-fill" />

                <path
                  d="M100 70H800V540H100Z"
                  pathLength={1}
                  className="plan-line"
                />
                <path
                  d="M100 330H400M400 70V330M520 70V300M520 300H800M520 300V540M400 540V440H520"
                  pathLength={1}
                  className="plan-line"
                />
                <path
                  d="M560 330H800M560 330V540M560 410H800"
                  pathLength={1}
                  className="plan-line plan-line--soft"
                />

                <path
                  d="M400 330a32 32 0 0 1 32-32M520 300a30 30 0 0 0-30 30M400 440a34 34 0 0 0 34-34M560 410a28 28 0 0 0 28-28"
                  pathLength={1}
                  className="plan-line plan-line--soft"
                />

                <path
                  d="M130 500H365V250H455V140H760"
                  pathLength={1}
                  className="plan-accent"
                />

                <g className="plan-furniture">
                  <rect x="140" y="108" width="156" height="44" pathLength={1} className="plan-line" />
                  <path d="M140 120h156M140 138h156M192 108v44M246 108v44" className="plan-line plan-line--soft" pathLength={1} />
                  <rect x="186" y="190" width="78" height="34" className="plan-line" pathLength={1} />
                  <circle cx="225" cy="242" r="17" className="plan-line" pathLength={1} />
                  <rect x="322" y="120" width="46" height="104" className="plan-line" pathLength={1} />
                  <path d="M322 146h46M322 172h46M322 198h46" className="plan-line plan-line--soft" pathLength={1} />

                  <rect x="138" y="400" width="144" height="46" className="plan-line" pathLength={1} />
                  <circle cx="164" cy="470" r="10" className="plan-line" pathLength={1} />
                  <circle cx="204" cy="470" r="10" className="plan-line" pathLength={1} />
                  <circle cx="244" cy="470" r="10" className="plan-line" pathLength={1} />

                  <ellipse cx="452" cy="382" rx="54" ry="31" className="plan-line" pathLength={1} />
                  <circle cx="452" cy="326" r="11" className="plan-line" pathLength={1} />
                  <circle cx="394" cy="382" r="11" className="plan-line" pathLength={1} />
                  <circle cx="510" cy="382" r="11" className="plan-line" pathLength={1} />
                  <circle cx="452" cy="438" r="11" className="plan-line" pathLength={1} />

                  <rect x="570" y="106" width="142" height="112" className="plan-line" pathLength={1} />
                  <path d="M570 136h142M602 106v30M648 106v30" className="plan-line plan-line--soft" pathLength={1} />
                  <rect x="688" y="120" width="22" height="22" className="plan-line" pathLength={1} />

                  <rect x="588" y="452" width="94" height="54" className="plan-line" pathLength={1} />
                  <circle cx="610" cy="466" r="8" className="plan-line" pathLength={1} />
                  <circle cx="660" cy="466" r="8" className="plan-line" pathLength={1} />

                  <rect x="724" y="344" width="40" height="132" className="plan-line" pathLength={1} />
                  <path d="M724 378h40" className="plan-line plan-line--soft" pathLength={1} />
                </g>

                <g className="plan-dim" aria-hidden="true">
                  <path d="M100 584H800M100 574v20M800 574v20M400 578v12M520 578v12M560 578v12" />
                  <path d="M56 70V540M46 70h20M46 540h20M56 330h12M56 300h12M56 410h12" />
                  <path d="M100 62h20M100 54v16M800 62h20M800 54v16" />
                </g>
                <g className="plan-dim-text" aria-hidden="true">
                  <text x="424" y="604">12 400</text>
                  <text x="416" y="62">8 200</text>
                  <text x="30" y="310" transform="rotate(-90 30 310)">9 600</text>
                </g>

                <g className="plan-text" aria-hidden="true">
                  <text x="136" y="254">Living</text>
                  <text x="136" y="269" style={{ fontSize: "5.4px", opacity: 0.7 }}>5.8 × 4.2 m</text>
                  <text x="424" y="424">Dining</text>
                  <text x="580" y="250">Primary suite</text>
                  <text x="580" y="264" style={{ fontSize: "5.4px", opacity: 0.7 }}>4.4 × 3.8 m</text>
                  <text x="588" y="522">Courtyard</text>
                  <text x="700" y="96">Kitchen</text>
                  <text x="130" y="92">01</text>
                  <text x="440" y="92">02</text>
                  <text x="590" y="492">03</text>
                </g>

                <g aria-hidden="true">
                  <circle cx="838" cy="92" r="20" className="plan-line" pathLength={1} />
                  <path d="M838 76v18l11 7" className="plan-accent" pathLength={1} />
                  <text x="832" y="126" className="plan-text" style={{ fontSize: "5.5px" }}>N</text>
                </g>
              </svg>

              <span className="plan-scan" data-label="Section A—A" aria-hidden="true" />
              <div className="plan-meta">
                <span>Plan 01 / Ground floor</span>
                <span>Scale 1:50</span>
                <span>Drawn by AV</span>
              </div>
            </div>
            <p
              className="micro"
              style={{ marginTop: "0.9rem", color: "var(--stone)", textAlign: "right" }}
            >
              Scroll to draw — plan not to scale
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
