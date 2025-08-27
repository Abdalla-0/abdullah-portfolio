/*
  Warnings:

  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `editorContent` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Skill` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "description",
DROP COLUMN "editorContent",
DROP COLUMN "tag",
DROP COLUMN "title";

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "title";

-- CreateTable
CREATE TABLE "ProjectTranslation" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "order" INTEGER DEFAULT 0,
    "language" VARCHAR(8) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "editorContent" TEXT,
    "tag" TEXT,

    CONSTRAINT "ProjectTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillTranslation" (
    "id" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "language" VARCHAR(8) NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "SkillTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProjectTranslation_projectId_idx" ON "ProjectTranslation"("projectId");

-- CreateIndex
CREATE INDEX "ProjectTranslation_language_idx" ON "ProjectTranslation"("language");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectTranslation_projectId_language_key" ON "ProjectTranslation"("projectId", "language");

-- CreateIndex
CREATE INDEX "SkillTranslation_skillId_idx" ON "SkillTranslation"("skillId");

-- CreateIndex
CREATE INDEX "SkillTranslation_language_idx" ON "SkillTranslation"("language");

-- CreateIndex
CREATE UNIQUE INDEX "SkillTranslation_skillId_language_key" ON "SkillTranslation"("skillId", "language");

-- AddForeignKey
ALTER TABLE "ProjectTranslation" ADD CONSTRAINT "ProjectTranslation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillTranslation" ADD CONSTRAINT "SkillTranslation_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
