/*
  Warnings:

  - The `skills` column on the `Portfolio` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `projects` on the `Portfolio` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `socialLinks` on the `Portfolio` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "creativeTagline" TEXT,
ADD COLUMN     "youtubeLinks" TEXT[],
DROP COLUMN "skills",
ADD COLUMN     "skills" TEXT[],
DROP COLUMN "projects",
ADD COLUMN     "projects" JSONB NOT NULL,
DROP COLUMN "socialLinks",
ADD COLUMN     "socialLinks" JSONB NOT NULL;
