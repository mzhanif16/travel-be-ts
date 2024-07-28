/*
  Warnings:

  - You are about to drop the column `addressId` on the `transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_addressId_fkey`;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `addressId`;
