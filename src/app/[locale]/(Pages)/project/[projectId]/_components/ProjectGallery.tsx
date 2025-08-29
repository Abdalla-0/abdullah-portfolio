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
import { ProjectWithRelations } from "@/types/project";
import { Images } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const ProjectGallery = ({ project }: { project: ProjectWithRelations }) => {
  const t = useTranslations("ProjectPage.gallery");
  return (
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
                {t("btnAction")}
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
  );
};

export default ProjectGallery;
