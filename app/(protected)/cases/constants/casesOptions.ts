// 故人との関係
export const RELATION_OPTIONS = ['父', '母', '夫', '妻', '長男', '長女', '義父', '義母'] as const
// 性別
export const GENDER_OPTIONS = [
    { value: 'MALE', label: '男性' },
    { value: 'FEMALE', label: '女性' },
    { value: 'OTHER', label: 'その他' },
] as const
// 御宗旨
export const RELIGION_OPTIONS = ['神式', '仏式', 'キリスト式', '友人葬', '家族葬'] as const
// 引取場所
export const PICKUP_PLACE_OPTIONS = ['病院', '自宅'] as const
