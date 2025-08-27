import { ProjectWithRelations } from "@/types/project";
import { useTranslations } from "next-intl";

const Content = ({ project }: { project: ProjectWithRelations }) => {
  const t = useTranslations("ProjectPage.content");
  return (
    <div>
      <h3 className="text-2xl font-semibold">{t("aboutProject")}</h3>
      <p className="leading-8">{project.translations[0].description}</p>
      {/* <div
        dangerouslySetInnerHTML={{
          __html: project.translations[0].editorContent ?? "",
        }}
        className="tiptap"
      /> */}
    </div>
  );
};

export default Content;
