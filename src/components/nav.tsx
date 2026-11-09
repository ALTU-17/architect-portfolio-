"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useSiteReady } from "@/components/site-experience";
import { MagneticLink } from "@/components/magnetic-link";

const links = [
  { label: "Work", href: "#work", index: "01" },
  { label: "Studio", href: "#studio", index: "02" },
  { label: "Process", href: "#process", index: "03" },
  { label: "Contact", href: "#contact", index: "04" },
];

export function Nav() {
  const ready = useSiteReady();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}
        initial={reduceMotion ? false : { y: -80, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="nav__inner shell">
          <a className="nav__brand" href="#top" aria-label="Atelier Vance, back to top">
            <span className="nav__monogram">AV</span>
            <span className="nav__wordmark">
              <strong>Atelier Vance</strong>
              <span>Interior architecture</span>
            </span>
          </a>

          <nav className="nav__links" aria-label="Primary navigation">
            {links.map((link) => (
              <a key={link.href} className="nav__link" href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav__side">
            <span className="nav__status">
              <i className="nav__status-dot" />
              Open for 2027
            </span>
            <MagneticLink href="#contact" className="nav__cta">
              Start a project
              <ArrowUpRight size={12} strokeWidth={1.6} />
            </MagneticLink>
            <button
              type="button"
              className="nav__toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? "Close" : "Menu"}
              <span className="nav__toggle-lines" aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={reduceMotion ? false : { opacity: 0, y: "-4%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-4%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <p className="eyebrow" style={{ opacity: 0.55 }}>
                Menu — 2026
              </p>
              <nav
                className="mobile-menu__links"
                aria-label="Mobile navigation"
                style={{ marginTop: "2rem" }}
              >
                {links.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="mobile-menu__link"
                    onClick={() => setOpen(false)}
                    initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.08 + index * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {link.label}
                    <span>{link.index}</span>
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className="mobile-menu__foot">
              <span>
                Milano / København
                <br />
                Open for 2027
              </span>
              <a href="mailto:hello@ateliervance.com">hello@ateliervance.com</a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
