import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { CaseFormData } from '../schemas/CaseFormSchema'

export function FuneralTab() {
    const { control } = useFormContext<CaseFormData>()

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {/* 迎送場所 */}
            <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>迎送場所</label>
                <Controller
                    name="pickupPlace"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            value={field.value || ''}
                            type="text"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                            }}
                        />
                    )}
                />
            </div>

            {/* 通夜日時 */}
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>通夜日時</label>
                <Controller
                    name="wakeAt"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            value={field.value || ''}
                            type="datetime-local"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                            }}
                        />
                    )}
                />
            </div>

            {/* 通夜場所 */}
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>通夜場所</label>
                <Controller
                    name="wakePlace"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            value={field.value || ''}
                            type="text"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                            }}
                        />
                    )}
                />
            </div>

            {/* 国への出棺日時 */}
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>国への出棺日時</label>
                <Controller
                    name="departureAt"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            value={field.value || ''}
                            type="datetime-local"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                            }}
                        />
                    )}
                />
            </div>

            {/* 国への出棺場所 */}
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>国への出棺場所</label>
                <Controller
                    name="departurePlace"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            value={field.value || ''}
                            type="text"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                            }}
                        />
                    )}
                />
            </div>

            {/* 葬儀・告別式開始日時 */}
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>葬儀・告別式開始日時</label>
                <Controller
                    name="funeralFrom"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            value={field.value || ''}
                            type="datetime-local"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                            }}
                        />
                    )}
                />
            </div>

            {/* 葬儀・告別式終了日時 */}
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>葬儀・告別式終了日時</label>
                <Controller
                    name="funeralTo"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            value={field.value || ''}
                            type="datetime-local"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                            }}
                        />
                    )}
                />
            </div>

            {/* 葬儀・告別式会場 */}
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>葬儀・告別式会場</label>
                <Controller
                    name="funeralPlace"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            value={field.value || ''}
                            type="text"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                            }}
                        />
                    )}
                />
            </div>

            {/* 火葬場到着日時 */}
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>火葬場到着日時</label>
                <Controller
                    name="returnAt"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            value={field.value || ''}
                            type="datetime-local"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                            }}
                        />
                    )}
                />
            </div>

            {/* 火葬場 */}
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>火葬場</label>
                <Controller
                    name="returnPlace"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            value={field.value || ''}
                            type="text"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                            }}
                        />
                    )}
                />
            </div>

            {/* 備考 */}
            <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>備考</label>
                <Controller
                    name="notes"
                    control={control}
                    render={({ field }) => (
                        <textarea
                            {...field}
                            value={field.value || ''}
                            rows={4}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                            }}
                        />
                    )}
                />
            </div>

            {/* 会員カードメモ */}
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>会員カードメモ</label>
                <Controller
                    name="memberCardNote"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            value={field.value || ''}
                            type="text"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                            }}
                        />
                    )}
                />
            </div>
        </div>
    )
}
