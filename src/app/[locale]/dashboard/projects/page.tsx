import { Button } from "@/components/ui/button";
import {
  actionDeleteSingleProject,
  actionGetAllProjects
} from "@/server/actions/projects";
import { Routes } from "@/utils/constants";
import { EditIcon } from "lucide-react";

import Link from "next/link";
import BtnDelete from "../_components/BtnDelete";
import BtnNewItem from "../_components/BtnNewItem";
import ItemCard from "../_components/ItemCard";

const ProjectsPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  const projects = await actionGetAllProjects();
  const link = `/${locale}/${Routes.DASHBOARD}/${Routes.PROJECTS}/${Routes.NEW}`;
  return (
    <div className="container">
      <section>
        <BtnNewItem title={"newProject"} link={link} />
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
                  <ItemCard item={project} />
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
