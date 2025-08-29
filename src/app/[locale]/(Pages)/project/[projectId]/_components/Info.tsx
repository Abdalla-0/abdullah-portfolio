import { ProjectWithRelations } from "@/types/project";

import { useTranslations } from "next-intl";

import Link from "next/link";

const Info = ({ project }: { project: ProjectWithRelations }) => {
  const t = useTranslations("ProjectPage.info");
  return (
    <div className="flex flex-col justify-around gap-10 border rounded-lg p-4 ">
      <div>
        <h3 className="text-2xl font-semibold">{t("stack")}</h3>
        <p>{project.stack}</p>
      </div>
      <div>
        <h3 className="text-2xl font-semibold">{t("role")}</h3>
        <p>{project.role}</p>
      </div>
      {project.githubLink !== "empty" && (
        <div>
          <h3 className="text-2xl font-semibold">{t("githubLink")}</h3>
          <Link
            href={project.githubLink as string}
            target="_blank"
            className="underline text-primary break-words"
          >
            {t("githubLink")}
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
            {t("livePreview")}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Info;
