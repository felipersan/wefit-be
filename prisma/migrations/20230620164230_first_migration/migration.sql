/*
  Warnings:

  - You are about to drop the `Form` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Form`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cnpj` VARCHAR(191) NULL,
    `cpf` VARCHAR(191) NULL,
    `responsiblePersonCpf` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `cellPhone` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_cnpj_key`(`cnpj`),
    UNIQUE INDEX `User_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Adress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postalCode` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `houseNumber` INTEGER NOT NULL,
    `complement` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Adress_id_key`(`id`),
    UNIQUE INDEX `Adress_userId_key`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Adress` ADD CONSTRAINT `Adress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
