import { FieldValues, FieldErrors } from 'react-hook-form'
import { CaseFormData } from '../schemas/CaseFormSchema'

// 各タブに関連するフィールドを定義
export const TAB_FIELDS = {
    deceased: [
        'receptionAt',
        'deceasedName',
        'deceasedLastName',
        'deceasedFirstName',
        'gender',
        'age',
        'religion',
        'chiefMournerName',
        'chiefMournerRelation',
        'chiefMournerCityId',
        'chiefMournerTownId',
        'chiefMournerAddress',
        'chiefMournerTel',
        'sameAsChiefMourner',
        'payerName',
        'payerRelation',
        'payerAddress',
        'payerTel',
    ],
    funeral: [
        'pickupPlace',
        'wakeAt',
        'wakePlace',
        'departureAt',
        'departurePlace',
        'funeralFrom',
        'funeralTo',
        'funeralPlace',
        'returnAt',
        'returnPlace',
        'notes',
        'memberCardNote',
    ],
    membership: ['memberships'],
} as const

export type TabKey = keyof typeof TAB_FIELDS

/**
 * エラーが存在するタブを判定
 */
export function getTabsWithErrors(errors: FieldErrors<CaseFormData>): TabKey[] {
    const tabsWithErrors: TabKey[] = []

    for (const [tab, fields] of Object.entries(TAB_FIELDS)) {
        const hasError = fields.some((field) => {
            const keys = field.split('.')
            let current: any = errors

            for (const key of keys) {
                if (current?.[key]) {
                    current = current[key]
                } else {
                    current = null
                    break
                }
            }

            return current !== undefined && current !== null
        })

        if (hasError) {
            tabsWithErrors.push(tab as TabKey)
        }
    }

    return tabsWithErrors
}

/**
 * 特定のタブにエラーがあるか判定
 */
export function hasErrorInTab(errors: FieldErrors<CaseFormData>, tab: TabKey): boolean {
    const fields = TAB_FIELDS[tab]

    return fields.some((field) => {
        const keys = field.split('.')
        let current: any = errors

        for (const key of keys) {
            if (current?.[key]) {
                current = current[key]
            } else {
                current = null
                break
            }
        }

        return current !== undefined && current !== null
    })
}
