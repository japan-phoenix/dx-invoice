import { formToApi } from '@/lib/dataTransformUtils'
import { CaseFormData } from '../schemas/CaseFormSchema'

export function getFormDefaultValues(): CaseFormData {
    return {
        receptionAt: '',
        deceasedName: '',
        deceasedLastName: undefined,
        deceasedFirstName: undefined,
        gender: undefined,
        age: undefined,
        religion: undefined,
        chiefMournerName: undefined,
        chiefMournerRelation: undefined,
        chiefMournerCityId: undefined,
        chiefMournerTownId: undefined,
        chiefMournerAddress: undefined,
        chiefMournerTel: undefined,
        sameAsChiefMourner: false,
        payerName: undefined,
        payerRelation: undefined,
        payerAddress: undefined,
        payerTel: undefined,
        pickupPlace: undefined,
        wakeAt: undefined,
        wakePlace: undefined,
        departureAt: undefined,
        departurePlace: undefined,
        funeralFrom: undefined,
        funeralTo: undefined,
        funeralPlace: undefined,
        returnAt: undefined,
        returnPlace: undefined,
        notes: undefined,
        memberCardNote: undefined,
        memberships: [
            {
                rowNo: 1,
                memberNo: '',
                joinedAt: '',
                memberName: '',
                courseUnits: undefined,
                maturityAmount: undefined,
                paymentTimes: undefined,
                paymentAmount: undefined,
                salesStaffName: '',
                relationToDeceased: '',
            },
            {
                rowNo: 2,
                memberNo: '',
                joinedAt: '',
                memberName: '',
                courseUnits: undefined,
                maturityAmount: undefined,
                paymentTimes: undefined,
                paymentAmount: undefined,
                salesStaffName: '',
                relationToDeceased: '',
            },
            {
                rowNo: 3,
                memberNo: '',
                joinedAt: '',
                memberName: '',
                courseUnits: undefined,
                maturityAmount: undefined,
                paymentTimes: undefined,
                paymentAmount: undefined,
                salesStaffName: '',
                relationToDeceased: '',
            },
        ],
    }
}

export function transformSubmitData(data: CaseFormData, formatDateForISO: (val: string | undefined) => string | null) {
    // 既存の変換ロジックを維持しつつ、formToApiで最終変換
    const base = {
        ...data,
        receptionAt: formatDateForISO(data.receptionAt),
        age: data.age ? parseInt(data.age.toString()) : undefined,
        wakeAt: formatDateForISO(data.wakeAt),
        departureAt: formatDateForISO(data.departureAt),
        funeralFrom: formatDateForISO(data.funeralFrom),
        funeralTo: formatDateForISO(data.funeralTo),
        returnAt: formatDateForISO(data.returnAt),
        memberships: data.memberships.map((m) => ({
            ...m,
            rowNo: m.rowNo,
            joinedAt: m.joinedAt || undefined,
            courseUnits: m.courseUnits ? parseInt(m.courseUnits.toString()) : undefined,
            maturityAmount: m.maturityAmount ? parseInt(m.maturityAmount.toString()) : undefined,
            paymentTimes: m.paymentTimes ? parseInt(m.paymentTimes.toString()) : undefined,
            paymentAmount: m.paymentAmount ? parseInt(m.paymentAmount.toString()) : undefined,
        })),
    }
    return formToApi(base)
}
