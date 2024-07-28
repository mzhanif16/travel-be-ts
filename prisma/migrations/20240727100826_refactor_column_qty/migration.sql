/*
  Warnings:

  - You are about to alter the column `qty` on the `transaction_item` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Int`.

*/
-- AlterTable
ALTER TABLE `transaction_item` MODIFY `qty` INTEGER NOT NULL;
