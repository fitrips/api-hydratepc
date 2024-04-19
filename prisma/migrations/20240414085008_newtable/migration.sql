-- CreateTable
CREATE TABLE `artikel` (
    `id` VARCHAR(191) NOT NULL,
    `judul` VARCHAR(100) NOT NULL,
    `poin` VARCHAR(100) NOT NULL,
    `konten` VARCHAR(150) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `artikel_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
