"use server";
import { cache } from "@/utils/cache";
import { db } from "@/utils/db";
import { revalidateTag } from "next/cache";

export const actionAddSkill = async () => {

  const skill = await db.skill.create({
    data: {
      title: "skill-4",
      image: "/bootstrap.png",
    },
  });
  await new Promise((resolve) => setTimeout(resolve, 100));
  revalidateTag("skills");
  return skill;

}

export const getSkills = cache(
  async () => {
    const skills = await db.skill.findMany();

    return skills;
  },
  ["skills"],
  { revalidate: false, tags: ["skills"] }

);