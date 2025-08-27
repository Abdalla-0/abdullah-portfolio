import ProjectCard from "@/components/application/Projects/ProjectCard";
import Heading from "@/components/common/Heading/Heading";
import { actionGetPublishedProjects } from "@/server/actions/projects";
import { Routes } from "@/utils/constants";
import React from "react";

const ProjectSection = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const projects = await actionGetPublishedProjects();
  return (
    <section id="projectsSection" className="section-gap section-bg">
      <div className="container">
        <Heading textKey={`projects`} />
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4`}
        >
          {projects &&
            projects.map((project) => {
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  projectLink={`/${locale}/${Routes.PROJECT}/${project.id}`}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
