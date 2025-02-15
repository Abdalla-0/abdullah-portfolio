"use server";
import { cache } from "@/utils/cache";
import { db } from "@/utils/db";

export const actionAddSkill = async () => {
  try {
    const skill = await db.skill.create({
      data: {
        title: "skill-4",
        image: "/bootstrap.png",
      },
    });

    console.log("Skill added:", skill); // ✅ هتطبع في الكونسول
    return skill;
  } catch (error) {
    console.error("Error adding skill:", error);
  }
}

export const getSkills = cache(
  async () => {
    const skills = await db.skill.findMany();
    return skills;
  },
  ["products"],
  { revalidate: 3600 }
);