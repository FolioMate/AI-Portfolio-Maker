/*
  Warnings:

  - You are about to drop the column `content` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `github` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `template` on the `Portfolio` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `bio` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `socialLinks` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `userId` on the `Portfolio` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Portfolio" DROP CONSTRAINT "Portfolio_userId_fkey";

-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "content",
DROP COLUMN "email",
DROP COLUMN "github",
DROP COLUMN "linkedin",
DROP COLUMN "template",
ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "socialLinks" TEXT NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
