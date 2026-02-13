import React from 'react'
import { Controller, useFormContext, useFieldArray } from 'react-hook-form'
import { CaseFormData } from '../schemas/CaseFormSchema'

export function MembershipTab() {
    const { control } = useFormContext<CaseFormData>()
    const { fields } = useFieldArray({
        control,
        name: 'memberships',
    })

    return (
        <div>
            {fields.map((membership, index) => (
                <div
                    key={membership.id}
                    style={{
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '1.5rem',
                        marginBottom: '1rem',
                    }}
                >
                    <h4 style={{ marginBottom: '1rem' }}>会員{membership.rowNo}</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                        {/* 会員番号 */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>会員番号</label>
                            <Controller
                                name={`memberships.${index}.memberNo`}
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

                        {/* 加入日 */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>加入日</label>
                            <Controller
                                name={`memberships.${index}.joinedAt`}
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        value={field.value || ''}
                                        type="date"
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

                        {/* 会員名 */}
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>会員名</label>
                            <Controller
                                name={`memberships.${index}.memberName`}
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

                        {/* コース口数 */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>コース口数</label>
                            <Controller
                                name={`memberships.${index}.courseUnits`}
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        value={field.value || ''}
                                        type="number"
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

                        {/* 満期額 */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>満期額</label>
                            <Controller
                                name={`memberships.${index}.maturityAmount`}
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        value={field.value || ''}
                                        type="number"
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

                        {/* 支払回数 */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>支払回数</label>
                            <Controller
                                name={`memberships.${index}.paymentTimes`}
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        value={field.value || ''}
                                        type="number"
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

                        {/* 支払額 */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>支払額</label>
                            <Controller
                                name={`memberships.${index}.paymentAmount`}
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        value={field.value || ''}
                                        type="number"
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

                        {/* 営業担当者名 */}
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>営業担当者名</label>
                            <Controller
                                name={`memberships.${index}.salesStaffName`}
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

                        {/* 故人との関係 */}
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>故人との関係</label>
                            <Controller
                                name={`memberships.${index}.relationToDeceased`}
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
                </div>
            ))}
        </div>
    )
}
