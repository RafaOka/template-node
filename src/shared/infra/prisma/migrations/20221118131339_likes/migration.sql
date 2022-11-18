/*
  Warnings:

  - You are about to drop the `Pius` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pius" DROP CONSTRAINT "Pius_user_id_fkey";

-- DropTable
DROP TABLE "Pius";

-- CreateTable
CREATE TABLE "pius" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pius_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "piuusers" (
    "id" TEXT NOT NULL,
    "idPiu" TEXT NOT NULL,
    "idsUsers" TEXT NOT NULL,
    "createAt" TEXT NOT NULL,

    CONSTRAINT "piuusers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pius" ADD CONSTRAINT "pius_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "piuusers" ADD CONSTRAINT "piuusers_idPiu_fkey" FOREIGN KEY ("idPiu") REFERENCES "pius"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "piuusers" ADD CONSTRAINT "piuusers_idsUsers_fkey" FOREIGN KEY ("idsUsers") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
