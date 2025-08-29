import { Gallery, Project, ProjectTranslation } from "@prisma/client";

export type ProjectWithRelations = Project & {
  gallery: Gallery[];
  translations: ProjectTranslation[];
};
