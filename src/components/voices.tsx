"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { press, studio, testimonials } from "@/data/studio";

export function Voices() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const testimonial = testimonials[active];

  return (
    <section className="voices section" id="voices">
      <div className="shell">
        <SectionHeading
          index="05"
          label="Voices & press"
          title={
            <>
              Kind words,
              <br />
              quietly <span className="serif-italic">said</span>.
            </>
          }
          copy={
            <p>
              A few reflections from the people who live and work in these
              rooms, alongside selected recognition from the press.
            </p>
          }
        />

        <div className="voices__grid">
          <div>
            <div className="quote-large">
              <span className="quote-large__mark" aria-hidden="true">
                “
              </span>
              <div>
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={testimonial.name}
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="quote-large__text">{testimonial.quote}</p>
                    <footer className="quote-large__meta">
                      <span>{testimonial.name}</span>
                      <span>{testimonial.role}</span>
                    </footer>
                  </motion.blockquote>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div>
            <p className="micro muted" style={{ marginBottom: "0.7rem" }}>
              Client notes / {String(active + 1).padStart(2, "0")} of{" "}
              {String(testimonials.length).padStart(2, "0")}
            </p>
            <div className="quote-tabs">
              {testimonials.map((item, index) => (
                <button
                  type="button"
                  key={item.name}
                  className={`quote-tab ${index === active ? "is-active" : ""}`}
                  onClick={() => setActive(index)}
                  aria-pressed={index === active}
                  data-cursor="hover"
                >
                  <span className="quote-tab__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="quote-tab__name">{item.name}</span>
                    <span className="quote-tab__role" style={{ display: "block" }}>
                      {item.role}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="awards">
          {studio.awards.map((award) => (
            <Reveal key={award.title} y={10}>
              <div className="award">
                <span>{award.year}</span>
                <span>{award.title}</span>
                <span>{award.detail}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="press-strip" aria-label="Selected press">
          <div className="press-track">
            {[0, 1].map((group) => (
              <div className="press-group" key={group}>
                {press.map((name) => (
                  <span className="press-item" key={`${group}-${name}`}>
                    {name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
