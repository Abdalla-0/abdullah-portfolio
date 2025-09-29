import AdsSection from "./components/AdsSection";
// import Contact from "./components/Contact";
import HeroSection from "./components/HeroSection";
import ProjectsList from "@/components/application/Projects/ProjectsList";
import SkillSection from "./components/SkillSection";

export default function Homeasync({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return (
    <div>
      <HeroSection />
      <ProjectsList params={params} title="projects" />
      <AdsSection />
      <SkillSection />
      {/* <Contact /> */}
    </div>
  );
}
