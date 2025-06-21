import { Button } from "@/components/ui/button";
import { ProjectWithGallery } from "@/types/project";
import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  projectLink: string;
  project: ProjectWithGallery;
};
const ProjectCard = ({ project, projectLink }: ProjectCardProps) => {
  return (
    <Link
      href={projectLink}
      target="_blank"
      className="group relative p-2 border border-primary transition-all duration-500 hover:shadow-lg rounded-lg"
    >
      <div className="relative block overflow-hidden">
        {/* صورة الخلفية التي تظهر عند الـ hover */}
        <Image
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-60 object-cover scale-150 opacity-0 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 group-hover:blur-0"
          width={0}
          height={240}
          sizes="100vw"
        />
        {/* الصورة الأساسية */}
        <Image
          src={project.image}
          alt={project.title}
          className="w-full h-60 object-cover transition-all duration-500 group-hover:opacity-0"
          width={0}
          height={240}
          sizes="100vw"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold">
          <div className="hover:text-primary transition-colors duration-300">
            {project.title}
          </div>
        </h2>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2 min-h-[40px]">
          <span className="font-bold">Stack:</span> {project.stack}
        </p>
        <Button className="text-sm btn-primary mt-3">More Info</Button>
      </div>
    </Link>
  );
};

export default ProjectCard;
