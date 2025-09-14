import { Locale, routing } from "@/i18n/routing";
import {
  actionGetPublishedProgectsByPageNumber,
  actionGetSinglePublishedProject,
} from "@/server/actions/projects";
import Content from "./_components/Content";
import Info from "./_components/Info";
import ProjectGallery from "./_components/ProjectGallery";
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
const ProjectPage = async ({
  params,
}: {
  params: Promise<{ locale: Locale; projectId: string }>;
}) => {
  const { projectId } = await params;

  const project =
    (await actionGetSinglePublishedProject(projectId, (await params).locale)) ??
    undefined;
  return (
    <div className="container">
      <div className="flex flex-col gap-10">
        <h1 className="text-6xl text-center font-medium">
          {project.translations[0].title}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Info project={project} />
          <ProjectGallery project={project} />
        </div>
        <Content project={project} />
      </div>
    </div>
  );
};

export default ProjectPage;
