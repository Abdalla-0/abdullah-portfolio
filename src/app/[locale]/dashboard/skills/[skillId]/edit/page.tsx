import FormSkill from "@/components/application/Forms/FormSkill";
import { routing } from "@/i18n/routing";
import { actionGetSingleSkill, actionGetSkills } from "@/server/actions/skills";

export async function generateStaticParams() {
  const skills = await actionGetSkills();

  return skills.flatMap((skill) =>
    routing.locales.map((locale) => ({
      locale,
      projectId: skill.id,
    }))
  );
}
const EditSkillPage = async ({
  params,
}: {
  params: Promise<{ skillId: string }>;
}) => {
  const { skillId } = await params;
  const skill = (await actionGetSingleSkill(skillId)) ?? undefined;

  return (
    <div className="container">
      <FormSkill type={"update"} skill={skill} />
    </div>
  );
};

export default EditSkillPage;
