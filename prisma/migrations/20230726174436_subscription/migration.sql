/*
  Warnings:

  - Added the required column `subscriptionId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "subscriptionId" TEXT NOT NULL;