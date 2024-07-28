/*
  Warnings:

  - Added the required column `qty` to the `transaction_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction_item` ADD COLUMN `qty` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `wisata` ADD COLUMN `price` VARCHAR(100) NULL;
