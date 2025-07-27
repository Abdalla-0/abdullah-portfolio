import Gallery from "@/components/application/Gallery/Gallery";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProjectWithGallery } from "@/types/project";
import { Images } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Info = ({ project }: { project: ProjectWithGallery }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="flex flex-col justify-around gap-10 border rounded-lg p-4 ">
        <div>
          <h3 className="text-2xl font-semibold">Stack</h3>
          <p>{project.stack}</p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold">Role</h3>
          <p>{project.role}</p>
        </div>
        {project.githubLink !== "empty" && (
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
        )}
        {project.previewLink !== "empty" && (
          <div>
            <Link
              target="_blank"
              href={project.previewLink as string}
              className="btn-primary"
            >
              Preview Link
            </Link>
          </div>
        )}
      </div>
      <div>
        <div className="p-3 w-full h-full bg-gray-200 flex flex-col rounded-lg">
          <Image
            src={project.image}
            alt="Project Image"
            width={0}
            height={0}
            sizes="auto"
            className="w-full h-[300px] object-cover"
          />
          <div className="w-full bg-gray-200 element-center mt-3">
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button className="btn-primary bg-gray-500 px-10 element-center gap-2">
                    Screenshots
                    <Images size={20} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[90vw] max-h-[90vh] bg-primaryTint90">
                  <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription asChild>
                      <Gallery
                        items={project.gallery}
                        alt="Project Gallery Image"
                        className="max-w-full max-h-[80vh] overflow-auto"
                      />
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </form>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
