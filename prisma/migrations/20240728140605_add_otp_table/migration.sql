-- CreateTable
CREATE TABLE `otp` (
    `id` VARCHAR(100) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `otp` VARCHAR(6) NOT NULL,
    `created_at` VARCHAR(100) NOT NULL DEFAULT '',
    `updated_at` VARCHAR(100) NOT NULL DEFAULT '',

    UNIQUE INDEX `otp_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `otp` ADD CONSTRAINT `otp_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
