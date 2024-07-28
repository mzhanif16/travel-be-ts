/*
  Warnings:

  - Added the required column `addressId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `addressId` VARCHAR(191) NOT NULL;
