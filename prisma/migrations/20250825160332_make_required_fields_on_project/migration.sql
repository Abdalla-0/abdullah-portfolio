/*
  Warnings:

  - Made the column `order` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `ProjectTranslation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `ProjectTranslation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `editorContent` on table `ProjectTranslation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tag` on table `ProjectTranslation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "order" SET NOT NULL;

-- AlterTable
ALTER TABLE "ProjectTranslation" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "editorContent" SET NOT NULL,
ALTER COLUMN "tag" SET NOT NULL;
