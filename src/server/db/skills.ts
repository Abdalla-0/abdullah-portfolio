"use server";
import { cache } from "@/utils/cache";
import { db } from "@/utils/db";
import { Skill } from "@prisma/client";
import { revalidateTag } from "next/cache";




export const actionAddSkill = async (formData: Skill) => {

  const skill = await db.skill.create({
    data: {
      title: formData.title,
      image:  "/bootstrap.png",
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