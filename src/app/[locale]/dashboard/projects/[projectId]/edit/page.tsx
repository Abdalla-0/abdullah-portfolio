import FormProject from "@/components/application/Forms/FormProject";
import { Locale, routing } from "@/i18n/routing";
import {
  actionGetPublishedProgectsByPageNumber,
  actionGetSingleProject,
} from "@/server/actions/projects";

export async function generateStaticParams({
  params,
}: {
  params: { locale: Locale };
}) {
  const projects = await actionGetPublishedProgectsByPageNumber(params.locale);

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
