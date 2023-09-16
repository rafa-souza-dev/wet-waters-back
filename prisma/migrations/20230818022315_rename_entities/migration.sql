/*
  Warnings:

  - You are about to drop the `Animal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Threat_cause` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_user_id_fkey";

-- DropForeignKey
ALTER TABLE "_AnimalToThreat_cause" DROP CONSTRAINT "_AnimalToThreat_cause_A_fkey";

-- DropForeignKey
ALTER TABLE "_AnimalToThreat_cause" DROP CONSTRAINT "_AnimalToThreat_cause_B_fkey";

-- DropTable
DROP TABLE "Animal";

-- DropTable
DROP TABLE "Like";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Threat_cause";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "animals" (
    "id" SERIAL NOT NULL,
    "specie_name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "conservation_status" "ConservationStatus" NOT NULL,
    "ecological_function" TEXT NOT NULL,
    "url_image" TEXT NOT NULL,

    CONSTRAINT "animals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "threat_causes" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "threat_causes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "google_id" TEXT NOT NULL,
    "point" INTEGER,
    "avatar_url" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url_image" TEXT,
    "published_at" TIMESTAMP(3),
    "user_id" INTEGER,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("user_id","post_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "animals_specie_name_key" ON "animals"("specie_name");

-- CreateIndex
CREATE UNIQUE INDEX "threat_causes_description_key" ON "threat_causes"("description");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_google_id_key" ON "users"("google_id");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimalToThreat_cause" ADD CONSTRAINT "_AnimalToThreat_cause_A_fkey" FOREIGN KEY ("A") REFERENCES "animals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimalToThreat_cause" ADD CONSTRAINT "_AnimalToThreat_cause_B_fkey" FOREIGN KEY ("B") REFERENCES "threat_causes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
