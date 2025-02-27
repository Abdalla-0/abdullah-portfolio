import FormProject from "@/components/application/Forms/FormProject";
import { actionGetProjects, actionGetSingleProject } from "@/server/actions/projects";

export async function generateStaticParams() {
  const projects = await actionGetProjects();

  return projects.map((project) => ({ projectId: project.id }));
}
const EditProjectPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;
  const project = (await actionGetSingleProject(projectId)) ?? undefined;

  return (
    <div className="container">
      <FormProject type={"update"} project={project} />
    </div>
  );
};

export default EditProjectPage;
