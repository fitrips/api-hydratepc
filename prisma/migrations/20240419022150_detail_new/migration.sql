/*
  Warnings:

  - You are about to drop the column `tinggi_badan` on the `detail_users` table. All the data in the column will be lost.
  - Added the required column `jenis_kelamin` to the `detail_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `detail_users` DROP COLUMN `tinggi_badan`,
    ADD COLUMN `jenis_kelamin` VARCHAR(191) NOT NULL;
