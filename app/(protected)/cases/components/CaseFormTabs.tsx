'use client'

import { useFormContext } from 'react-hook-form'
import { CaseFormData } from '../schemas/CaseFormSchema'
import { hasErrorInTab, TabKey } from '../utils/formErrorUtils'
import 'material-symbols/outlined.css'

interface CaseFormTabsProps {
    activeTab:
        | 'deceasedInfo'
        | 'chiefMourner'
        | 'payer'
        | 'wake'
        | 'funeralInfo'
        | 'membership1'
        | 'membership2'
        | 'membership3'
    onTabChange: (
        tab:
            | 'deceasedInfo'
            | 'chiefMourner'
            | 'payer'
            | 'wake'
            | 'funeralInfo'
            | 'membership1'
            | 'membership2'
            | 'membership3'
    ) => void
}

export function CaseFormTabs({ activeTab, onTabChange }: CaseFormTabsProps) {
    const { formState } = useFormContext<CaseFormData>()

    const primaryTabs: { key: TabKey; label: string }[] = [
        { key: 'deceasedInfo', label: '故人情報' },
        { key: 'chiefMourner', label: '喪主情報' },
        { key: 'payer', label: '支払者情報' },
        { key: 'wake', label: '通夜情報' },
        { key: 'funeralInfo', label: '葬儀情報' },
        { key: 'membership1', label: '会員情報１' },
        { key: 'membership2', label: '会員情報２' },
        { key: 'membership3', label: '会員情報３' },
    ]

    const renderTab = (tab: { key: TabKey; label: string }) => {
        const hasError = hasErrorInTab(formState.errors, tab.key)
        const isActive = activeTab === tab.key

        return (
            <button
                key={tab.key}
                type="button"
                onClick={() => onTabChange(tab.key)}
                className={`relative flex cursor-pointer items-center border-none px-6 py-3 transition-colors ${
                    isActive
                        ? hasError
                            ? 'border-b-2 border-red-600 bg-red-600 text-white'
                            : 'border-b-2 border-blue-600 bg-blue-600 text-white'
                        : `bg-transparent ${hasError ? 'font-semibold text-red-600' : 'text-gray-700'}`
                }`}
                title={hasError ? 'このタブにエラーがあります' : ''}
            >
                {tab.label}
                {hasError && !isActive && (
                    <span
                        className="material-symbols-outlined"
                        style={{ fontSize: '1.2rem', marginLeft: '0.5rem', color: '#dc3545' }}
                    >
                        warning
                    </span>
                )}
            </button>
        )
    }

    return <div className="mb-8 flex flex-wrap gap-2 border-b-2 border-gray-300">{primaryTabs.map(renderTab)}</div>
}
