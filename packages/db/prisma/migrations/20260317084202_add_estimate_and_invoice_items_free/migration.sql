-- CreateTable
CREATE TABLE "estimate_items_free" (
    "id" BIGSERIAL NOT NULL,
    "estimate_item_id" BIGINT NOT NULL,
    "product_item_name" VARCHAR(255),
    "description" VARCHAR(255),
    "unit_price_general" INTEGER NOT NULL DEFAULT 0,
    "qty" INTEGER NOT NULL DEFAULT 0,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "sort_no" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "estimate_items_free_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_items_free" (
    "id" BIGSERIAL NOT NULL,
    "invoice_item_id" BIGINT NOT NULL,
    "product_item_name" VARCHAR(255),
    "description" VARCHAR(255),
    "unit_price_general" INTEGER NOT NULL DEFAULT 0,
    "qty" INTEGER NOT NULL DEFAULT 0,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "sort_no" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "invoice_items_free_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "estimate_items_free" ADD CONSTRAINT "estimate_items_free_estimate_item_id_fkey" FOREIGN KEY ("estimate_item_id") REFERENCES "estimate_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_items_free" ADD CONSTRAINT "invoice_items_free_invoice_item_id_fkey" FOREIGN KEY ("invoice_item_id") REFERENCES "invoice_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
