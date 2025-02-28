import ProjectCard from "@/components/application/Projects/ProjectCard";
import Heading from "@/components/common/Heading/Heading";
import { actionGetProjects } from "@/server/actions/projects";
import React from "react";

const ProjectSection = async () => {
  const projects = await actionGetProjects();
  return (
    <section id="projectsSection" className="section-gap section-bg">
      <div className="container">
        <Heading textKey={`projects`} />
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4`}
        >
          {projects &&
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                projectLink={project.link}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
