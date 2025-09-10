/*
  Warnings:

  - You are about to drop the `SkillTranslation` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `order` on table `Gallery` required. This step will fail if there are existing NULL values in that column.
  - Made the column `order` on table `Skill` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "SkillTranslation" DROP CONSTRAINT "SkillTranslation_skillId_fkey";

-- AlterTable
ALTER TABLE "Gallery" ALTER COLUMN "order" SET NOT NULL;

-- AlterTable
ALTER TABLE "Skill" ALTER COLUMN "order" SET NOT NULL;

-- DropTable
DROP TABLE "SkillTranslation";
