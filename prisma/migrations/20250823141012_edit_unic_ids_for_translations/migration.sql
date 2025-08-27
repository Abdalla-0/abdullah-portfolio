/*
  Warnings:

  - A unique constraint covering the columns `[projectId,language]` on the table `ProjectTranslation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[skillId,language]` on the table `SkillTranslation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ProjectTranslation_language_key";

-- DropIndex
DROP INDEX "ProjectTranslation_projectId_key";

-- DropIndex
DROP INDEX "SkillTranslation_language_key";

-- DropIndex
DROP INDEX "SkillTranslation_skillId_key";

-- CreateIndex
CREATE UNIQUE INDEX "ProjectTranslation_projectId_language_key" ON "ProjectTranslation"("projectId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "SkillTranslation_skillId_language_key" ON "SkillTranslation"("skillId", "language");
