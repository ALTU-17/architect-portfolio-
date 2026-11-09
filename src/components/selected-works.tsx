"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CurtainsImage } from "@/components/curtains-image";
import { ProjectModal } from "@/components/project-modal";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { projects, type Project } from "@/data/studio";

export function SelectedWorks() {
  const [active, setActive] = useState<Project | null>(null);
  const featured = projects.find((project) => project.featured) ?? projects[0];
  const others = projects.filter((project) => project.slug !== featured.slug);

  const open = (project: Project) => setActive(project);
  const close = () => setActive(null);
  const next = () => {
    if (!active) return;
    const index = projects.findIndex((project) => project.slug === active.slug);
    setActive(projects[(index + 1) % projects.length]);
  };

  return (
    <section className="works section" id="work">
      <div className="shell">
        <SectionHeading
          index="02"
          label="Selected work"
          title={
            <>
              Rooms with
              <br />
              a <span className="serif-italic">memory</span>.
            </>
          }
          copy={
            <>
              <p>
                A small selection of recent residential, hospitality and
                workplace interiors. Each project is a collaboration with the
                people who will use the space — and the makers who help bring it
                into being.
              </p>
              <p className="works__count">05 case studies / 2022 — 2025</p>
            </>
          }
        />

        <Reveal y={34}>
          <button
            type="button"
            className="works__feature"
            onClick={() => open(featured)}
            aria-label={`Open case study: ${featured.title}`}
          >
            <div className="works__feature-media">
              <CurtainsImage
                src={featured.image}
                alt={`${featured.title}, ${featured.location}`}
              />
              <div className="works__feature-caption">
                <h3 className="works__feature-title display">
                  {featured.title}
                </h3>
                <div className="works__feature-meta">
                  <span>
                    {featured.type} / {featured.area}
                  </span>
                  <span>
                    {featured.location} — {featured.year}
                  </span>
                  <span>Hover to disturb the surface</span>
                </div>
              </div>
            </div>
          </button>
        </Reveal>

        <div className="works__list">
          {others.map((project) => (
            <Reveal key={project.slug} y={18}>
              <button
                type="button"
                className="work-row"
                onClick={() => open(project)}
                aria-label={`Open case study: ${project.title}`}
              >
                <span className="work-row__index">{project.index}</span>
                <span className="work-row__title">{project.title}</span>
                <span className="work-row__meta">{project.type}</span>
                <span className="work-row__meta">
                  {project.location} / {project.year}
                </span>
                <span className="work-row__arrow">
                  <ArrowUpRight size={18} strokeWidth={1.3} />
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <div className="works__foot">
          <span>Further residential and hospitality work available on request.</span>
          <a className="link-line" href="#contact">
            Request the full portfolio
          </a>
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <ProjectModal
            key={active.slug}
            project={active}
            nextProject={
              projects[
                (projects.findIndex((project) => project.slug === active.slug) +
                  1) %
                  projects.length
              ]
            }
            onClose={close}
            onNext={next}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
