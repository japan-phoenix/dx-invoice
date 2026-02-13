import { z } from 'zod'

// 会員情報のスキーマ
export const customerMembershipSchema = z.object({
    rowNo: z.number(),
    memberNo: z.string().nullable().optional(),
    joinedAt: z.string().nullable().optional(),
    memberName: z.string().nullable().optional(),
    courseUnits: z.number().nullable().optional(),
    maturityAmount: z.number().nullable().optional(),
    paymentTimes: z.number().nullable().optional(),
    paymentAmount: z.number().nullable().optional(),
    salesStaffName: z.string().nullable().optional(),
    relationToDeceased: z.string().nullable().optional(),
})

// 案件フォームのメインスキーマ
export const caseFormSchema = z.object({
    // 故人情報
    receptionAt: z.string().min(1, '受付日は必須です'),
    deceasedName: z.string().min(1, '故人名は必須です'),
    deceasedLastName: z.string().nullable().optional(),
    deceasedFirstName: z.string().nullable().optional(),
    gender: z.string().nullable().optional(),
    age: z.number().nullable().optional(),
    religion: z.string().nullable().optional(),

    // 喪主情報
    chiefMournerName: z.string().nullable().optional(),
    chiefMournerRelation: z.string().nullable().optional(),
    chiefMournerCityId: z.string().nullable().optional(),
    chiefMournerTownId: z.string().nullable().optional(),
    chiefMournerAddress: z.string().nullable().optional(),
    chiefMournerTel: z.string().nullable().optional(),

    // 支払者情報
    sameAsChiefMourner: z.boolean(),
    payerName: z.string().nullable().optional(),
    payerRelation: z.string().nullable().optional(),
    payerAddress: z.string().nullable().optional(),
    payerTel: z.string().nullable().optional(),

    // 葬儀情報
    pickupPlace: z.string().nullable().optional(),
    wakeAt: z.string().nullable().optional(),
    wakePlace: z.string().nullable().optional(),
    departureAt: z.string().nullable().optional(),
    departurePlace: z.string().nullable().optional(),
    funeralFrom: z.string().nullable().optional(),
    funeralTo: z.string().nullable().optional(),
    funeralPlace: z.string().nullable().optional(),
    returnAt: z.string().nullable().optional(),
    returnPlace: z.string().nullable().optional(),

    // その他
    notes: z.string().nullable().optional(),
    memberCardNote: z.string().nullable().optional(),

    // 会員情報
    memberships: z.array(customerMembershipSchema),
})

export type CaseFormData = z.infer<typeof caseFormSchema>
