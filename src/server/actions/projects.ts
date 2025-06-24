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
            const projects = await db.project.findMany({
                include: {
                    gallery: {
                        orderBy: {
                            order: "asc",
                        },
                    },
                },
                orderBy: {
                    order: "asc",
                },
            });

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
    const raw = {
        order: Number(formData.get("order")),
        title: formData.get("title"),
        role: formData.get("role"),
        description: formData.get("description"),
        stack: formData.get("stack"),
        previewLink: formData.get("previewLink"),
        githubLink: formData.get("githubLink"),
        image: formData.get("image"),
        gallery: formData.getAll("gallery"),
    };

    const result = newProjectSchema().safeParse(raw);


    if (!result.success) {
        console.dir(result.error.format(), { depth: null });
        return {
            error: "Something wrong in validation",
            status: 400,
            formData,
        };
    }

    const data = result.data;
    const imageFile = data.image as File;

    const galleryFiles = formData.getAll("gallery") as File[];

    const galleryOrdersRaw = formData.getAll("galleryOrders") as string[];
    const galleryOrders = galleryOrdersRaw.map((order) => Number(order));

    const validGalleryFiles = galleryFiles.filter(
        (file) => file instanceof File && file.size > 0
    );

    const galleryUrlsPromises = validGalleryFiles.map(async (file, index) => {
        try {
            const url = await getImageUrl(file, "portifolio/project_gallery");
            if (!url) {
                console.warn(`getImageUrl returned empty/null for gallery file: ${file.name}`);
                return null;
            }
            return {
                url,
                order: galleryOrders[index] || 0,
            };
        } catch (uploadError) {
            console.error(`Error uploading gallery image ${file.name}:`, uploadError);
            return null;
        }
    });

    const galleryEntries = (await Promise.all(galleryUrlsPromises)).filter(
        (entry): entry is { url: string; order: number } => Boolean(entry)
    );


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
                    order: data.order,
                    title: data.title,
                    image: imageUrl,
                    role: data.role,
                    description: data.description,
                    stack: data.stack,
                    previewLink: data.previewLink,
                    githubLink: data.githubLink,
                    gallery: {
                        create: galleryEntries.map((entry) => ({
                            url: entry.url,
                            order: entry.order,
                        })),
                    },
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

export const actionUpdateProject = async (
    formData: FormData,
    projectId: string,
    locale: string
) => {
    const raw = {
        order: Number(formData.get("order")),
        title: formData.get("title"),
        role: formData.get("role"),
        description: formData.get("description"),
        stack: formData.get("stack"),
        previewLink: formData.get("previewLink"),
        githubLink: formData.get("githubLink"),
        image: formData.get("image"),
        gallery: formData.getAll("gallery"),
        remainingExistingGallery: formData.get("remainingExistingGallery"),
    };

    const result = editProjectSchema().safeParse(raw);
    if (!result.success) {
        console.error("Validation error in actionUpdateProject:", result.error);
        return {
            error: "Something wrong in validation",
            status: 400,
            formData,
        };
    }

    const data = result.data;

    const imageFile = data.image as File | string | null | undefined;
    const galleryFiles = data.gallery as unknown as (File | string | null | undefined)[];


    let imageUrl: string | undefined;
    if (imageFile instanceof File && imageFile.size > 0) {
        try {
            imageUrl = await getImageUrl(imageFile, "portifolio/project_images");
        } catch (error) {
            console.error("Error uploading new main image for update:", error);
            return { status: 500, message: "Failed to upload new main image" };
        }
    }

    const galleryOrdersRaw = Array.from(formData.entries())
        .filter(([key]) => key.startsWith("galleryOrders["))
        .map(([, value]) => Number(value));

    const galleryWithOrder = await Promise.all(
        galleryFiles
            .filter((file): file is File => file instanceof File && file.size > 0)
            .map(async (file, index) => {
                try {
                    const url = await getImageUrl(file, "portifolio/project_gallery");
                    return { url, order: galleryOrdersRaw[index] ?? 0 };
                } catch (error) {
                    console.error("Error uploading gallery image", error);
                    return null;
                }
            })
    );

    const newGalleryData = galleryWithOrder.filter(
        (entry): entry is { url: string; order: number } => Boolean(entry)
    );


    let existingGalleryUrlsToKeep: string[] = [];
    const remainingExistingGalleryRaw = formData.get("remainingExistingGallery") as string;
    if (remainingExistingGalleryRaw) {
        try {
            existingGalleryUrlsToKeep = JSON.parse(remainingExistingGalleryRaw);
        } catch (e) {
            console.error("Error parsing remainingExistingGallery:", e);
        }
    }


    try {
        const existingItem = await db.project.findUnique({
            where: { id: projectId },
            include: { gallery: true },
        });

        if (!existingItem) {
            return { status: 404, message: "Project not found" };
        }


        const imagesToDelete = existingItem.gallery.filter(
            (img) => !existingGalleryUrlsToKeep.includes(img.url)
        );


        if (imagesToDelete.length > 0) {
            await db.gallery.deleteMany({
                where: {
                    id: {
                        in: imagesToDelete.map((img) => img.id),
                    },
                },
            });
        }

        await db.project.update({
            where: { id: projectId },
            data: {
                order: data.order,
                title: data.title,
                role: data.role,
                description: data.description,
                stack: data.stack,
                previewLink: data.previewLink,
                githubLink: data.githubLink,
                ...(imageUrl && { image: imageUrl }),
                gallery: {
                    create: newGalleryData.map((item) => ({
                        url: item.url,
                        order: item.order,
                    })),
                },
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


export const actionGetSingleProject =
    async (id: string) => {
        try {
            const project = await db.project.findUnique({
                where: { id },
                include: {
                    gallery: true,
                },
            });

            if (!project) {
                throw new Error("Project not found");
            }

            return project;
        } catch (error) {
            console.error("Error fetching project:", error);
            throw new Error("Failed to fetch project");
        }
    };

//  أزل السطرين الأخيرين المتعلقين بـ `cache` ومفتاح الكاش من تعريف الدالة.
//  [`project-${crypto.randomUUID()}`],
//  { revalidate: 3600 }


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
    ;