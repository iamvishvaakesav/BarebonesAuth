-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userDataID_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userDataID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userDataID_fkey" FOREIGN KEY ("userDataID") REFERENCES "UserData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
