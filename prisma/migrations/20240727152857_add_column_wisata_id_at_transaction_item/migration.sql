/*
  Warnings:

  - You are about to drop the column `wisataId` on the `transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_wisataId_fkey`;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `wisataId`;

-- AlterTable
ALTER TABLE `transaction_item` ADD COLUMN `wisataId` VARCHAR(100) NULL;

-- AddForeignKey
ALTER TABLE `transaction_item` ADD CONSTRAINT `transaction_item_wisataId_fkey` FOREIGN KEY (`wisataId`) REFERENCES `wisata`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
