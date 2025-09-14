import SkillCard from "@/components/application/Skills/SkillCard";
import Heading from "@/components/shared/Heading/Heading";
import { actionGetSkills } from "@/server/actions/skills";

const SkillSection = async () => {
  const skills = await actionGetSkills();

  return (
    <section id="skillsSection" className="section-gap section-bg">
      <div className="container">
        <Heading title={`skills`} />
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4`}>
          {skills &&
            skills.map((skill) => <SkillCard key={skill.id} skill={skill} />)}
        </div>
      </div>
    </section>
  );
};

export default SkillSection;
