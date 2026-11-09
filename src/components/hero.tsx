"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { MagneticLink } from "@/components/magnetic-link";
import { SplineObject } from "@/components/spline-object";
import { studio } from "@/data/studio";
import { useSiteReady } from "@/components/site-experience";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const lineTransition = { duration: 1.05, ease: EASE };

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const tickerItems = [
  "Private residences",
  "Hospitality",
  "Furniture",
  "Material direction",
  "Art curation",
  "Lighting",
];

export function Hero() {
  const ready = useSiteReady();
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 800], [0, 110]);

  return (
    <section className="hero" id="top">
      <motion.div
        className="hero__inner shell"
        variants={container}
        initial={reduceMotion ? false : "hidden"}
        animate={ready ? "show" : "hidden"}
      >
        <motion.div className="hero__top" variants={fadeUp}>
          <p className="eyebrow">Interior architecture / Milano — København</p>
          <p className="hero__top-meta">
            <span>Independent studio / Est. 2012</span>
            <span>Selected work 2018 — 2026</span>
          </p>
        </motion.div>

        <div className="hero__stage">
          <div>
            <h1 className="hero__title display">
              <span className="hero-line">
                <motion.span
                  initial={false}
                  animate={reduceMotion || ready ? { y: "0%" } : { y: "112%" }}
                  transition={reduceMotion ? { duration: 0 } : { ...lineTransition, delay: 0.06 }}
                >
                  Spaces
                </motion.span>
              </span>
              <span className="hero-line hero-line--indent">
                <motion.span
                  initial={false}
                  animate={reduceMotion || ready ? { y: "0%" } : { y: "112%" }}
                  transition={reduceMotion ? { duration: 0 } : { ...lineTransition, delay: 0.14 }}
                  className="serif-italic"
                >
                  that hold
                </motion.span>
              </span>
              <span className="hero-line">
                <motion.span
                  initial={false}
                  animate={reduceMotion || ready ? { y: "0%" } : { y: "112%" }}
                  transition={reduceMotion ? { duration: 0 } : { ...lineTransition, delay: 0.22 }}
                >
                  silence<span className="hero-line__dot">.</span>
                </motion.span>
              </span>
            </h1>

            <motion.div className="hero__lead" variants={fadeUp}>
              <p>{studio.intro}</p>
              <div className="hero__actions">
                <MagneticLink href="#work" className="btn">
                  View selected work
                  <ArrowUpRight size={13} strokeWidth={1.6} />
                </MagneticLink>
                <a className="link-line" href="#studio">
                  The studio
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="hero__media"
            variants={fadeUp}
            data-cursor="view"
            data-cursor-label="Casa Lumen"
          >
            <div className="hero__media-frame">
              <motion.div
                style={{ position: "absolute", inset: 0, y: imageY }}
                initial={reduceMotion ? false : { scale: 1.12 }}
                animate={ready ? { scale: 1 } : {}}
                transition={{ duration: 1.6, ease: EASE, delay: 0.25 }}
              >
                <Image
                  src="/images/hero.jpg"
                  alt="Warm minimal living room at Casa Lumen, Lake Como"
                  fill
                  priority
                  sizes="(max-width: 980px) 90vw, 38vw"
                  className="object-cover"
                />
              </motion.div>
            </div>

            <div className="hero__seal" aria-hidden="true">
              <svg className="hero__seal-svg" viewBox="0 0 100 100">
                <defs>
                  <path
                    id="seal-circle"
                    d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
                  />
                </defs>
                <text>
                  <textPath href="#seal-circle">
                    ATELIER VANCE · INTERIOR ARCHITECTURE · EST. 2012 ·
                  </textPath>
                </text>
              </svg>
              <span className="hero__seal-core">AV</span>
            </div>

            <SplineObject />

            <div className="hero__caption">
              <span>Casa Lumen / Lake Como</span>
              <span>Residential / 2025</span>
            </div>
          </motion.div>
        </div>

        <motion.div className="hero__bottom" variants={fadeUp}>
          <div className="hero__stats">
            {studio.stats.map((stat) => (
              <div className="stat" key={stat.label}>
                <div className="stat__value">{stat.value}</div>
                <div className="stat__label">{stat.label}</div>
              </div>
            ))}
          </div>
          <a className="hero__scroll" href="#studio">
            <span className="hero__scroll-line" aria-hidden="true" />
            Scroll to enter
            <ArrowDown size={12} strokeWidth={1.4} />
          </a>
        </motion.div>
      </motion.div>

      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {[0, 1].map((group) => (
            <div className="ticker__group" key={group}>
              {tickerItems.map((item) => (
                <span className="ticker__item" key={`${group}-${item}`}>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
