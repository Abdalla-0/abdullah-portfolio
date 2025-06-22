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
                    gallery: true,
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

    const validGalleryFiles = galleryFiles.filter(
        (file) => file instanceof File && file.size > 0
    );

    const galleryUrlsPromises = validGalleryFiles.map(async (file) => {
        try {
            const url = await getImageUrl(file, "portifolio/project_gallery");
            if (!url) {
                console.warn(`getImageUrl returned empty/null for gallery file: ${file.name}`);
                return null;
            }
            return url;
        } catch (uploadError) {
            console.error(`Error uploading gallery image ${file.name}:`, uploadError);
            return null;
        }
    });

    const galleryUrls = (await Promise.all(galleryUrlsPromises)).filter(
        (url): url is string => Boolean(url)
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
                        create: galleryUrls.map((url) => ({ url })),
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
    // تجميع البيانات الخام للتحقق
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
    console.log("Data Order", data.order);

    const imageFile = data.image as File | string | null | undefined; // قد تكون File أو string (إذا كانت موجودة)
    const galleryFiles = data.gallery as unknown as (File | string | null | undefined)[]; // ستحتوي فقط على File هنا بعد الـ FormData


    let imageUrl: string | undefined;
    if (imageFile instanceof File && imageFile.size > 0) {
        try {
            imageUrl = await getImageUrl(imageFile, "portifolio/project_images");
        } catch (error) {
            console.error("Error uploading new main image for update:", error);
            return { status: 500, message: "Failed to upload new main image" };
        }
    }

    // معالجة صور المعرض الجديدة (الملفات)
    const newGalleryUrlsPromises = galleryFiles
        .filter((file): file is File => file instanceof File && file.size > 0) // تأكد أنها ملفات File
        .map(async (file) => {
            try {
                return await getImageUrl(file, "portifolio/project_gallery");
            } catch (error) {
                console.error("Error uploading new gallery image", error);
                return null;
            }
        });
    const newGalleryUrls = (await Promise.all(newGalleryUrlsPromises)).filter(
        (url): url is string => Boolean(url)
    );

    // استخراج الـ URLs للصور القديمة التي يجب الاحتفاظ بها من الـ FormData
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
            include: { gallery: true }, // تأكد من تحميل صور المعرض الموجودة
        });

        if (!existingItem) {
            return { status: 404, message: "Project not found" };
        }

        // تحديد الصور الموجودة في قاعدة البيانات والتي لم يعد المستخدم يريدها
        const imagesToDelete = existingItem.gallery.filter(
            (img) => !existingGalleryUrlsToKeep.includes(img.url)
        );

        // حذف هذه الصور من قاعدة البيانات
        if (imagesToDelete.length > 0) {
            await db.gallery.deleteMany({ // تأكد أن لديك نموذج 'Image' في Prisma لمتحكمات المعرض
                where: {
                    id: {
                        in: imagesToDelete.map((img) => img.id),
                    },
                },
            });
            // (اختياري) يمكنك أيضًا إضافة منطق لحذف الصور من Cloudinary هنا
            // يتطلب ذلك استخدام Cloudinary API لإزالة الصور بالـ public_id
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
                // تحديث الصورة الرئيسية فقط إذا تم تحميل صورة جديدة
                ...(imageUrl && { image: imageUrl }),
                // إذا لم يتم تحميل صورة جديدة، لا تقم بتغيير حقل الصورة في DB
                // وإلا ستكون قيمتها undefined أو null حسب defaultValues

                gallery: {
                    // قم بإنشاء إدخالات جديدة لصور المعرض الجديدة فقط
                    create: newGalleryUrls.map((url) => ({ url })),
                    // لا يوجد داعي لـ connectExisting أو set هنا إذا كان الهدف هو فقط إضافة الجديد وحذف غير الموجود
                    // الـ URLs التي نريد الاحتفاظ بها موجودة بالفعل في DB ولن يتم تعديلها.
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


export const actionGetSingleProject = cache(
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
    ;