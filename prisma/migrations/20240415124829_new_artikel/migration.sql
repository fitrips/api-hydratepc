/*
  Warnings:

  - Added the required column `image_url` to the `artikel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `artikel` ADD COLUMN `image_url` VARCHAR(255) NOT NULL;
