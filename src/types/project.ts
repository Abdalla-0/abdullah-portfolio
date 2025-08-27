import { Gallery, Project, ProjectTranslation } from "@prisma/client";

export type ProjectWithGallery = Project & {
  gallery: Gallery[];
};

export type ProjectWithRelations = Project & {
  gallery: Gallery[];
  translations: ProjectTranslation[];
};
