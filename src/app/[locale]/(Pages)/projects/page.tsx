import ProjectCard from "@/components/application/Projects/ProjectCard";
import Heading from "@/components/shared/Heading/Heading";
import PaginationComponent from "@/components/shared/Pagination/Pagination";

import {
  actionGetPublishedProgectsByPageNumber,
  actionGetPublishedProjectsCount,
} from "@/server/actions/projects";
import { RECORDS_PER_PAGE, Routes } from "@/utils/constants";
type Props = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ pageNumber?: string }>;
};
const projectsPage = async ({ params, searchParams }: Props) => {
  const { locale } = await params;
  const pageNumber = Number((await searchParams)?.pageNumber) || 1;

  const projects = await actionGetPublishedProgectsByPageNumber(
    locale,
    pageNumber
  );
  const projectsCount = await actionGetPublishedProjectsCount();
  const pagesCount = Array.from({
    length: Math.ceil(projectsCount / RECORDS_PER_PAGE),
  }).map((_, index) => index + 1);

  return (
    <section className="section-gap">
      <Heading title={`projects`} />
      <div className="container">
        {projects.length > 0 ? (
          <div className="grid items-center gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  projectLink={`project/${project.id}`}
                />
              ))}
            </div>
            <PaginationComponent
              pagesCount={pagesCount}
              pageNumber={pageNumber}
              route={`/${Routes.PROJECT}`}
            />
          </div>
        ) : (
          <p>No projects found</p>
        )}
      </div>
    </section>
  );
};

export default projectsPage;
