import { ProjectWithRelations } from "@/types/project";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
type ProjectCardProps = {
  projectLink: string;
  project: ProjectWithRelations;
};
const ProjectCard = ({ project, projectLink }: ProjectCardProps) => {
  return (
    <div className="group relative z-10 shadow-primaryTint80 hover:shadow-primaryTint80 shadow-md hover:shadow-xl rounded-lg transition-all duration-500 overflow-hidden h-[400px] lg:h-[500px]">
      <Link
        href={projectLink}
        target="_blank"
        className="relative block w-full h-full"
      >
        <Image
          src={project?.image}
          alt={project?.translations[0]?.title}
          className="w-full h-full object-cover"
          width={0}
          height={240}
          sizes="100vw"
        />
      </Link>
      <Link
        href={projectLink}
        className="grid p-3 lg:p-5 mx-3 lg:mx-5 absolute bottom-4 lg:opacity-0 lg:invisible inset-x-0 lg:translate-y-4 group-hover:translate-y-0 group-hover:visible group-hover:opacity-100 rounded-2xl  text-white bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-shade-40)] transition-all duration-300"
      >
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-semibold line-clamp-1">
              {project?.translations[0]?.title}
            </h3>
            <span className="px-1 animate-bounce-x ar:animate-bounce-x-ar">
              <ArrowRight className="w-7 h-7" />
            </span>
          </div>
          <p className="text-lg line-clamp-1">
            {project?.translations[0]?.description}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;
