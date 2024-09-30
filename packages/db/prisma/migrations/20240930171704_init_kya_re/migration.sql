/*
  Warnings:

  - Changed the type of `method` on the `OnRampTransaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Method" AS ENUM ('Recieved', 'Sent');

-- AlterTable
ALTER TABLE "OnRampTransaction" DROP COLUMN "method",
ADD COLUMN     "method" "Method" NOT NULL;

-- DropEnum
DROP TYPE "Methon";
