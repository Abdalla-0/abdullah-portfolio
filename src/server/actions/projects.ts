"use server";
import { cache } from "@/utils/cache";
import { db } from "@/utils/db";
import {
  editProjectSchema,
  newProjectSchema,
} from "@/validations/ProjectSchema";
import { revalidatePath, revalidateTag } from "next/cache";
import getImageUrl from "../getImageUrl";
import {
  RECORDS_PER_PAGE,
  Routes,
  SUPPORTED_LANGUAGES,
} from "@/utils/constants";
import { parseTranslationsFromFormData } from "@/utils/parseTranslationsFromFormData";

export const actionGetAllProjects = async () => {
  return await db.project.findMany({
    include: {
      gallery: { orderBy: { order: "asc" } },
      translations: true,
    },
    orderBy: { order: "asc" },
  });
};

/**
 * @description  get projects by age number
 * @access  public
 * @params  pageNumber: number
 **/

export const actionGetPublishedProgects = cache(
  async (local: string) => {
    try {
      const projects = await db.project.findMany({
        where: { isPublished: true },
        include: {
          gallery: { orderBy: { order: "asc" } },
          translations: {
            where: {
              language: local,
            },
          },
        },
        orderBy: { order: "asc" },
      });
      return projects;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw new Error("Failed to fetch projects");
    }
  },
  ["projects-by-page"],
  { revalidate: false, tags: ["projects"] }
);
export const actionGetPublishedProgectsByPageNumber = cache(
  async (local: string, pageNumber: number = 1) => {
    try {
      const projects = await db.project.findMany({
        where: { isPublished: true },
        include: {
          gallery: { orderBy: { order: "asc" } },
          translations: {
            where: {
              language: local,
            },
          },
        },
        orderBy: { order: "asc" },
        skip: (pageNumber - 1) * RECORDS_PER_PAGE,
        take: RECORDS_PER_PAGE,
      });
      return projects;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw new Error("Failed to fetch projects");
    }
  },
  ["projects-by-page"],
  { revalidate: false, tags: ["projects"] }
);

export const actionGetPublishedProjectsCount = async () => {
  try {
    const publishedProjectsCount = await db.project.count({
      where: {
        isPublished: true,
      },
    });
    return publishedProjectsCount;
  } catch (error) {
    console.error("Error fetching projects count:", error);
    throw new Error("Failed to fetch projects count");
  }
};

export const actionNewProject = async (formData: FormData) => {
  const raw = {
    translations: parseTranslationsFromFormData(formData, SUPPORTED_LANGUAGES),
    order: Number(formData.get("order")),
    title: formData.get("title"),
    description: formData.get("description"),
    role: formData.get("role"),
    editorContent: formData.get("editorContent"),
    stack: formData.get("stack"),
    previewLink: formData.get("previewLink"),
    githubLink: formData.get("githubLink"),
    image: formData.get("image"),
    gallery: formData.getAll("gallery"),
    isPublished: formData.get("isPublished") === "true",
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
        console.warn(
          `getImageUrl returned empty/null for gallery file: ${file.name}`
        );
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
          image: imageUrl,
          role: data.role,
          stack: data.stack,
          previewLink: data.previewLink,
          githubLink: data.githubLink,
          isPublished: data.isPublished,
          gallery: {
            create: galleryEntries.map((entry) => ({
              url: entry.url,
              order: entry.order,
            })),
          },
          translations: {
            createMany: {
              data: data.translations?.map((t) => ({
                language: t.language,
                title: t.title,
                description: t.description,
                editorContent: t.editorContent,
                tag: t.tag,
              })),
            },
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
    translations: parseTranslationsFromFormData(formData, SUPPORTED_LANGUAGES),
    order: Number(formData.get("order")),
    title: formData.get("title"),
    description: formData.get("description"),
    role: formData.get("role"),
    editorContent: formData.get("editorContent"),
    stack: formData.get("stack"),
    previewLink: formData.get("previewLink"),
    githubLink: formData.get("githubLink"),
    image: formData.get("image"),
    gallery: formData.getAll("gallery"),
    remainingExistingGallery: formData.get("remainingExistingGallery"),
    isPublished: formData.get("isPublished") === "true",
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
  const galleryFiles = data.gallery as unknown as (
    | File
    | string
    | null
    | undefined
  )[];

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
  const remainingExistingGalleryRaw = formData.get(
    "remainingExistingGallery"
  ) as string;
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
        role: data.role,
        stack: data.stack,
        previewLink: data.previewLink,
        githubLink: data.githubLink,
        isPublished: data.isPublished,
        ...(imageUrl && { image: imageUrl }),
        gallery: {
          create: newGalleryData.map((item) => ({
            url: item.url,
            order: item.order,
          })),
        },
        translations: {
          upsert: data.translations?.map((t) => ({
            where: {
              projectId_language: { projectId, language: t.language },
            },
            create: {
              language: t.language,
              title: t.title,
              description: t.description,
              editorContent: t.editorContent,
              tag: t.tag,
            },
            update: {
              title: t.title,
              description: t.description,
              editorContent: t.editorContent,
              tag: t.tag,
            },
          })),
        },
      },
    });
    revalidateTag("projects");
    revalidatePath(
      `/${locale}/${Routes.DASHBOARD}/${Routes.PROJECTS}/${projectId}/${Routes.EDIT}`
    );

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
  async (id: string, locale: string) => {
    try {
      const project = await db.project.findUnique({
        where: { id },
        include: {
          gallery: {
            orderBy: {
              order: "asc",
            },
          },
          translations: {
            where: {
              language: locale,
            },
          },
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
  ["projects", "single-project"],
  { revalidate: 3600 }
);
export const actionGetSinglePublishedProject = cache(
  async (id: string, locale: string) => {
    try {
      const project = await db.project.findUnique({
        where: { id },
        include: {
          gallery: {
            orderBy: {
              order: "asc",
            },
          },
          translations: {
            where: {
              language: locale,
            },
          },
        },
      });

      if (!project || !project.isPublished) {
        throw new Error("Project not found");
      }

      return project;
    } catch (error) {
      console.error("Error fetching project:", error);
      throw new Error("Failed to fetch project");
    }
  },
  ["projects", "single-project"],
  { revalidate: 3600 }
);

export const actionLike = async (id: string, locale: string) => {
  try {
    const project = await db.project.findUnique({
      where: {
        id,
      },
    });
    if (!project) return { message: "Project not fount", status: 404 };
    const updatedProject = await db.project.update({
      where: { id },
      data: { likes: { increment: 1 } },
      select: { likes: true }, // رجّع العدد الجديد بس
    });

    revalidatePath(`/${locale}/${Routes.PROJECT}/${id}`);

    return updatedProject.likes;
  } catch (error) {
    console.error("Error liking project:", error);
    throw new Error("Failed to like project");
  }
};
export const actionGetLikes = async (id: string) => {
  try {
    const project = await db.project.findUnique({
      where: { id },
      select: { likes: true },
    });
    if (!project) return 0;
    return project.likes;
  } catch (error) {
    console.error("Error fetching likes:", error);
    throw new Error("Failed to get likes");
  }
};

export const actionDeleteSingleProject = async (id: string) => {
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
};
