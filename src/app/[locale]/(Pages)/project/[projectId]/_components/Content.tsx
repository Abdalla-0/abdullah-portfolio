import { ProjectWithGallery } from "@/types/project";
import { useTranslations } from "next-intl";

const Content = ({ project }: { project: ProjectWithGallery }) => {
  const t = useTranslations("ProjectPage.content");
  return (
    <div>
      <h3 className="text-2xl font-semibold">{t("aboutProject")}</h3>
      <p className="leading-8">{project.description}</p>
      <div
        dangerouslySetInnerHTML={{ __html: project.editorContent ?? "" }}
        className="tiptap"
      />
    </div>
  );
};

export default Content;
