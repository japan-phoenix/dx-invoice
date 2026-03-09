-- ======================================
-- RESET SQL
-- ======================================

TRUNCATE TABLE address_cities CASCADE;
ALTER SEQUENCE address_cities_id_seq RESTART WITH 1;
TRUNCATE TABLE address_towns CASCADE;
ALTER SEQUENCE address_towns_id_seq RESTART WITH 1;

-- ======================================
-- address_cities INSERT
-- ======================================

INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('那覇市', 1, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('宜野湾市', 2, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('石垣市', 3, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('浦添市', 4, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('名護市', 5, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('糸満市', 6, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('沖縄市', 7, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('豊見城市', 8, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('うるま市', 9, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('宮古島市', 10, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('南城市', 11, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('国頭郡　国頭村', 12, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('国頭郡　大宜味村', 13, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('国頭郡　東村', 14, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('国頭郡　今帰仁村', 15, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('国頭郡　本部町', 16, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('国頭郡　恩納村', 17, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('国頭郡　宜野座村', 18, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('国頭郡　金武町', 19, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('国頭郡　伊江村', 20, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('中頭郡　読谷村', 21, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('中頭郡　嘉手納町', 22, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('中頭郡　北谷町', 23, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('中頭郡　北中城村', 24, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('中頭郡　中城村', 25, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('中頭郡　西原町', 26, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('島尻郡　与那原町', 27, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('島尻郡　南風原町', 28, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('島尻郡　渡嘉敷村', 29, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('島尻郡　座間味村', 30, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('島尻郡　粟国村', 31, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('島尻郡　渡名喜村', 32, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('島尻郡　南大東村', 33, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('島尻郡　北大東村', 34, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('島尻郡　伊平屋村', 35, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('島尻郡　伊是名村', 36, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('島尻郡　久米島町', 37, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('島尻郡　八重瀬町', 38, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('宮古郡　多良間村', 39, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('八重山郡　竹富町', 40, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.address_cities (name, sort_no, is_active, created_at, updated_at)
VALUES ('八重山郡　与那国町', 41, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- ======================================
-- address_towns INSERT
-- ======================================

INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '赤嶺',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '曙',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '安里',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '旭町',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '安次嶺',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '安謝',
  6,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '天久',
  7,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '泉崎',
  8,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '上之屋',
  9,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '宇栄原',
  10,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '上間',
  11,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '奥武山町',
  12,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '大嶺',
  13,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  'おもろまち',
  14,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '小禄',
  15,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '鏡水',
  16,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '垣花町',
  17,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '金城',
  18,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '鏡原町',
  19,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '具志',
  20,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '久米',
  21,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '久茂地',
  22,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '国場',
  23,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '古波蔵',
  24,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '識名',
  25,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '首里　赤田町',
  26,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '首里　赤平町',
  27,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '首里　池端町',
  28,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '首里　石嶺町',
  29,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '首里　大中町',
  30,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '首里　大名町',
  31,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '首里　金城町',
  32,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '首里　儀保町',
  33,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '首里　久場川町',
  34,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '首里　崎山町',
  35,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '首里　寒川町',
  36,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '首里　末吉町',
  37,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '首里　平良町',
  38,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '首里　汀良町',
  39,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '首里　当蔵町',
  40,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '首里　桃原町',
  41,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '首里　鳥堀町',
  42,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '首里　真和志町',
  43,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '首里　山川町',
  44,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '住吉町',
  45,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '楚辺',
  46,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '大道',
  47,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '高良',
  48,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '田原',
  49,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '辻',
  50,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '壺川',
  51,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '壺屋',
  52,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '当間',
  53,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '泊',
  54,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '通堂町',
  55,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '仲井真',
  56,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '長田',
  57,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '西',
  58,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '繁多川',
  59,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '東町',
  60,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '樋川',
  61,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '古島',
  62,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '真地',
  63,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '前島',
  64,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '真嘉比',
  65,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '牧志',
  66,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '松尾',
  67,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '松川',
  68,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '松島',
  69,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '松山',
  70,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '港町',
  71,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '三原',
  72,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '宮城',
  73,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '銘苅',
  74,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '山下町',
  75,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '与儀',
  76,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '寄宮',
  77,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '那覇市'),
  '若狭',
  78,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宜野湾市'),
  '愛知',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宜野湾市'),
  '赤道',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宜野湾市'),
  '新城',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宜野湾市'),
  '伊佐',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宜野湾市'),
  '上原',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宜野湾市'),
  '宇地泊',
  6,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宜野湾市'),
  '大謝名',
  7,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宜野湾市'),
  '大山',
  8,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宜野湾市'),
  '嘉数',
  9,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宜野湾市'),
  '我如古',
  10,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宜野湾市'),
  '神山',
  11,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宜野湾市'),
  '宜野湾',
  12,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宜野湾市'),
  '喜友名',
  13,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宜野湾市'),
  '佐真下',
  14,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宜野湾市'),
  '志真志',
  15,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宜野湾市'),
  '長田',
  16,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宜野湾市'),
  '野嵩',
  17,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宜野湾市'),
  '普天間',
  18,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宜野湾市'),
  '真栄原',
  19,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宜野湾市'),
  '真志喜',
  20,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '石垣市'),
  '新川',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '石垣市'),
  '石垣',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '石垣市'),
  '伊原間',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '石垣市'),
  '大川',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '石垣市'),
  '大浜',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '石垣市'),
  '川平',
  6,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '石垣市'),
  '崎枝',
  7,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '石垣市'),
  '白保',
  8,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '石垣市'),
  '新栄町',
  9,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '石垣市'),
  '桃里',
  10,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '石垣市'),
  '登野城',
  11,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '石垣市'),
  '登野城尖閣',
  12,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '石垣市'),
  '名蔵',
  13,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '石垣市'),
  '野底',
  14,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '石垣市'),
  '南ぬ浜町',
  15,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '石垣市'),
  '浜崎町',
  16,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '石垣市'),
  '平得',
  17,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '石垣市'),
  '平久保',
  18,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '石垣市'),
  '桴海',
  19,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '石垣市'),
  '真栄里',
  20,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '石垣市'),
  '美崎町',
  21,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '石垣市'),
  '宮良',
  22,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '石垣市'),
  '盛山',
  23,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '石垣市'),
  '八島町',
  24,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '浦添市'),
  '安波茶',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '浦添市'),
  '伊祖',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '浦添市'),
  '伊奈武瀬',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '浦添市'),
  '西洲',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '浦添市'),
  '内間',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '浦添市'),
  '大平',
  6,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '浦添市'),
  '経塚',
  7,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '浦添市'),
  '城間',
  8,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '浦添市'),
  '小湾',
  9,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '浦添市'),
  '勢理客',
  10,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '浦添市'),
  '沢岻',
  11,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '浦添市'),
  '当山',
  12,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '浦添市'),
  '仲間',
  13,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '浦添市'),
  '仲西',
  14,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '浦添市'),
  '西原',
  15,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '浦添市'),
  '前田',
  16,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '浦添市'),
  '牧港',
  17,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '浦添市'),
  '港川',
  18,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '浦添市'),
  '宮城',
  19,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '浦添市'),
  '屋富祖',
  20,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '東江',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '旭川',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '安部',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '安和',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '伊差川',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '稲嶺',
  6,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '宇茂佐',
  7,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '宇茂佐の森',
  8,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '運天原',
  9,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '大浦',
  10,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '大川',
  11,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '大北',
  12,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '大中',
  13,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '大西',
  14,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '大東',
  15,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '大南',
  16,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '親川',
  17,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '勝山',
  18,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '我部',
  19,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '我部祖河',
  20,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '嘉陽',
  21,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '川上',
  22,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '喜瀬',
  23,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '許田',
  24,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '久志',
  25,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '城',
  26,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '源河',
  27,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '幸喜',
  28,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '呉我',
  29,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '古我知',
  30,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '数久田',
  31,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '済井出',
  32,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '瀬嵩',
  33,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '田井等',
  34,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '汀間',
  35,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '天仁屋',
  36,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '豊原',
  37,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '仲尾',
  38,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '仲尾次',
  39,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '中山',
  40,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '名護',
  41,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '為又',
  42,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '二見',
  43,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '振慶名',
  44,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '辺野古',
  45,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '真喜屋',
  46,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '港',
  47,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '三原',
  48,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '宮里',
  49,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '屋我',
  50,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '屋部',
  51,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '山入端',
  52,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '世冨慶',
  53,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '名護市'),
  '饒平名',
  54,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '阿波根',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '新垣',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '伊敷',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '糸洲',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '糸満',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '伊原',
  6,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '宇江城',
  7,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '大里',
  8,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '大度',
  9,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '賀数',
  10,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '兼城',
  11,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '北波平',
  12,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '喜屋武',
  13,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '国吉',
  14,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '小波蔵',
  15,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '米須',
  16,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '座波',
  17,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '潮崎町',
  18,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '潮平',
  19,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '武富',
  20,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '束里',
  21,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '照屋',
  22,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '豊原',
  23,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '名城',
  24,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '西川町',
  25,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '西崎',
  26,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '西崎町',
  27,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '福地',
  28,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '真栄里',
  29,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '真栄平',
  30,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '真壁',
  31,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '摩文仁',
  32,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '南波平',
  33,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '山城',
  34,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '糸満市'),
  '与座',
  35,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '明道',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '安慶田',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '泡瀬',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '池原',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '上地',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '大里',
  6,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '海邦',
  7,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '海邦町',
  8,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '嘉間良',
  9,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '久保田',
  10,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '倉敷',
  11,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '古謝',
  12,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '古謝津嘉山町',
  13,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '越来',
  14,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '胡屋',
  15,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '潮乃森',
  16,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '白川',
  17,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '城前町',
  18,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '住吉',
  19,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '園田',
  20,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '高原',
  21,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '知花',
  22,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '中央',
  23,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '照屋',
  24,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '桃原',
  25,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '仲宗根町',
  26,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '登川',
  27,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '東',
  28,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '比屋根',
  29,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '松本',
  30,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '美里',
  31,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '美里仲原町',
  32,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '南桃原',
  33,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '美原',
  34,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '宮里',
  35,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '室川',
  36,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '諸見里',
  37,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '八重島',
  38,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '山内',
  39,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '山里',
  40,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '沖縄市'),
  '与儀',
  41,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '豊見城市'),
  '伊良波',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '豊見城市'),
  '上田',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '豊見城市'),
  '翁長',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '豊見城市'),
  '嘉数',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '豊見城市'),
  '我那覇',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '豊見城市'),
  '金良',
  6,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '豊見城市'),
  '宜保',
  7,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '豊見城市'),
  '座安',
  8,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '豊見城市'),
  '瀬長',
  9,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '豊見城市'),
  '平良',
  10,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '豊見城市'),
  '高嶺',
  11,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '豊見城市'),
  '高安',
  12,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '豊見城市'),
  '田頭',
  13,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '豊見城市'),
  '渡嘉敷',
  14,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '豊見城市'),
  '渡橋名',
  15,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '豊見城市'),
  '豊見城',
  16,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '豊見城市'),
  '豊崎',
  17,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '豊見城市'),
  '名嘉地',
  18,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '豊見城市'),
  '長堂',
  19,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '豊見城市'),
  '根差部',
  20,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '豊見城市'),
  '饒波',
  21,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '豊見城市'),
  '保栄茂',
  22,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '豊見城市'),
  '真玉橋',
  23,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '豊見城市'),
  '与根',
  24,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '赤野',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '赤道',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '安慶名',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '石川',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '石川　赤崎',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '石川　東山',
  6,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '石川　東山本町',
  7,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '石川　曙',
  8,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '石川　石崎',
  9,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '石川　伊波',
  10,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '石川　嘉手苅',
  11,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '石川　白浜',
  12,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '石川　楚南',
  13,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '石川　東恩納',
  14,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '石川　東恩納崎',
  15,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '石川　山城',
  16,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '西原',
  17,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '上江洲',
  18,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '宇堅',
  19,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '江洲',
  20,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '栄野比',
  21,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '大田',
  22,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '勝連　内間',
  23,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '勝連　津堅',
  24,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '勝連　南風原',
  25,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '勝連　浜',
  26,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '勝連　比嘉',
  27,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '勝連　平敷屋',
  28,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '勝連　平安名',
  29,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '兼箇段',
  30,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '川崎',
  31,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '川田',
  32,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '喜仲',
  33,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '喜屋武',
  34,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '具志川',
  35,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '昆布',
  36,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '塩屋',
  37,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '州崎',
  38,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '平良川',
  39,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '高江洲',
  40,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '田場',
  41,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '天願',
  42,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '豊原',
  43,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '仲嶺',
  44,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '前原',
  45,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  'みどり町',
  46,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '宮里',
  47,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '与那城',
  48,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '与那城　安勢理',
  49,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '与那城　伊計',
  50,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '与那城　池味',
  51,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '与那城　上原',
  52,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '与那城　中央',
  53,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '与那城　照間',
  54,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '与那城　桃原',
  55,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '与那城　西原',
  56,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '与那城　饒辺',
  57,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '与那城　平宮',
  58,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '与那城　平安座',
  59,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '与那城　宮城',
  60,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '与那城　屋慶名',
  61,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = 'うるま市'),
  '与那城　屋平',
  62,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '伊良部　池間添',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '伊良部　伊良部',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '伊良部　国仲',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '伊良部　佐和田',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '伊良部　仲地',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '伊良部　長浜',
  6,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '伊良部　前里添',
  7,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '上野　上野',
  8,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '上野　新里',
  9,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '上野　野原',
  10,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '上野　宮国',
  11,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '城辺　新城',
  12,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '城辺　砂川',
  13,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '城辺　下里添',
  14,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '城辺　友利',
  15,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '城辺　長間',
  16,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '城辺　西里添',
  17,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '城辺　比嘉',
  18,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '城辺　福里',
  19,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '城辺　保良',
  20,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '下地　上地',
  21,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '下地　嘉手苅',
  22,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '下地　川満',
  23,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '下地　来間',
  24,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '下地　洲鎌',
  25,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '下地　与那覇',
  26,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '平良　池間',
  27,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '平良　大浦',
  28,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '平良　大神',
  29,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '平良　狩俣',
  30,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '平良　久貝',
  31,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '平良　島尻',
  32,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '平良　下里',
  33,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '平良　荷川取',
  34,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '平良　西里',
  35,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '平良　西仲宗根',
  36,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '平良　西原',
  37,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '平良　東仲宗根',
  38,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '平良　東仲宗根添',
  39,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '平良　前里',
  40,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古島市'),
  '平良　松原',
  41,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '大里　稲嶺',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '大里　大里',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '大里　大城',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '大里　平良',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '大里　高平',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '大里　仲間',
  6,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '大里　古堅',
  7,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '大里　嶺井',
  8,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '佐敷　伊原',
  9,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '佐敷　小谷',
  10,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '佐敷　兼久',
  11,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '佐敷　佐敷',
  12,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '佐敷　新開',
  13,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '佐敷　新里',
  14,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '佐敷　津波古',
  15,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '佐敷　手登根',
  16,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '佐敷　仲伊保',
  17,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '佐敷　冨祖崎',
  18,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '佐敷　屋比久',
  19,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '玉城　愛地',
  20,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '玉城　糸数',
  21,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '玉城　奥武',
  22,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '玉城　親慶原',
  23,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '玉城　垣花',
  24,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '玉城　喜良原',
  25,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '玉城　志堅原',
  26,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '玉城　玉城',
  27,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '玉城　當山',
  28,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '玉城　中山',
  29,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '玉城　仲村渠',
  30,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '玉城　百名',
  31,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '玉城　富里',
  32,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '玉城　船越',
  33,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '玉城　堀川',
  34,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '玉城　前川',
  35,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '玉城　屋嘉部',
  36,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '知念　安座真',
  37,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '知念　海野',
  38,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '知念　具志堅',
  39,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '知念　久高',
  40,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '知念　久手堅',
  41,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '知念　久原',
  42,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '知念　志喜屋',
  43,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '知念　知名',
  44,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '知念　知念',
  45,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '知念　山里',
  46,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  '知念　吉富',
  47,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '南城市'),
  'つきしろ',
  48,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　国頭村'),
  '安田',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　国頭村'),
  '安波',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　国頭村'),
  '伊地',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　国頭村'),
  '宇嘉',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　国頭村'),
  '宇良',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　国頭村'),
  '奥',
  6,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　国頭村'),
  '奥間',
  7,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　国頭村'),
  '鏡地',
  8,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　国頭村'),
  '宜名真',
  9,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　国頭村'),
  '佐手',
  10,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　国頭村'),
  '謝敷',
  11,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　国頭村'),
  '楚洲',
  12,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　国頭村'),
  '桃原',
  13,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　国頭村'),
  '浜',
  14,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　国頭村'),
  '半地',
  15,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　国頭村'),
  '比地',
  16,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　国頭村'),
  '辺戸',
  17,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　国頭村'),
  '辺野喜',
  18,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　国頭村'),
  '辺土名',
  19,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　国頭村'),
  '与那',
  20,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　大宜味村'),
  '上原',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　大宜味村'),
  '江洲',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　大宜味村'),
  '大兼久',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　大宜味村'),
  '大宜味',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　大宜味村'),
  '押川',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　大宜味村'),
  '喜如嘉',
  6,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　大宜味村'),
  '塩屋',
  7,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　大宜味村'),
  '謝名城',
  8,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　大宜味村'),
  '白浜',
  9,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　大宜味村'),
  '大保',
  10,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　大宜味村'),
  '田嘉里',
  11,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　大宜味村'),
  '田港',
  12,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　大宜味村'),
  '津波',
  13,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　大宜味村'),
  '饒波',
  14,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　大宜味村'),
  '根路銘',
  15,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　大宜味村'),
  '宮城',
  16,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　大宜味村'),
  '屋古',
  17,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　東村'),
  '有銘',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　東村'),
  '川田',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　東村'),
  '慶佐次',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　東村'),
  '平良',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　東村'),
  '高江',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　東村'),
  '宮城',
  6,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　今帰仁村'),
  '天底',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　今帰仁村'),
  '今泊',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　今帰仁村'),
  '運天',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　今帰仁村'),
  '兼次',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　今帰仁村'),
  '上運天',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　今帰仁村'),
  '古宇利',
  6,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　今帰仁村'),
  '越地',
  7,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　今帰仁村'),
  '呉我山',
  8,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　今帰仁村'),
  '崎山',
  9,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　今帰仁村'),
  '謝名',
  10,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　今帰仁村'),
  '諸志',
  11,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　今帰仁村'),
  '勢理客',
  12,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　今帰仁村'),
  '玉城',
  13,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　今帰仁村'),
  '渡喜仁',
  14,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　今帰仁村'),
  '仲尾次',
  15,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　今帰仁村'),
  '仲宗根',
  16,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　今帰仁村'),
  '平敷',
  17,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　今帰仁村'),
  '与那嶺',
  18,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　今帰仁村'),
  '湧川',
  19,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　本部町'),
  '石川',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　本部町'),
  '伊豆味',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　本部町'),
  '伊野波',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　本部町'),
  '大堂',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　本部町'),
  '浦崎',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　本部町'),
  '大嘉陽',
  6,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　本部町'),
  '大浜',
  7,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　本部町'),
  '嘉津宇',
  8,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　本部町'),
  '北里',
  9,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　本部町'),
  '具志堅',
  10,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　本部町'),
  '健堅',
  11,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　本部町'),
  '崎本部',
  12,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　本部町'),
  '謝花',
  13,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　本部町'),
  '新里',
  14,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　本部町'),
  '瀬底',
  15,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　本部町'),
  '谷茶',
  16,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　本部町'),
  '渡久地',
  17,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　本部町'),
  '豊原',
  18,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　本部町'),
  '並里',
  19,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　本部町'),
  '野原',
  20,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　本部町'),
  '浜元',
  21,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　本部町'),
  '東',
  22,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　本部町'),
  '備瀬',
  23,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　本部町'),
  '古島',
  24,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　本部町'),
  '辺名地',
  25,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　本部町'),
  '山川',
  26,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　本部町'),
  '山里',
  27,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　恩納村'),
  '安富祖',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　恩納村'),
  '恩納',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　恩納村'),
  '喜瀬武原',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　恩納村'),
  '瀬良垣',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　恩納村'),
  '谷茶',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　恩納村'),
  '仲泊',
  6,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　恩納村'),
  '名嘉真',
  7,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　恩納村'),
  '冨着',
  8,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　恩納村'),
  '前兼久',
  9,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　恩納村'),
  '真栄田',
  10,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　恩納村'),
  '山田',
  11,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　宜野座村'),
  '漢那',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　宜野座村'),
  '宜野座',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　宜野座村'),
  '惣慶',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　宜野座村'),
  '松田',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　金武町'),
  '伊芸',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　金武町'),
  '金武',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　金武町'),
  '屋嘉',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　伊江村'),
  '川平',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　伊江村'),
  '西江上',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　伊江村'),
  '西江前',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　伊江村'),
  '東江上',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '国頭郡　伊江村'),
  '東江前',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　読谷村'),
  '伊良皆',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　読谷村'),
  '上地',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　読谷村'),
  '宇座',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　読谷村'),
  '大木',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　読谷村'),
  '大湾',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　読谷村'),
  '喜名',
  6,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　読谷村'),
  '儀間',
  7,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　読谷村'),
  '座喜味',
  8,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　読谷村'),
  '瀬名波',
  9,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　読谷村'),
  '楚辺',
  10,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　読谷村'),
  '高志保',
  11,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　読谷村'),
  '渡具知',
  12,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　読谷村'),
  '渡慶次',
  13,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　読谷村'),
  '都屋',
  14,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　読谷村'),
  '長浜',
  15,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　読谷村'),
  '波平',
  16,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　読谷村'),
  '比謝',
  17,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　読谷村'),
  '比謝矼',
  18,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　読谷村'),
  '古堅',
  19,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　嘉手納町'),
  '嘉手納',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　嘉手納町'),
  '兼久',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　嘉手納町'),
  '久得',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　嘉手納町'),
  '水釜',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　嘉手納町'),
  '屋良',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北谷町'),
  '伊平',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北谷町'),
  '大村',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北谷町'),
  '上勢頭',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北谷町'),
  '北前',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北谷町'),
  '桑江',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北谷町'),
  '砂辺',
  6,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北谷町'),
  '玉上',
  7,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北谷町'),
  '北谷',
  8,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北谷町'),
  '桃原',
  9,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北谷町'),
  '浜川',
  10,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北谷町'),
  '港',
  11,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北谷町'),
  '美浜',
  12,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北谷町'),
  '宮城',
  13,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北谷町'),
  '吉原',
  14,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北中城村'),
  '安谷屋',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北中城村'),
  '熱田',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北中城村'),
  '大城',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北中城村'),
  '荻道',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北中城村'),
  '喜舎場',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北中城村'),
  '島袋',
  6,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北中城村'),
  '瑞慶覧',
  7,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北中城村'),
  '仲順',
  8,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北中城村'),
  '渡口',
  9,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北中城村'),
  '比嘉',
  10,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北中城村'),
  '美崎',
  11,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北中城村'),
  '屋宜原',
  12,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北中城村'),
  'ライカム',
  13,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　北中城村'),
  '和仁屋',
  14,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　中城村'),
  '安里',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　中城村'),
  '新垣',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　中城村'),
  '伊舎堂',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　中城村'),
  '伊集',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　中城村'),
  '奥間',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　中城村'),
  '北上原',
  6,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　中城村'),
  '北浜',
  7,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　中城村'),
  '久場',
  8,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　中城村'),
  '添石',
  9,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　中城村'),
  '津覇',
  10,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　中城村'),
  '当間',
  11,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　中城村'),
  '泊',
  12,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　中城村'),
  '登又',
  13,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　中城村'),
  '浜',
  14,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　中城村'),
  '南上原',
  15,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　中城村'),
  '南浜',
  16,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　中城村'),
  '屋宜',
  17,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　中城村'),
  '和宇慶',
  18,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　西原町'),
  '東崎',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　西原町'),
  '安室',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　西原町'),
  '池田',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　西原町'),
  '上原',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　西原町'),
  '内間',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　西原町'),
  '翁長',
  6,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　西原町'),
  '小那覇',
  7,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　西原町'),
  '掛保久',
  8,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　西原町'),
  '我謝',
  9,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　西原町'),
  '嘉手苅',
  10,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　西原町'),
  '兼久',
  11,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　西原町'),
  '幸地',
  12,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　西原町'),
  '小橋川',
  13,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　西原町'),
  '小波津',
  14,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　西原町'),
  '呉屋',
  15,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　西原町'),
  '千原',
  16,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　西原町'),
  '棚原',
  17,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　西原町'),
  '津花波',
  18,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　西原町'),
  '桃原',
  19,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　西原町'),
  '徳佐田',
  20,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　西原町'),
  '森川',
  21,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '中頭郡　西原町'),
  '与那城',
  22,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　与那原町'),
  '東浜',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　与那原町'),
  '板良敷',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　与那原町'),
  '上与那原',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　与那原町'),
  '与那原',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　南風原町'),
  '新川',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　南風原町'),
  '大名',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　南風原町'),
  '兼城',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　南風原町'),
  '神里',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　南風原町'),
  '喜屋武',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　南風原町'),
  '津嘉山',
  6,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　南風原町'),
  '照屋',
  7,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　南風原町'),
  '宮城',
  8,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　南風原町'),
  '宮平',
  9,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　南風原町'),
  '本部',
  10,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　南風原町'),
  '山川',
  11,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　南風原町'),
  '与那覇',
  12,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　渡嘉敷村'),
  '阿波連',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　渡嘉敷村'),
  '渡嘉敷',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　座間味村'),
  '阿嘉',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　座間味村'),
  '阿佐',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　座間味村'),
  '阿真',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　座間味村'),
  '慶留間',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　座間味村'),
  '座間味',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　粟国村'),
  '西',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　粟国村'),
  '浜',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　粟国村'),
  '東',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　渡名喜村'),
  '渡名喜村一円',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　南大東村'),
  '池之沢',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　南大東村'),
  '北',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　南大東村'),
  '旧東',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　南大東村'),
  '在所',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　南大東村'),
  '新東',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　南大東村'),
  '南',
  6,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　北大東村'),
  '中野',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　北大東村'),
  '港',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　北大東村'),
  '南',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　伊平屋村'),
  '我喜屋',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　伊平屋村'),
  '島尻',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　伊平屋村'),
  '田名',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　伊平屋村'),
  '野甫',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　伊平屋村'),
  '前泊',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　伊是名村'),
  '伊是名',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　伊是名村'),
  '内花',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　伊是名村'),
  '諸見',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　伊是名村'),
  '勢理客',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　伊是名村'),
  '仲田',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　久米島町'),
  '阿嘉',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　久米島町'),
  '宇江城',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　久米島町'),
  '上江洲',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　久米島町'),
  '宇根',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　久米島町'),
  '奥武',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　久米島町'),
  '大田',
  6,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　久米島町'),
  '大原',
  7,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　久米島町'),
  '嘉手苅',
  8,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　久米島町'),
  '兼城',
  9,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　久米島町'),
  '北原',
  10,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　久米島町'),
  '儀間',
  11,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　久米島町'),
  '具志川',
  12,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　久米島町'),
  '島尻',
  13,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　久米島町'),
  '謝名堂',
  14,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　久米島町'),
  '銭田',
  15,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　久米島町'),
  '鳥島',
  16,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　久米島町'),
  '仲地',
  17,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　久米島町'),
  '仲泊',
  18,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　久米島町'),
  '仲村渠',
  19,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　久米島町'),
  '西銘',
  20,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　久米島町'),
  '比嘉',
  21,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　久米島町'),
  '比屋定',
  22,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　久米島町'),
  '真我里',
  23,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　久米島町'),
  '真謝',
  24,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　久米島町'),
  '山城',
  25,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　久米島町'),
  '山里',
  26,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　八重瀬町'),
  '安里',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　八重瀬町'),
  '新城',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　八重瀬町'),
  '伊覇',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　八重瀬町'),
  '上田原',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　八重瀬町'),
  '大頓',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　八重瀬町'),
  '宜次',
  6,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　八重瀬町'),
  '具志頭',
  7,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　八重瀬町'),
  '小城',
  8,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　八重瀬町'),
  '後原',
  9,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　八重瀬町'),
  '東風平',
  10,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　八重瀬町'),
  '志多伯',
  11,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　八重瀬町'),
  '高良',
  12,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　八重瀬町'),
  '当銘',
  13,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　八重瀬町'),
  '友寄',
  14,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　八重瀬町'),
  '富盛',
  15,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　八重瀬町'),
  '仲座',
  16,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　八重瀬町'),
  '長毛',
  17,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　八重瀬町'),
  '玻名城',
  18,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　八重瀬町'),
  '外間',
  19,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　八重瀬町'),
  '港川',
  20,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　八重瀬町'),
  '屋宜原',
  21,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　八重瀬町'),
  '与座',
  22,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '島尻郡　八重瀬町'),
  '世名城',
  23,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古郡　多良間村'),
  '塩川',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古郡　多良間村'),
  '仲筋',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '宮古郡　多良間村'),
  '水納',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '八重山郡　竹富町'),
  '新城',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '八重山郡　竹富町'),
  '西表',
  2,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '八重山郡　竹富町'),
  '上原',
  3,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '八重山郡　竹富町'),
  '黒島',
  4,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '八重山郡　竹富町'),
  '小浜',
  5,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '八重山郡　竹富町'),
  '古見',
  6,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '八重山郡　竹富町'),
  '崎山',
  7,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '八重山郡　竹富町'),
  '高那',
  8,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '八重山郡　竹富町'),
  '竹富',
  9,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '八重山郡　竹富町'),
  '南風見',
  10,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '八重山郡　竹富町'),
  '南風見仲',
  11,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '八重山郡　竹富町'),
  '波照間',
  12,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '八重山郡　竹富町'),
  '鳩間',
  13,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
INSERT INTO public.address_towns (city_id, name, sort_no, is_active, created_at, updated_at)
VALUES (
  (SELECT id FROM public.address_cities WHERE name = '八重山郡　与那国町'),
  '与那国',
  1,
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
