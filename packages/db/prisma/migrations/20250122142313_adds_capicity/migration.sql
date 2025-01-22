/*
  Warnings:

  - Added the required column `capacity` to the `SeatType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SeatType" ADD COLUMN     "capacity" INTEGER NOT NULL;
