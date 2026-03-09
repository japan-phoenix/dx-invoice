-- ======================================
-- RESET SQL
-- ======================================

TRUNCATE TABLE product_items CASCADE;
ALTER SEQUENCE product_items_id_seq RESTART WITH 1;
TRUNCATE TABLE product_variants CASCADE;
ALTER SEQUENCE product_variants_id_seq RESTART WITH 1;

-- ======================================
-- product_items INSERT
-- ======================================

INSERT INTO public.product_items (name, is_active, created_at, updated_at) VALUES
('祭壇', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('棺', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('納棺用品一式', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('骨壺', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('寝台車', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('霊柩車', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('外装飾設備', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('受付設備', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('司会', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('葬具小物一式', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('あと飾り祭壇', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('御霊前セット', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('写真', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ドライアイス', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('脱臭剤', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('会葬礼状', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('御供養', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('果物・お酒・線香', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('造花額', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('別れ花', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('灯籠・蓮華', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('霊名彫り', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('式場飾り', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('生花', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ホール管理費', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('控室管理費', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('湯灌・メイク', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('司会アシスタント', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('重箱', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('料理', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('満期サービス', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- ======================================
-- product_variants INSERT
-- ======================================

INSERT INTO public.product_variants
(product_item_id, "name", image_url, price_general, price_member, is_active, created_at, updated_at)
VALUES
((SELECT id FROM public.product_items WHERE name = '祭壇'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '祭壇'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '棺'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '棺'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '納棺用品一式'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '納棺用品一式'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '骨壺'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '骨壺'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '寝台車'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '寝台車'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '霊柩車'), '宮型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '霊柩車'), 'バン型', NULL, 70000, 55000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '霊柩車'), 'バス型', NULL, 100000, 80000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '霊柩車'), 'リムジン型', NULL, 150000, 120000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '外装飾設備'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '外装飾設備'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '受付設備'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '受付設備'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '司会'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '司会'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '葬具小物一式'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '葬具小物一式'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = 'あと飾り祭壇'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = 'あと飾り祭壇'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '御霊前セット'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '御霊前セット'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '写真'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '写真'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = 'ドライアイス'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = 'ドライアイス'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '脱臭剤'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '脱臭剤'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '会葬礼状'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '会葬礼状'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '御供養'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '御供養'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '果物・お酒・線香'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '果物・お酒・線香'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '造花額'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '造花額'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '別れ花'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '別れ花'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '灯籠・蓮華'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '灯籠・蓮華'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '霊名彫り'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '霊名彫り'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '式場飾り'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '式場飾り'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '生花'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '生花'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = 'ホール管理費'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = 'ホール管理費'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '控室管理費'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '控室管理費'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '湯灌・メイク'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '湯灌・メイク'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '司会アシスタント'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '司会アシスタント'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '重箱'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '重箱'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '料理'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '料理'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '満期サービス'), '基本型', NULL, 25000, 15000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
((SELECT id FROM public.product_items WHERE name = '満期サービス'), '上級型', NULL, 50000, 30000, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);