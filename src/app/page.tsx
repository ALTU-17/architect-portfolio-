import { Capabilities } from "@/components/capabilities";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Manifesto } from "@/components/manifesto";
import { Nav } from "@/components/nav";
import { SelectedWorks } from "@/components/selected-works";
import { SiteExperience } from "@/components/site-experience";
import { TheatreBlueprint } from "@/components/theatre-blueprint";
import { Voices } from "@/components/voices";

export default function Home() {
  return (
    <SiteExperience>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Manifesto />
        <SelectedWorks />
        <TheatreBlueprint />
        <Capabilities />
        <Voices />
        <Contact />
      </main>
      <Footer />
    </SiteExperience>
  );
}
