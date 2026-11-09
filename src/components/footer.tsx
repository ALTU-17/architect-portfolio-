import { ArrowUp } from "lucide-react";
import { studio } from "@/data/studio";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <div className="footer__grid">
          <div className="footer__brand">
            <span className="footer__monogram">AV</span>
            <p>
              Atelier Vance is an interior architecture practice working between
              Milan and Copenhagen. Quiet rooms, made slowly.
            </p>
            <a className="link-line" href="#contact" style={{ marginTop: "0.5rem" }}>
              Start a conversation
            </a>
          </div>

          <div>
            <div className="footer__col-title">Explore</div>
            <div className="footer__col">
              <a href="#work">Selected work</a>
              <a href="#studio">The studio</a>
              <a href="#process">Process</a>
              <a href="#capabilities">Capabilities</a>
            </div>
          </div>

          <div>
            <div className="footer__col-title">Elsewhere</div>
            <div className="footer__col">
              {studio.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {social.label}
                </a>
              ))}
              <a href={`mailto:${studio.email}`}>Email</a>
            </div>
          </div>

          <div>
            <div className="footer__col-title">Studio</div>
            <div className="footer__col">
              <span style={{ fontSize: "0.7rem", color: "rgba(248,245,239,0.76)" }}>
                Via Solferino 31
                <br />
                20121 Milano, Italy
              </span>
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "rgba(248,245,239,0.76)",
                  marginTop: "0.35rem",
                }}
              >
                Bredgade 24
                <br />
                1260 København K
              </span>
            </div>
          </div>
        </div>

        <div className="footer__base">
          <span>© 2026 Atelier Vance — All rights reserved</span>
          <span
            style={{
              maxWidth: "34rem",
              lineHeight: 1.7,
              textTransform: "none",
              letterSpacing: "0.02em",
            }}
          >
            A fictional practice built as a portfolio concept. All projects,
            qualifications, awards and client names are invented.
          </span>
          <a href="#top" className="footer__top">
            Back to top <ArrowUp size={11} />
          </a>
        </div>
      </div>
    </footer>
  );
}
