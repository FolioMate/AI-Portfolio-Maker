/*
  Warnings:

  - Added the required column `content` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `github` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linkedin` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `template` to the `Portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "github" TEXT NOT NULL,
ADD COLUMN     "linkedin" TEXT NOT NULL,
ADD COLUMN     "template" TEXT NOT NULL,
ALTER COLUMN "bio" SET DEFAULT '',
ALTER COLUMN "socialLinks" SET DEFAULT '';
