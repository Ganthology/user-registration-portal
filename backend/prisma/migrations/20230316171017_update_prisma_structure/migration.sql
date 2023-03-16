/*
  Warnings:

  - You are about to drop the column `approved` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('APPROVED', 'REJECTED', 'PENDING');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "approved",
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "fullName" DROP NOT NULL,
ALTER COLUMN "age" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "employment" DROP NOT NULL,
ALTER COLUMN "job" DROP NOT NULL,
ALTER COLUMN "imageFront" DROP NOT NULL,
ALTER COLUMN "imageBack" DROP NOT NULL,
ALTER COLUMN "imageType" DROP NOT NULL;

-- DropTable
DROP TABLE "Admin";
