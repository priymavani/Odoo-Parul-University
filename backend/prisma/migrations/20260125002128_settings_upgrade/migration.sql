/*
  Warnings:

  - You are about to drop the `PaymentSettings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PaymentSettings";

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "cafeName" TEXT NOT NULL DEFAULT 'Odoo Cafe',
    "receiptFooter" TEXT NOT NULL DEFAULT 'Thank you for your visit!',
    "currency" TEXT NOT NULL DEFAULT '₹',
    "cashEnabled" BOOLEAN NOT NULL DEFAULT true,
    "digitalEnabled" BOOLEAN NOT NULL DEFAULT true,
    "upiEnabled" BOOLEAN NOT NULL DEFAULT true,
    "upiId" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);
