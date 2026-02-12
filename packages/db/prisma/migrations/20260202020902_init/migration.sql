-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "CremationProcessType" AS ENUM ('FAMILY', 'NEIGHBORHOOD', 'COMPANY');

-- CreateEnum
CREATE TYPE "AltarPlaceType" AS ENUM ('HOME', 'FUNERAL_HALL');

-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('DRAFT', 'CONFIRMED');

-- CreateEnum
CREATE TYPE "PaymentTargetType" AS ENUM ('INVOICE', 'FLOWER_TARGET');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PAID', 'CANCELLED');

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "birth_date" DATE,
    "email" VARCHAR(255),
    "tel" VARCHAR(30) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address_cities" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "sort_no" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "address_cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address_towns" (
    "id" BIGSERIAL NOT NULL,
    "city_id" BIGINT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "sort_no" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "address_towns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" BIGSERIAL NOT NULL,
    "reception_no" VARCHAR(30),
    "reception_at" TIMESTAMPTZ(6),
    "deceased_last_name" VARCHAR(50),
    "deceased_first_name" VARCHAR(50),
    "deceased_name" VARCHAR(100) NOT NULL,
    "gender" "Gender",
    "age" INTEGER,
    "religion" VARCHAR(50),
    "chief_mourner_name" VARCHAR(100),
    "chief_mourner_relation" VARCHAR(50),
    "chief_mourner_city_id" BIGINT,
    "chief_mourner_town_id" BIGINT,
    "chief_mourner_address" VARCHAR(255),
    "chief_mourner_tel" VARCHAR(30),
    "payer_name" VARCHAR(100),
    "payer_relation" VARCHAR(50),
    "payer_address" VARCHAR(255),
    "payer_tel" VARCHAR(30),
    "pickup_place" VARCHAR(255),
    "wake_at" TIMESTAMPTZ(6),
    "wake_place" VARCHAR(255),
    "departure_at" TIMESTAMPTZ(6),
    "departure_place" VARCHAR(255),
    "funeral_from" TIMESTAMPTZ(6),
    "funeral_to" TIMESTAMPTZ(6),
    "funeral_place" VARCHAR(255),
    "return_at" TIMESTAMPTZ(6),
    "return_place" VARCHAR(255),
    "notes" TEXT,
    "member_card_note" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_memberships" (
    "id" BIGSERIAL NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "row_no" INTEGER NOT NULL,
    "member_no" VARCHAR(50),
    "joined_at" DATE,
    "member_name" VARCHAR(100),
    "course_units" INTEGER,
    "maturity_amount" INTEGER,
    "payment_times" INTEGER,
    "payment_amount" INTEGER,
    "sales_staff_name" VARCHAR(100),
    "relation_to_deceased" VARCHAR(50),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "customer_memberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_items" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "product_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_variants" (
    "id" BIGSERIAL NOT NULL,
    "product_item_id" BIGINT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "image_url" VARCHAR(500),
    "price_general" INTEGER NOT NULL,
    "price_member" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "product_variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estimates" (
    "id" BIGSERIAL NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "doc_no" VARCHAR(30),
    "status" "DocumentStatus" NOT NULL DEFAULT 'DRAFT',
    "subtotal" INTEGER NOT NULL DEFAULT 0,
    "tax" INTEGER NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL DEFAULT 0,
    "membership_paid_amount" INTEGER NOT NULL DEFAULT 0,
    "grand_total" INTEGER NOT NULL DEFAULT 0,
    "cremation_process_type" "CremationProcessType",
    "altar_place_type" "AltarPlaceType",
    "ceiling_height" VARCHAR(30),
    "estimate_staff" VARCHAR(100),
    "ceremony_staff" VARCHAR(100),
    "transport_staff" VARCHAR(100),
    "decoration_staff" VARCHAR(100),
    "return_staff" VARCHAR(100),
    "issued_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "estimates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estimate_items" (
    "id" BIGSERIAL NOT NULL,
    "estimate_id" BIGINT NOT NULL,
    "product_item_id" BIGINT,
    "product_variant_id" BIGINT,
    "description" VARCHAR(255),
    "unit_price_general" INTEGER NOT NULL DEFAULT 0,
    "unit_price_member" INTEGER NOT NULL DEFAULT 0,
    "qty" INTEGER NOT NULL DEFAULT 0,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "sort_no" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "estimate_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" BIGSERIAL NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "doc_no" VARCHAR(30),
    "status" "DocumentStatus" NOT NULL DEFAULT 'DRAFT',
    "subtotal" INTEGER NOT NULL DEFAULT 0,
    "tax" INTEGER NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL DEFAULT 0,
    "membership_paid_amount" INTEGER NOT NULL DEFAULT 0,
    "grand_total" INTEGER NOT NULL DEFAULT 0,
    "from_estimate_id" BIGINT,
    "cremation_process_type" "CremationProcessType",
    "altar_place_type" "AltarPlaceType",
    "ceiling_height" VARCHAR(30),
    "estimate_staff" VARCHAR(100),
    "ceremony_staff" VARCHAR(100),
    "transport_staff" VARCHAR(100),
    "decoration_staff" VARCHAR(100),
    "return_staff" VARCHAR(100),
    "issued_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_items" (
    "id" BIGSERIAL NOT NULL,
    "invoice_id" BIGINT NOT NULL,
    "product_item_id" BIGINT,
    "product_variant_id" BIGINT,
    "description" VARCHAR(255),
    "unit_price_general" INTEGER NOT NULL DEFAULT 0,
    "unit_price_member" INTEGER NOT NULL DEFAULT 0,
    "qty" INTEGER NOT NULL DEFAULT 0,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "sort_no" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "invoice_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flowers" (
    "id" BIGSERIAL NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "requester_name" VARCHAR(100) NOT NULL,
    "label_name" VARCHAR(100),
    "joint_names" VARCHAR(255),
    "bill_to_name" VARCHAR(100) NOT NULL,
    "bill_to_address" VARCHAR(255) NOT NULL,
    "bill_to_tel" VARCHAR(30),
    "delivery_to" VARCHAR(255),
    "amount" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "flowers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flower_billing_targets" (
    "id" BIGSERIAL NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "bill_to_name" VARCHAR(100) NOT NULL,
    "bill_to_address" VARCHAR(255) NOT NULL,
    "bill_to_tel" VARCHAR(30),
    "bill_to_key" CHAR(64) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "flower_billing_targets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flower_billing_target_items" (
    "id" BIGSERIAL NOT NULL,
    "flower_billing_target_id" BIGINT NOT NULL,
    "flower_id" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "flower_billing_target_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" BIGSERIAL NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "target_type" "PaymentTargetType" NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "paid_at" TIMESTAMPTZ(6) NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "memo" VARCHAR(255),
    "created_by_id" BIGINT,
    "invoice_id" BIGINT,
    "flower_billing_target_id" BIGINT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_profiles" (
    "id" BIGSERIAL NOT NULL,
    "company_name" VARCHAR(200) NOT NULL,
    "company_address" VARCHAR(255) NOT NULL,
    "company_tel" VARCHAR(30) NOT NULL,
    "company_fax" VARCHAR(30),
    "rep_title" VARCHAR(100),
    "rep_name" VARCHAR(100),
    "bank1_name" VARCHAR(100),
    "bank1_branch" VARCHAR(100),
    "bank1_type" VARCHAR(20),
    "bank1_account" VARCHAR(50),
    "bank1_holder" VARCHAR(100),
    "bank2_name" VARCHAR(100),
    "bank2_branch" VARCHAR(100),
    "bank2_type" VARCHAR(20),
    "bank2_account" VARCHAR(50),
    "bank2_holder" VARCHAR(100),
    "bank3_name" VARCHAR(100),
    "bank3_branch" VARCHAR(100),
    "bank3_type" VARCHAR(20),
    "bank3_account" VARCHAR(50),
    "bank3_holder" VARCHAR(100),
    "bank4_name" VARCHAR(100),
    "bank4_branch" VARCHAR(100),
    "bank4_type" VARCHAR(20),
    "bank4_account" VARCHAR(50),
    "bank4_holder" VARCHAR(100),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "company_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_tel_key" ON "users"("tel");

-- CreateIndex
CREATE INDEX "address_towns_city_id_sort_no_idx" ON "address_towns"("city_id", "sort_no");

-- CreateIndex
CREATE UNIQUE INDEX "customers_reception_no_key" ON "customers"("reception_no");

-- CreateIndex
CREATE INDEX "customers_reception_at_idx" ON "customers"("reception_at");

-- CreateIndex
CREATE INDEX "customers_funeral_from_idx" ON "customers"("funeral_from");

-- CreateIndex
CREATE INDEX "customers_deceased_last_name_deceased_first_name_idx" ON "customers"("deceased_last_name", "deceased_first_name");

-- CreateIndex
CREATE INDEX "customers_chief_mourner_city_id_chief_mourner_town_id_idx" ON "customers"("chief_mourner_city_id", "chief_mourner_town_id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_memberships_customer_id_row_no_key" ON "customer_memberships"("customer_id", "row_no");

-- CreateIndex
CREATE UNIQUE INDEX "estimates_doc_no_key" ON "estimates"("doc_no");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_doc_no_key" ON "invoices"("doc_no");

-- CreateIndex
CREATE UNIQUE INDEX "flower_billing_targets_customer_id_bill_to_key_key" ON "flower_billing_targets"("customer_id", "bill_to_key");

-- CreateIndex
CREATE UNIQUE INDEX "flower_billing_target_items_flower_billing_target_id_flower_id_key" ON "flower_billing_target_items"("flower_billing_target_id", "flower_id");

-- CreateIndex
CREATE INDEX "payments_customer_id_idx" ON "payments"("customer_id");

-- CreateIndex
CREATE INDEX "payments_target_type_invoice_id_idx" ON "payments"("target_type", "invoice_id");

-- CreateIndex
CREATE INDEX "payments_target_type_flower_billing_target_id_idx" ON "payments"("target_type", "flower_billing_target_id");

-- CreateIndex
CREATE INDEX "payments_paid_at_idx" ON "payments"("paid_at");

-- CreateIndex
CREATE INDEX "payments_created_at_idx" ON "payments"("created_at");

-- AddForeignKey
ALTER TABLE "address_towns" ADD CONSTRAINT "address_towns_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "address_cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_chief_mourner_city_id_fkey" FOREIGN KEY ("chief_mourner_city_id") REFERENCES "address_cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_chief_mourner_town_id_fkey" FOREIGN KEY ("chief_mourner_town_id") REFERENCES "address_towns"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_memberships" ADD CONSTRAINT "customer_memberships_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "product_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimates" ADD CONSTRAINT "estimates_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate_items" ADD CONSTRAINT "estimate_items_estimate_id_fkey" FOREIGN KEY ("estimate_id") REFERENCES "estimates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate_items" ADD CONSTRAINT "estimate_items_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "product_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estimate_items" ADD CONSTRAINT "estimate_items_product_variant_id_fkey" FOREIGN KEY ("product_variant_id") REFERENCES "product_variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_from_estimate_id_fkey" FOREIGN KEY ("from_estimate_id") REFERENCES "estimates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "product_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_product_variant_id_fkey" FOREIGN KEY ("product_variant_id") REFERENCES "product_variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flowers" ADD CONSTRAINT "flowers_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flower_billing_targets" ADD CONSTRAINT "flower_billing_targets_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flower_billing_target_items" ADD CONSTRAINT "flower_billing_target_items_flower_billing_target_id_fkey" FOREIGN KEY ("flower_billing_target_id") REFERENCES "flower_billing_targets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flower_billing_target_items" ADD CONSTRAINT "flower_billing_target_items_flower_id_fkey" FOREIGN KEY ("flower_id") REFERENCES "flowers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_flower_billing_target_id_fkey" FOREIGN KEY ("flower_billing_target_id") REFERENCES "flower_billing_targets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
