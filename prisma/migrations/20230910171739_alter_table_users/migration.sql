/*
  Warnings:

  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `google_id` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[github_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `github_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EnumRole" AS ENUM ('ADMIN', 'USER');

-- DropIndex
DROP INDEX "users_email_key";

-- DropIndex
DROP INDEX "users_google_id_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email",
DROP COLUMN "google_id",
ADD COLUMN     "github_id" TEXT NOT NULL,
ADD COLUMN     "role" "EnumRole" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_github_id_key" ON "users"("github_id");
