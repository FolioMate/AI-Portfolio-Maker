/*
  Warnings:

  - The primary key for the `Portfolio` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bio` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `certifications` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `education` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `objective` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `portfolioText` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `socialLinks` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `tagline` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `testimonials` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `workExperience` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `youtubeEmbed` on the `Portfolio` table. All the data in the column will be lost.
  - The `id` column on the `Portfolio` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `content` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `github` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linkedin` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `Portfolio` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projects` on table `Portfolio` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Portfolio" DROP CONSTRAINT "Portfolio_pkey",
DROP COLUMN "bio",
DROP COLUMN "certifications",
DROP COLUMN "contact",
DROP COLUMN "education",
DROP COLUMN "experience",
DROP COLUMN "objective",
DROP COLUMN "portfolioText",
DROP COLUMN "socialLinks",
DROP COLUMN "tagline",
DROP COLUMN "testimonials",
DROP COLUMN "workExperience",
DROP COLUMN "youtubeEmbed",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "github" TEXT NOT NULL,
ADD COLUMN     "linkedin" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "skills" SET NOT NULL,
ALTER COLUMN "skills" SET DATA TYPE TEXT,
ALTER COLUMN "projects" SET NOT NULL,
ALTER COLUMN "projects" SET DATA TYPE TEXT,
ADD CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id");
