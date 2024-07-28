/*
  Warnings:

  - You are about to drop the column `category_id` on the `wisata` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `wisata` DROP FOREIGN KEY `wisata_category_id_fkey`;

-- AlterTable
ALTER TABLE `wisata` DROP COLUMN `category_id`,
    ADD COLUMN `category` VARCHAR(100) NULL;

-- DropTable
DROP TABLE `category`;
