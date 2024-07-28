-- AlterTable
ALTER TABLE `address` MODIFY `created_at` VARCHAR(100) NOT NULL DEFAULT '',
    MODIFY `updated_at` VARCHAR(100) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `transaction` MODIFY `created_at` VARCHAR(100) NOT NULL DEFAULT '',
    MODIFY `updated_at` VARCHAR(100) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `transaction_item` MODIFY `created_at` VARCHAR(100) NOT NULL DEFAULT '',
    MODIFY `updated_at` VARCHAR(100) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `user` MODIFY `created_at` VARCHAR(100) NOT NULL DEFAULT '',
    MODIFY `updated_at` VARCHAR(100) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `wisata` MODIFY `created_at` VARCHAR(100) NOT NULL DEFAULT '',
    MODIFY `updated_at` VARCHAR(100) NOT NULL DEFAULT '';
