import ProjectsList from "@/components/application/Projects/ProjectsList";
import LikeButton from "@/components/shared/Buttons/LikeButton";
import { Locale, routing } from "@/i18n/routing";
import {
  actionGetPublishedProgects,
  actionGetSinglePublishedProject
} from "@/server/actions/projects";
import Content from "./_components/Content";
import Info from "./_components/Info";
import ProjectGallery from "./_components/ProjectGallery";
export async function generateStaticParams({
  params,
}: {
  params: { locale: Locale };
}) {
  const projects = await actionGetPublishedProgects(params.locale);

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
  const { locale } = await params;

  const project =
    (await actionGetSinglePublishedProject(projectId, locale)) ?? undefined;
  return (
    <div className="project-page mt-5">
      <div className="container">
        <div className="flex flex-col gap-10">
          <h1 className="text-6xl text-center font-medium">
            {project?.translations[0]?.title}
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Info project={project} />
            <ProjectGallery project={project} />
          </div>
          <LikeButton
            projectId={project.id}
            likesCount={Number(project.likes)}
            locale={locale}
          />
          <Content project={project} />
        </div>
      </div>
      <ProjectsList params={params} title="projects" />
    </div>
  );
};

export default ProjectPage;
