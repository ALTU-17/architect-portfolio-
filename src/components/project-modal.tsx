"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import type { Project } from "@/data/studio";

export function ProjectModal({
  project,
  nextProject,
  onClose,
  onNext,
}: {
  project: Project;
  nextProject: Project;
  onClose: () => void;
  onNext: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="project-modal"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <button
        type="button"
        className="project-modal__backdrop"
        aria-label="Close case study"
        onClick={onClose}
      />
      <motion.div
        className="project-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={reduceMotion ? false : { x: "7%" }}
        animate={{ x: 0 }}
        exit={{ x: "7%" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          ref={closeRef}
          type="button"
          className="project-modal__close"
          onClick={onClose}
          data-cursor="hover"
        >
          Close <X size={13} />
        </button>

        <div className="project-modal__hero">
          <Image
            src={project.image}
            alt={`${project.title}, ${project.location}`}
            fill
            sizes="(max-width: 980px) 100vw, 60vw"
            className="object-cover"
          />
        </div>

        <div className="project-modal__content">
          <div className="project-modal__kicker">
            <span>
              {project.index} / {project.type}
            </span>
            <span>
              {project.location} — {project.year}
            </span>
          </div>

          <h2 className="project-modal__title display" id="project-modal-title">
            {project.title}
          </h2>
          <p className="project-modal__summary">{project.summary}</p>

          <div className="project-modal__body">
            <div>
              {project.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <dl className="project-meta">
              <div className="project-meta__group">
                <dt>Location</dt>
                <dd>{project.location}</dd>
              </div>
              <div className="project-meta__group">
                <dt>Year / Area</dt>
                <dd>
                  {project.year} / {project.area}
                </dd>
              </div>
              <div className="project-meta__group">
                <dt>Scope</dt>
                <dd>{project.credits.join(", ")}</dd>
              </div>
              <div className="project-meta__group">
                <dt>Material notes</dt>
                <dd>
                  <span className="swatches">
                    {project.palette.map((colour) => (
                      <span className="swatch" key={colour.name}>
                        <i style={{ background: colour.hex }} />
                        {colour.name}
                      </span>
                    ))}
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="project-modal__gallery">
            {project.gallery.map((image, index) => (
              <Image
                key={`${project.slug}-${image}-${index}`}
                src={image}
                alt={`${project.title} interior detail ${index + 1}`}
                width={1200}
                height={900}
                sizes="(max-width: 980px) 90vw, 55vw"
              />
            ))}
          </div>

          <button type="button" className="project-modal__next" onClick={onNext}>
            <span>
              Next project
              <br />
              {nextProject.title}
            </span>
            <ArrowRight size={18} strokeWidth={1.4} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
