/*
  Warnings:

  - Added the required column `description` to the `PDF` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `PDF` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PDF" ADD COLUMN     "description" VARCHAR(255) NOT NULL,
ADD COLUMN     "name" VARCHAR(100) NOT NULL;
