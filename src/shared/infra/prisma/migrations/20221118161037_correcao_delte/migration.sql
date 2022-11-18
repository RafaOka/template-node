-- DropForeignKey
ALTER TABLE "piuusers" DROP CONSTRAINT "piuusers_idPiu_fkey";

-- DropForeignKey
ALTER TABLE "piuusers" DROP CONSTRAINT "piuusers_idsUsers_fkey";

-- AddForeignKey
ALTER TABLE "piuusers" ADD CONSTRAINT "piuusers_idPiu_fkey" FOREIGN KEY ("idPiu") REFERENCES "pius"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "piuusers" ADD CONSTRAINT "piuusers_idsUsers_fkey" FOREIGN KEY ("idsUsers") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
