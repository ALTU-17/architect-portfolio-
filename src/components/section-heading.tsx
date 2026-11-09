import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

export function SectionHeading({
  index,
  label,
  title,
  copy,
  className = "",
}: {
  index: string;
  label: string;
  title: ReactNode;
  copy?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={`section-head ${className}`.trim()} y={30}>
      <div>
        <p className="eyebrow">{label}</p>
        <div className="section-head__index" style={{ marginTop: "1.2rem" }}>
          <span className="section-head__num">{index}</span>
          <h2 className="section-head__title display">{title}</h2>
        </div>
      </div>
      {copy ? <div className="section-head__copy">{copy}</div> : null}
    </Reveal>
  );
}
