import FormProject from "@/components/application/Forms/FormProject";
import { routing } from "@/i18n/routing";
import { actionGetSingleProject } from "@/server/actions/projects";
import { db } from "@/utils/db";

export async function generateStaticParams() {
  const projects = await db.project.findMany({
    select: { id: true },
  });

  return projects.flatMap((project) =>
    routing.locales.map((locale) => ({
      locale,
      projectId: project.id,
    }))
  );
}
const EditProjectPage = async ({
  params,
}: {
  params: Promise<{ locale: string; projectId: string }>;
}) => {
  const { projectId, locale } = await params;
  const project =
    (await actionGetSingleProject(projectId, locale)) ?? undefined;

  return (
    <div className="container">
      <FormProject type={"update"} project={project} />
    </div>
  );
};

export default EditProjectPage;
