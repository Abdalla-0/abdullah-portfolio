import { Gallery, Project } from "@prisma/client";

export type ProjectWithGallery = Project & {
    gallery: Gallery[];
};