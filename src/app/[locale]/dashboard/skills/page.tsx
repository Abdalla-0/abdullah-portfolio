import { Button } from "@/components/ui/button";
import {
  actionDeleteSingleSkill,
  actionGetSkills,
} from "@/server/actions/skills";
import { Routes } from "@/utils/constants";
import { EditIcon } from "lucide-react";
import Link from "next/link";
import BtnDelete from "../_components/BtnDelete";
import BtnNewItem from "../_components/BtnNewItem";
import ItemCard from "../_components/ItemCard";

const SkillsPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const skills = await actionGetSkills();

  return (
    <div className="container">
      <section>
        <BtnNewItem
          title="newSkill"
          link={`/${locale}/${Routes.DASHBOARD}/${Routes.SKILLS}/${Routes.NEW}`}
        />

        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 `}
        >
          {skills.length > 0 ? (
            skills.map((skill) => {
              const skillLink = `/${locale}/${Routes.DASHBOARD}/${Routes.SKILLS}/${skill.id}/${Routes.EDIT}`;

              return (
                <div key={skill.id} className="relative">
                  <div className="absolute flex flex-col items-end gap-3 z-10 bg-slate-300/40 p-4 inset-0 rounded-lg">
                    <Button asChild variant={"outline"} className="p-2">
                      <Link href={skillLink}>
                        <EditIcon className="text-green-500 !w-5 !h-5" />
                      </Link>
                    </Button>
                    <BtnDelete
                      id={skill.id}
                      actionDelete={actionDeleteSingleSkill}
                    />
                  </div>

                  <ItemCard item={skill} />
                </div>
              );
            })
          ) : (
            <p className="text-lg font-bold text-gray-50/50">No skills found</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default SkillsPage;
