-- CreateEnum
CREATE TYPE "PaymentsTermsType" AS ENUM ('ONE_DAY', 'SEVEN_DAY', 'FOURTEEN_DAY', 'THIRTY_DAY');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "bill_from_street_address" TEXT NOT NULL,
    "bill_from_city" TEXT NOT NULL,
    "bill_from_post_code" TEXT NOT NULL,
    "bill_from_country" TEXT NOT NULL,
    "bill_to_customer_name" TEXT NOT NULL,
    "bill_to_customer_email" TEXT NOT NULL,
    "bill_to_street_address" TEXT NOT NULL,
    "bill_to_city" TEXT NOT NULL,
    "bill_to_post_code" TEXT NOT NULL,
    "bill_to_country" TEXT NOT NULL,
    "invoice_date" TIMESTAMP(3) NOT NULL,
    "payments_terms" "PaymentsTermsType" NOT NULL,
    "project_description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_list" (
    "id" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "invoice_id" TEXT,

    CONSTRAINT "item_list_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "item_list" ADD CONSTRAINT "item_list_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
