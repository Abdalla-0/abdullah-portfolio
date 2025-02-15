import { getSkills } from "@/server/db/skills";
import AddSkill from "./components/AddSkill";
import Image from "next/image";

export default async function Home() {
  const skills = await getSkills();
  return (
    <main className="py-4">
      <div className="container flex flex-col gap-3">
        <h1>Home page</h1>
        <AddSkill />
        <div className="grid grid-cols-4">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <div
                key={skill.id}
                className="border border-gray-300 rounded-lg w-fit p-3 bg-slate-200 mx-auto mt-5"
              >
                <Image
                  src={skill.image ?? "/bootstrap.png"}
                  alt={skill.title}
                  width={100}
                  height={100}
                />
                <h2 className="mt-2 text-center font-bold">{skill.title}</h2>
              </div>
            ))
          ) : (
            <p>No skills found</p>
          )}
        </div>
      </div>
    </main>
  );
}
