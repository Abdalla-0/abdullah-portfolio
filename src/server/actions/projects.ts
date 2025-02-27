"use server";
import { cache } from "@/utils/cache";
import { db } from "@/utils/db";
import { editProjectSchema, newProjectSchema } from "@/validations/ProjectSchema";
import { revalidatePath, revalidateTag } from "next/cache";
import getImageUrl from "../getImageUrl";
import { Routes } from "@/utils/constants";

export const actionGetProjects = cache(
    async () => {
        try {
            const projects = await db.project.findMany();

            return projects;
        } catch (error) {
            console.error("Error fetching projects:", error);
            throw new Error("Failed to fetch projects");
        }
    },
    ["projects"],
    { revalidate: false, tags: ["projects"] }
);

export const actionNewProject = async (formData: FormData) => {
    const result = newProjectSchema().safeParse(Object.fromEntries(formData.entries()));

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
        ? await getImageUrl(imageFile, "portifolio/project_images")
        : undefined;

    try {
        if (!imageUrl) {
            return { status: 400, message: "Image is required" };
        }
        if (imageUrl) {
            await db.project.create({
                data: {
                    ...data,
                    title: data.title,
                    image: imageUrl,
                    description: data.description,
                    stack: data.stack,
                },
            });
        }
        revalidateTag("projects");

        return {
            status: 200,
            message: "Project added successfully",
        };
    } catch (error) {
        console.error("Error saving project to database:", error);
        return {
            status: 500,
            message: "Failed to save project",
        };
    }
};

export const actionUpdateProject = async (formData: FormData, projectId: string, locale: string) => {

    const result = editProjectSchema().safeParse(Object.fromEntries(formData.entries()));

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
        ? await getImageUrl(imageFile, "portifolio/project_images")
        : undefined;

    try {

        const existingItem = await db.project.findUnique({
            where: { id: projectId },
        });

        if (!existingItem) {
            return { status: 404, message: "Project not found" };
        }

        await db.project.update({
            where: { id: projectId },
            data: {
                ...data,
                image: imageUrl ?? existingItem.image,
            },
        });

        revalidateTag("projects");
        revalidatePath(`/${locale}/${Routes.DASHBOARD}/${Routes.PROJECTS}/${projectId}/${Routes.EDIT}`);

        return {
            status: 200,
            message: "Project updated successfully",
        };
    } catch (error) {
        console.error("Error updating project in database:", error);
        return {
            status: 500,
            message: "Failed to update project",
        };
    }
};



export const actionGetSingleProject = cache(
    async (id: string) => {
        try {
            const project = await db.project.findUnique({
                where: { id },
            });

            if (!project) {
                throw new Error("Project not found");
            }

            return project;
        } catch (error) {
            console.error("Error fetching project:", error);
            throw new Error("Failed to fetch project");
        }
    },
    [`project-${crypto.randomUUID()}`],
    { revalidate: 3600 }
);


export const actionDeleteSingleProject =
    async (id: string) => {
        try {
            const deletedProject = await db.project.delete({
                where: { id },
            });
            revalidateTag("projects");
            return deletedProject;
        } catch (error) {
            console.error("Error deleting project:", error);
            throw new Error("Failed to delete project");
        }
    }