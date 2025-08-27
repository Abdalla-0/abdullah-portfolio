/*
  Warnings:

  - You are about to drop the column `order` on the `ProjectTranslation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[projectId]` on the table `ProjectTranslation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[language]` on the table `ProjectTranslation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[skillId]` on the table `SkillTranslation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[language]` on the table `SkillTranslation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ProjectTranslation_projectId_language_key";

-- DropIndex
DROP INDEX "SkillTranslation_skillId_language_key";

-- AlterTable
ALTER TABLE "ProjectTranslation" DROP COLUMN "order",
ALTER COLUMN "title" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProjectTranslation_projectId_key" ON "ProjectTranslation"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectTranslation_language_key" ON "ProjectTranslation"("language");

-- CreateIndex
CREATE UNIQUE INDEX "SkillTranslation_skillId_key" ON "SkillTranslation"("skillId");

-- CreateIndex
CREATE UNIQUE INDEX "SkillTranslation_language_key" ON "SkillTranslation"("language");
