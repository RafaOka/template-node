/*
  Warnings:

  - You are about to drop the `pius` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pius" DROP CONSTRAINT "pius_user_id_fkey";

-- DropTable
DROP TABLE "pius";

-- CreateTable
CREATE TABLE "Pius" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "likes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Pius_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pius" ADD CONSTRAINT "Pius_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
