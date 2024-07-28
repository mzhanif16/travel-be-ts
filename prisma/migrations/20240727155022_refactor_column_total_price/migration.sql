/*
  Warnings:

  - You are about to drop the column `total_price` on the `transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `total_price`;

-- AlterTable
ALTER TABLE `transaction_item` ADD COLUMN `total_price` INTEGER NULL;
