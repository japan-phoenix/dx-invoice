'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import { CaseFormData } from '../schemas/CaseFormSchema'
import { hasErrorInTab, TabKey } from '../utils/formErrorUtils'
import 'material-symbols/outlined.css'

interface CaseFormTabsProps {
    activeTab: 'deceased' | 'funeral' | 'membership'
    onTabChange: (tab: 'deceased' | 'funeral' | 'membership') => void
}

export function CaseFormTabs({ activeTab, onTabChange }: CaseFormTabsProps) {
    const { formState } = useFormContext<CaseFormData>()

    const tabs: { key: TabKey; label: string }[] = [
        { key: 'deceased', label: '故人情報' },
        { key: 'funeral', label: '葬儀情報' },
        { key: 'membership', label: '会員情報' },
    ]

    return (
        <div className="mb-8 flex gap-2 border-b-2 border-gray-300">
            {tabs.map((tab) => {
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
            })}
        </div>
    )
}
