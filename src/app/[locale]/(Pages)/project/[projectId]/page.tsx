import {
  actionGetProjects,
  actionGetSingleProject,
} from "@/server/actions/projects";
import Info from "./_components/Info";
import { Locale } from "@/i18n/routing";
export async function generateStaticParams() {
  const projects = await actionGetProjects();

  return projects.map((project) => ({ projectId: project.id }));
}
const ProjectPage = async ({
  params,
}: {
  params: Promise<{ locale: Locale; projectId: string }>;
}) => {
  const { projectId } = await params;
  const project = (await actionGetSingleProject(projectId)) ?? undefined;
  return (
    <div className="container">
      <div className="flex flex-col gap-10">
        <h1 className="text-6xl text-center font-medium">{project.title}</h1>
        <Info project={project} />
        <div>
          <h3 className="text-2xl font-semibold">About Project</h3>
          <p className="leading-8">{project.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
