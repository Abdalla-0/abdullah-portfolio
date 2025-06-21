import AdsSection from "./components/AdsSection";
import Contact from "./components/Contact";
import HeroSection from "./components/HeroSection";
import ProjectSection from "./components/ProjectSection";
import SkillSection from "./components/SkillSection";

export default function Homeasync({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <div>
      <HeroSection />
      <ProjectSection params={params} />
      <AdsSection />
      <SkillSection />
      <Contact />
    </div>
  );
}
