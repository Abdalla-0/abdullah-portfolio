"use server";
import { cache } from "@/utils/cache";
import { Routes } from "@/utils/constants";
import { db } from "@/utils/db";
import { editSkillSchema, newSkillSchema } from "@/validations/skillSchema";
import { revalidatePath, revalidateTag } from "next/cache";
import getImageUrl from "../getImageUrl";


export const actionGetSkills = cache(
  async () => {
    try {
      const skills = await db.skill.findMany({
        orderBy: {
          order: "asc",
        },
      });
      return skills;
    } catch (error) {
      console.error("Error fetching skills:", error);
      throw new Error("Failed to fetch skills");
    }
  },
  ["skills"],
  { revalidate: false, tags: ["skills"] }
);

export const actionNewSkill = async (formData: FormData) => {
  const raw = {
    ...Object.fromEntries(formData.entries()),
    order: Number(formData.get("order")),
  };

  const result = newSkillSchema().safeParse(raw);
  if (!result.success) {
    return {
      error: "Something wrong in validation",
      status: 400,
      formData,
    };
  }

  const data = result.data;


  const imageFile = data.image as File;

  if (!imageFile || imageFile.size === 0) {
    return { status: 400, message: "Image is required" };
  }

  const imageUrl = Boolean(imageFile.size)
    ? await getImageUrl(imageFile, "portifolio/skill_images")
    : undefined;

  try {
    if (!imageUrl) {
      return { status: 400, message: "Image is required" };
    }
    if (imageUrl) {
      await db.skill.create({
        data: {
          ...data,
          order: data.order,
          title: data.title,
          image: imageUrl,
        },
      });
    }
    revalidateTag("skills");

    return {
      status: 200,
      message: "Skill added successfully",
    };
  } catch (error) {
    console.error("Error saving skill to database:", error);
    return {
      status: 500,
      message: "Failed to save skill",
    };
  }
};
export const actionUpdateSkill = async (formData: FormData, skillId: string, locale: string) => {

  const result = editSkillSchema().safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    return {
      error: "Something wrong in validation",
      status: 400,
      formData,
    };
  }

  const data = result.data;
  const imageFile = data.image as File;

  const imageUrl = imageFile instanceof File && imageFile.size > 0
    ? await getImageUrl(imageFile, "portifolio/skill_images")
    : undefined;

  try {

    const existingItem = await db.skill.findUnique({
      where: { id: skillId },
    });

    if (!existingItem) {
      return { status: 404, message: "Skill not found" };
    }

    await db.skill.update({
      where: { id: skillId },
      data: {
        ...data,
        image: imageUrl ?? existingItem.image,
      },
    });

    revalidateTag("skills");
    revalidatePath(`/${locale}/${Routes.DASHBOARD}/${Routes.SKILLS}/${skillId}/${Routes.EDIT}`);

    return {
      status: 200,
      message: "Skill updated successfully",
    };
  } catch (error) {
    console.error("Error updating skill in database:", error);
    return {
      status: 500,
      message: "Failed to update skill",
    };
  }
};





export const actionGetSingleSkill = cache(
  async (id: string) => {
    try {
      const skill = await db.skill.findUnique({
        where: { id },
      });

      if (!skill) {
        throw new Error("Skill not found");
      }

      return skill;
    } catch (error) {
      console.error("Error fetching skill:", error);
      throw new Error("Failed to fetch skill");
    }
  },
  [`skill-${crypto.randomUUID()}`],
  { revalidate: 3600 }
);


export const actionDeleteSingleSkill =
  async (id: string) => {
    try {
      const deletedSkill = await db.skill.delete({
        where: { id },
      });
      revalidateTag("skills");
      return deletedSkill;
    } catch (error) {
      console.error("Error deleting skill:", error);
      throw new Error("Failed to delete skill");
    }
  }