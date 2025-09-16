import { ProjectWithRelations } from "@/types/project";
import { useTranslations } from "next-intl";

const Content = ({ project }: { project: ProjectWithRelations }) => {
  const t = useTranslations("ProjectPage.content");
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col">
        <h3 className="text-2xl font-bold">{t("Overview")}</h3>
        <p>{project.translations[0].description}</p>
      </div>
      <div
        className="tiptap"
        dangerouslySetInnerHTML={{
          __html: project.translations[0].editorContent ?? "",
        }}
      />
    </div>
  );
};

export default Content;
