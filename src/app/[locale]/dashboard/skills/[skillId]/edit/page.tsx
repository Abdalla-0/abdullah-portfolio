import FormSkill from "@/components/application/Forms/FormSkill";
import { routing } from "@/i18n/routing";
import { actionGetSingleSkill } from "@/server/actions/skills";
import { db } from "@/utils/db";

export async function generateStaticParams() {
  const skills = await db.skill.findMany({
    select: { id: true },
  });

  return skills.flatMap((skill) =>
    routing.locales.map((locale) => ({
      locale,
      skillId: skill.id,
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
