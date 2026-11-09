"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { TiltCard } from "@/components/unlumen-ui/tilt-card";
import { materials, services } from "@/data/studio";

export function Capabilities() {
  return (
    <section className="capabilities section" id="capabilities">
      <div className="shell">
        <SectionHeading
          index="04"
          label="Capabilities"
          title={
            <>
              From the shell
              <br />
              to the <span className="serif-italic">object</span>.
            </>
          }
          copy={
            <>
              <p>
                The studio works across the whole interior — architecture,
                joinery, lighting, furniture and the final layer of art and
                objects. One coherent atmosphere, made by a close circle of
                collaborators.
              </p>
              <p>
                Engagements can begin at any stage, from a full architectural
                commission to a single room or a material study.
              </p>
            </>
          }
        />

        <div className="services" style={{ marginTop: "clamp(3rem, 6vw, 5rem)" }}>
          <div className="services__list">
            {services.map((service) => (
              <Reveal key={service.index} y={18}>
                <div className="service-row">
                  <span className="service-row__index">{service.index}</span>
                  <div>
                    <div className="service-row__head">
                      <h3 className="service-row__title">{service.title}</h3>
                      <ArrowUpRight size={15} strokeWidth={1.3} />
                    </div>
                    <p className="service-row__body">{service.description}</p>
                    <div className="service-row__tags">
                      {service.tags.map((tag) => (
                        <span className="tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="services__side" delay={0.1} y={30}>
            <div className="services__side-label">
              <span>In the studio</span>
              <span>04 / 04</span>
            </div>
            <div
              className="portrait-frame"
              style={{ aspectRatio: "4 / 5", marginTop: "1.2rem" }}
            >
              <Image
                src="/images/studio.jpg"
                alt="Material samples and drawings in the Atelier Vance studio"
                fill
                sizes="(max-width: 980px) 90vw, 36vw"
                className="object-cover"
              />
            </div>
            <h3 className="services__side-title">
              A complete
              <br />
              <span className="serif-italic">atmosphere.</span>
            </h3>
            <p>
              We coordinate architecture, joinery, lighting, textiles and
              curation as one composition — so the finished room feels
              inevitable rather than assembled.
            </p>
            <div className="services__side-foot">
              <a className="link-line" href="#contact">
                Discuss a project
              </a>
              <span className="micro muted">Limited commissions</span>
            </div>
          </Reveal>
        </div>

        <div className="materials">
          <Reveal className="materials__head" y={20}>
            <div>
              <p className="eyebrow">Material library</p>
              <h3 className="display" style={{ marginTop: "1rem" }}>
                A tactile index.
              </h3>
            </div>
            <p>
              Three studies from the material cabinet. Stone, plaster and timber
              are always chosen in the hand, under the real light of the room.
            </p>
          </Reveal>

          <div className="materials__grid">
            {materials.map((material, index) => (
              <Reveal
                className="material-slot"
                key={material.name}
                delay={index * 0.08}
                y={34}
              >
                <TiltCard
                  title={material.name}
                  description={material.description}
                  price={material.number}
                  badgeLabel={material.category}
                  imageSrc={material.image}
                  imageAlt={`${material.name} material reference`}
                  className="material-card"
                  tiltProps={{ rotationFactor: 7 }}
                >
                  <span className="micro muted">{material.tone}</span>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
