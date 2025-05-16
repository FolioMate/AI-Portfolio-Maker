/*
  Warnings:

  - The primary key for the `Portfolio` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Portfolio` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Portfolio" DROP CONSTRAINT "Portfolio_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
