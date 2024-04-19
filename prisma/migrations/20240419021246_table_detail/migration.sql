-- CreateTable
CREATE TABLE `detail_users` (
    `id` VARCHAR(191) NOT NULL,
    `berat_badan` INTEGER NOT NULL,
    `tinggi_badan` INTEGER NOT NULL,
    `cuaca` VARCHAR(191) NOT NULL,
    `kebutuhanAir` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `detail_users_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `detail_users` ADD CONSTRAINT `detail_users_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
