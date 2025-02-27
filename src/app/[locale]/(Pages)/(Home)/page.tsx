import AdsSection from "./components/AdsSection";
import Contact from "./components/Contact";
import HeroSection from "./components/HeroSection";
import ProjectSection from "./components/ProjectSection";
import SkillSection from "./components/SkillSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ProjectSection />
      <AdsSection />
      <SkillSection />
      <Contact />
    </div>
  );
}
