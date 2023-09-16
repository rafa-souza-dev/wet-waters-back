-- CreateEnum
CREATE TYPE "ConservationStatus" AS ENUM ('EXTINCT', 'EXTINCT_IN_THE_WILD', 'CRITICAL_ENDANGERED', 'ENDANGERED', 'VULNERABLE', 'NEAR_THREATENED', 'LEAST_CONCERN', 'DATA_DEFICIENT', 'NOT_AVALUATED');

-- CreateTable
CREATE TABLE "Animal" (
    "id" SERIAL NOT NULL,
    "specie_name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "conservation_status" "ConservationStatus" NOT NULL,
    "ecological_function" TEXT NOT NULL,
    "url_image" TEXT NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Threat_cause" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Threat_cause_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "google_id" TEXT NOT NULL,
    "point" INTEGER,
    "avatar_url" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url_image" TEXT,
    "published_at" TIMESTAMP(3),
    "user_id" INTEGER,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("user_id","post_id")
);

-- CreateTable
CREATE TABLE "_AnimalToThreat_cause" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Animal_specie_name_key" ON "Animal"("specie_name");

-- CreateIndex
CREATE UNIQUE INDEX "Threat_cause_description_key" ON "Threat_cause"("description");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_google_id_key" ON "User"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimalToThreat_cause_AB_unique" ON "_AnimalToThreat_cause"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimalToThreat_cause_B_index" ON "_AnimalToThreat_cause"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimalToThreat_cause" ADD CONSTRAINT "_AnimalToThreat_cause_A_fkey" FOREIGN KEY ("A") REFERENCES "Animal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimalToThreat_cause" ADD CONSTRAINT "_AnimalToThreat_cause_B_fkey" FOREIGN KEY ("B") REFERENCES "Threat_cause"("id") ON DELETE CASCADE ON UPDATE CASCADE;
