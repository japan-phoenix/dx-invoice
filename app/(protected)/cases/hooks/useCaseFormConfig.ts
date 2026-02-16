import { useCallback } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { CaseFormData } from '../schemas/CaseFormSchema'

/**
 * フォームのデフォルト値を取得
 */
export function getFormDefaultValues(): CaseFormData {
    return {
        receptionAt: '',
        deceasedName: '',
        deceasedLastName: null,
        deceasedFirstName: null,
        gender: null,
        age: null,
        religion: null,
        chiefMournerName: null,
        chiefMournerRelation: null,
        chiefMournerCityId: null,
        chiefMournerTownId: null,
        chiefMournerAddress: null,
        chiefMournerTel: null,
        sameAsChiefMourner: false,
        payerName: null,
        payerRelation: null,
        payerAddress: null,
        payerTel: null,
        pickupPlace: null,
        wakeAt: null,
        wakePlace: null,
        departureAt: null,
        departurePlace: null,
        funeralFrom: null,
        funeralTo: null,
        funeralPlace: null,
        returnAt: null,
        returnPlace: null,
        notes: null,
        memberCardNote: null,
        memberships: [
            {
                rowNo: 1,
                memberNo: '',
                joinedAt: '',
                memberName: '',
                courseUnits: null,
                maturityAmount: null,
                paymentTimes: null,
                paymentAmount: null,
                salesStaffName: '',
                relationToDeceased: '',
            },
            {
                rowNo: 2,
                memberNo: '',
                joinedAt: '',
                memberName: '',
                courseUnits: null,
                maturityAmount: null,
                paymentTimes: null,
                paymentAmount: null,
                salesStaffName: '',
                relationToDeceased: '',
            },
            {
                rowNo: 3,
                memberNo: '',
                joinedAt: '',
                memberName: '',
                courseUnits: null,
                maturityAmount: null,
                paymentTimes: null,
                paymentAmount: null,
                salesStaffName: '',
                relationToDeceased: '',
            },
        ],
    }
}

/**
 * フォーム送信データに変換（日付やnull値の処理）
 */
export function transformSubmitData(
    data: CaseFormData,
    formatDateForISO: (val: string | null | undefined) => string | null
) {
    return {
        ...data,
        receptionAt: formatDateForISO(data.receptionAt),
        age: data.age ? parseInt(data.age.toString()) : null,
        wakeAt: formatDateForISO(data.wakeAt),
        departureAt: formatDateForISO(data.departureAt),
        funeralFrom: formatDateForISO(data.funeralFrom),
        funeralTo: formatDateForISO(data.funeralTo),
        returnAt: formatDateForISO(data.returnAt),
        memberships: data.memberships.map((m) => ({
            ...m,
            rowNo: m.rowNo,
            joinedAt: m.joinedAt || null,
            courseUnits: m.courseUnits ? parseInt(m.courseUnits.toString()) : null,
            maturityAmount: m.maturityAmount ? parseInt(m.maturityAmount.toString()) : null,
            paymentTimes: m.paymentTimes ? parseInt(m.paymentTimes.toString()) : null,
            paymentAmount: m.paymentAmount ? parseInt(m.paymentAmount.toString()) : null,
        })),
    }
}
