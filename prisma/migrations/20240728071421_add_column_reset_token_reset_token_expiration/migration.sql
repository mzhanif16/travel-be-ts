-- AlterTable
ALTER TABLE `user` ADD COLUMN `resetToken` VARCHAR(100) NULL,
    ADD COLUMN `resetTokenExpiration` DATETIME(3) NULL;
