"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { CustomCursor } from "@/components/custom-cursor";
import { Preloader } from "@/components/preloader";
import { ScrollProgress } from "@/components/scroll-progress";

const SiteReadyContext = createContext(false);

export function useSiteReady() {
  return useContext(SiteReadyContext);
}

export function SiteExperience({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  return (
    <SiteReadyContext.Provider value={ready}>
      <Preloader onComplete={() => setReady(true)} />
      <CustomCursor />
      <ScrollProgress />
      <div data-site-ready={ready}>{children}</div>
    </SiteReadyContext.Provider>
  );
}
