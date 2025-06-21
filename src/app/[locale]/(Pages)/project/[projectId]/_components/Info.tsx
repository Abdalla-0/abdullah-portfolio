import Gallery from "@/components/application/Gallery/Gallery";
import { ProjectWithGallery } from "@/types/project";
import Link from "next/link";

const Info = ({ project }: { project: ProjectWithGallery }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex flex-col justify-around gap-10 border rounded-lg p-4 ">
        <div>
          <h3 className="text-2xl font-semibold">Stack</h3>
          <p>{project.stack}</p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold">Role</h3>
          <p>{project.role}</p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold">Github Link</h3>
          <Link
            href={project.githubLink as string}
            target="_blank"
            className="underline text-primary break-words"
          >
            {project.githubLink}
          </Link>
        </div>
        <div>
          <Link
            target="_blank"
            href={project.previewLink as string}
            className="btn-primary"
          >
            Preview Link
          </Link>
        </div>
      </div>
      <div className="col-span-2">
        <Gallery
          items={project.gallery}
          alt="Project Gallery Image"
          className="max-h-[500px]"
        />
      </div>
    </div>
  );
};

export default Info;
