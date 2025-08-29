/*
  Warnings:

  - You are about to drop the column `description` on the `ProjectTranslation` table. All the data in the column will be lost.
  - Made the column `editorContent` on table `ProjectTranslation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProjectTranslation" DROP COLUMN "description",
ALTER COLUMN "editorContent" SET NOT NULL;
