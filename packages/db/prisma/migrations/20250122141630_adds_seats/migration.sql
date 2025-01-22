/*
  Warnings:

  - You are about to drop the column `event` on the `SeatType` table. All the data in the column will be lost.
  - Added the required column `eventId` to the `SeatType` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `price` on the `SeatType` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "SeatType" DROP COLUMN "event",
ADD COLUMN     "eventId" TEXT NOT NULL,
ADD COLUMN     "filled" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "locked" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SeatType" ADD CONSTRAINT "SeatType_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
