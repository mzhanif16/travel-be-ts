/*
  Warnings:

  - You are about to drop the column `addressId` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `addressId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `addressId`;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `address`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
