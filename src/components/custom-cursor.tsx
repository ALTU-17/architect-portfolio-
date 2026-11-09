"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

type CursorState = {
  visible: boolean;
  hover: boolean;
  label: string;
};

export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [cursor, setCursor] = useState<CursorState>({
    visible: false,
    hover: false,
    label: "",
  });

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 750, damping: 42, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 750, damping: 42, mass: 0.4 });
  const ringX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches || reduceMotion) return;

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setCursor((current) =>
        current.visible ? current : { ...current, visible: true },
      );
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, [role='button'], [data-cursor]",
      ) as HTMLElement | null;

      if (!interactive) {
        setCursor((current) =>
          current.hover || current.label
            ? { ...current, hover: false, label: "" }
            : current,
        );
        return;
      }

      const label = interactive.dataset.cursorLabel || "";
      const mode = interactive.dataset.cursor;
      setCursor((current) => ({
        ...current,
        hover: mode !== "view" && mode !== "drag",
        label:
          label ||
          (mode === "view" ? "View" : mode === "drag" ? "Drag" : ""),
      }));
    };

    const onLeave = () => setCursor((current) => ({ ...current, visible: false }));
    const onEnter = () => setCursor((current) => ({ ...current, visible: true }));
    const onDown = () => setCursor((current) => ({ ...current, hover: true }));
    const onUp = () => setCursor((current) => ({ ...current, hover: false }));

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [reduceMotion, x, y]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="cursor-dot"
        style={{ left: springX, top: springY, opacity: cursor.visible ? 1 : 0 }}
      />
      <motion.div
        aria-hidden="true"
        className={`cursor-ring ${cursor.hover ? "is-hover" : ""} ${
          cursor.label ? "is-label" : ""
        }`}
        style={{ left: ringX, top: ringY, opacity: cursor.visible ? 1 : 0 }}
      >
        <span className="cursor-ring__label">{cursor.label}</span>
      </motion.div>
    </>
  );
}
