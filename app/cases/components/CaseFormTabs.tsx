import React from 'react'

interface CaseFormTabsProps {
    activeTab: 'deceased' | 'funeral' | 'membership'
    onTabChange: (tab: 'deceased' | 'funeral' | 'membership') => void
}

export function CaseFormTabs({ activeTab, onTabChange }: CaseFormTabsProps) {
    return (
        <div className="mb-8 flex gap-2 border-b-2 border-gray-300">
            <button
                type="button"
                onClick={() => onTabChange('deceased')}
                className={`cursor-pointer border-none px-6 py-3 ${
                    activeTab === 'deceased'
                        ? 'border-b-2 border-blue-600 bg-blue-600 text-white'
                        : 'bg-transparent text-gray-700'
                }`}
            >
                故人情報
            </button>
            <button
                type="button"
                onClick={() => onTabChange('funeral')}
                className={`cursor-pointer border-none px-6 py-3 ${
                    activeTab === 'funeral'
                        ? 'border-b-2 border-blue-600 bg-blue-600 text-white'
                        : 'bg-transparent text-gray-700'
                }`}
            >
                葬儀情報
            </button>
            <button
                type="button"
                onClick={() => onTabChange('membership')}
                className={`cursor-pointer border-none px-6 py-3 ${
                    activeTab === 'membership'
                        ? 'border-b-2 border-blue-600 bg-blue-600 text-white'
                        : 'bg-transparent text-gray-700'
                }`}
            >
                会員情報
            </button>
        </div>
    )
}
