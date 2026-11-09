"use client";

import Image from "next/image";
import { CursorImageTrail } from "@/components/unlumen-ui/cursor-image-trail";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { studio } from "@/data/studio";

const trailImages = [
  "/images/living.jpg",
  "/images/detail.jpg",
  "/images/bath.jpg",
  "/images/kitchen.jpg",
  "/images/bedroom.jpg",
];

export function Manifesto() {
  return (
    <section className="manifesto section" id="studio">
      <div className="shell">
        <SectionHeading
          index="01"
          label="The studio"
          title={
            <>
              A practice
              <br />
              of <span className="serif-italic">subtraction</span>.
            </>
          }
          copy={
            <>
              <p>
                Atelier Vance is a small interior architecture practice working
                between Milan and Copenhagen. We design homes, small hotels and
                workplaces with a slow, material-led approach.
              </p>
              <p>
                The studio takes on a limited number of commissions each year.
                Every project is developed personally by Aurelio, from the first
                survey to the final object on the table.
              </p>
            </>
          }
        />

        <div className="manifesto__grid" style={{ marginTop: "clamp(3rem, 6vw, 5.5rem)" }}>
          <Reveal className="manifesto__portrait" y={34}>
            <div className="portrait-frame">
              <Image
                src="/images/portrait.jpg"
                alt="Portrait of fictional interior architect Aurelio Vance"
                fill
                sizes="(max-width: 980px) 80vw, 35vw"
                className="object-cover"
              />
            </div>
            <div className="portrait-caption">
              <span>Aurelio Vance</span>
              <span>Founder / Interior architect</span>
            </div>
          </Reveal>

          <div className="manifesto__copy">
            <Reveal>
              <p className="manifesto__lead">
                Light is the first material. Everything else is an invitation to{" "}
                <em className="serif-italic">stay a little longer.</em>
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="manifesto__body">
                <p>{studio.bio[0]}</p>
                <p>{studio.bio[1]}</p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <dl className="manifesto__facts">
                {studio.facts.map((fact) => (
                  <div className="fact" key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="signature">Aurelio Vance</p>
            </Reveal>
          </div>
        </div>

        <Reveal y={20}>
          <CursorImageTrail
            items={trailImages.map((src, index) => (
              <Image
                key={src}
                src={src}
                alt=""
                width={600}
                height={index % 2 ? 750 : 480}
                className="trail-image"
                aria-hidden="true"
                style={{ aspectRatio: index % 2 ? "4 / 5" : "5 / 4" }}
              />
            ))}
            className="manifesto__trail"
            itemSize={148}
            trailLength={7}
            spawnDistance={70}
            rotationRange={14}
          >
            <p className="trail-phrase">
              Light is the first <span>material.</span>
            </p>
            <span className="trail-note">
              A tactile index — move slowly
            </span>
          </CursorImageTrail>
        </Reveal>

        <div className="cv">
          <Reveal>
            <div className="cv__title">
              Education & qualifications <span>{studio.qualifications.length}</span>
            </div>
            <div className="cv__list">
              {studio.qualifications.map((item) => (
                <div className="cv__item" key={item.title}>
                  <span className="cv__year">{item.year}</span>
                  <div>
                    <div className="cv__role">{item.title}</div>
                    <div className="cv__place">{item.place}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="cv__title">
              Experience <span>{studio.experience.length}</span>
            </div>
            <div className="cv__list">
              {studio.experience.map((item) => (
                <div className="cv__item" key={item.role}>
                  <span className="cv__year">{item.period}</span>
                  <div>
                    <div className="cv__role">{item.role}</div>
                    <div className="cv__place">{item.place}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
