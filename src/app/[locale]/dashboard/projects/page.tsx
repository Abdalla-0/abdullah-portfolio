import { Button, buttonVariants } from "@/components/ui/button";
import {
  actionDeleteSingleProject,
  actionGetProjects,
} from "@/server/actions/projects";
import { Routes } from "@/utils/constants";
import { ArrowRightCircle, EditIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import BtnDelete from "../_components/BtnDelete";
import ItemCard from "../_components/ItemCard";

const ProjectsPage = async ({ params }: { params: { locale: string } }) => {
  const { locale } = params;
  const projects = await actionGetProjects();

  return (
    <div className="container">
      <section>
        <BtnNewProject locale={locale} />
        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 `}
        >
          {projects.length > 0 ? (
            projects.map((project) => {
              const projectLink = `/${locale}/${Routes.DASHBOARD}/${Routes.PROJECTS}/${project.id}/${Routes.EDIT}`;

              return (
                <div key={project.id} className="relative">
                  <div className="absolute flex flex-col items-end gap-3 z-10 bg-slate-300/40 p-4 inset-0 rounded-lg">
                    <Button asChild variant={"outline"} className="p-2">
                      <Link href={projectLink}>
                        <EditIcon className="text-green-500 !w-5 !h-5" />
                      </Link>
                    </Button>
                    <BtnDelete
                      id={project.id}
                      actionDelete={actionDeleteSingleProject}
                    />
                  </div>
                  <ItemCard item={project} itemLink={projectLink} />
                </div>
              );
            })
          ) : (
            <p className="text-lg font-bold text-gray-50/50">
              No Projects found
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;

const BtnNewProject = ({ locale }: { locale: string }) => {
  const t = useTranslations("Dashboard");
  return (
    <Link
      href={`/${locale}/${Routes.DASHBOARD}/${Routes.PROJECTS}/${Routes.NEW}`}
      className={`${buttonVariants({
        variant: "outline",
      })} !mx-auto !flex !w-80 !h-10 mb-8`}
    >
      {t("newProject")}
      <ArrowRightCircle className={`!w-5 !h-5 rtl:rotate-180`} />
    </Link>
  );
};

export { BtnNewProject };
