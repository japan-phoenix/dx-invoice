/* eslint-disable no-irregular-whitespace */
export const CREMATION_OPTIONS = [
    { value: 'FAMILY', label: '喪家' },
    { value: 'NEIGHBORHOOD', label: '隣組' },
    { value: 'COMPANY', label: '自社代行' },
]

export const ALTAR_OPTIONS = [
    { value: 'HOME', label: '自宅' },
    { value: 'FUNERAL_HALL', label: '斎場' },
    { value: 'OTHER', label: 'その他' },
]
export const DEFAULT_DESCRIPTION_MAP: Record<string, string> = {
    棺: '寝棺・特注 (　　　　)',
    納棺用品一式: '(仏衣・布団)',
    寝台車: '寝台車: 車庫～　〜　迄',
    霊柩車: `車庫～火葬場\n片道•往復 (　　　　km)`,
    外装飾設備: '飾り幕・御霊灯・門標',
    受付設備: '受付台・イス・記録帳',
    司会: '放送設備・式進行',
    葬具小物一式: '位牌・飾り幕・焼香用具',
    あと飾り祭壇: '紙製・木製・年忌',
    御霊前セット: 'ローソク・線香・他',
    '果物・お酒・線香': '祭壇用・火葬場用・納骨用',
}

export const STATUS_OPTIONS = [
    { value: 'DRAFT', label: '下書き' },
    { value: 'CONFIRMED', label: '確定' },
]
