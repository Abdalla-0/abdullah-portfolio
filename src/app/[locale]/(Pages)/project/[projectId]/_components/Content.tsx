import { ProjectWithRelations } from "@/types/project";
import { useTranslations } from "next-intl";

const Content = ({ project }: { project: ProjectWithRelations }) => {
  const t = useTranslations("ProjectPage.content");
  return (
    <div>
      <h3 className="text-2xl font-semibold">{t("aboutProject")}</h3>
      <div
        dangerouslySetInnerHTML={{
          __html: project.translations[0].editorContent ?? "",
        }}
        className="tiptap"
      />
    </div>
  );
};

export default Content;
