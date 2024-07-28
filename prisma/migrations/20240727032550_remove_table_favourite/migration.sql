/*
  Warnings:

  - You are about to drop the column `favouriteId` on the `wisata` table. All the data in the column will be lost.
  - You are about to drop the `favourite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `wisata` DROP FOREIGN KEY `wisata_favouriteId_fkey`;

-- AlterTable
ALTER TABLE `wisata` DROP COLUMN `favouriteId`,
    ADD COLUMN `is_favourite` BOOLEAN NULL DEFAULT false;

-- DropTable
DROP TABLE `favourite`;
