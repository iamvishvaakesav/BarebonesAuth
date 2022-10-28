/*
  Warnings:

  - You are about to drop the column `userId` on the `UserData` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userDataID]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userDataID` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserData" DROP CONSTRAINT "UserData_userId_fkey";

-- DropIndex
DROP INDEX "UserData_userId_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userDataID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserData" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "User_userDataID_key" ON "User"("userDataID");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userDataID_fkey" FOREIGN KEY ("userDataID") REFERENCES "UserData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
