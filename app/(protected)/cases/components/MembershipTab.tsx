import React from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { CaseFormData } from '../schemas/CaseFormSchema'
import { FormInput } from '@/components/form/FormInput'
import { FormCurrencyInput } from '@/components/form/FormCurrencyInput'
import { FormAutocomplete } from '@/components/form/FormAutocomplete'
import { RELATION_OPTIONS } from '../constants/casesOptions'

export function MembershipTab() {
    const {
        control,
        formState: { errors },
    } = useFormContext<CaseFormData>()
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
                        <FormInput<CaseFormData>
                            name={`memberships.${index}.memberNo`}
                            control={control}
                            label="会員番号"
                            error={errors.memberships?.[index]?.memberNo}
                        />

                        {/* 加入日 */}
                        <FormInput<CaseFormData>
                            name={`memberships.${index}.joinedAt`}
                            control={control}
                            label="加入日"
                            type="date"
                            error={errors.memberships?.[index]?.joinedAt}
                        />

                        {/* 会員名 */}
                        <div style={{ gridColumn: '1 / -1' }}>
                            <FormInput<CaseFormData>
                                name={`memberships.${index}.memberName`}
                                control={control}
                                label="会員名"
                                error={errors.memberships?.[index]?.memberName}
                            />
                        </div>

                        {/* コース口数 */}
                        <FormInput<CaseFormData>
                            name={`memberships.${index}.courseUnits`}
                            control={control}
                            label="コース口数"
                            type="number"
                            suffix="万口"
                            error={errors.memberships?.[index]?.courseUnits}
                        />

                        {/* 満期額 */}
                        <FormCurrencyInput<CaseFormData>
                            name={`memberships.${index}.maturityAmount`}
                            control={control}
                            label="満期額"
                            prefix="¥"
                            suffix="万"
                            error={errors.memberships?.[index]?.maturityAmount}
                        />

                        {/* 入金回数 */}
                        <FormInput<CaseFormData>
                            name={`memberships.${index}.paymentTimes`}
                            control={control}
                            label="入金回数"
                            type="number"
                            suffix="回"
                            error={errors.memberships?.[index]?.paymentTimes}
                        />

                        {/* 入金額 */}
                        <FormCurrencyInput<CaseFormData>
                            name={`memberships.${index}.paymentAmount`}
                            control={control}
                            label="入金額"
                            prefix="¥"
                            error={errors.memberships?.[index]?.paymentAmount}
                        />

                        {/* 営業担当者名 */}
                        <div style={{ gridColumn: '1 / -1' }}>
                            <FormInput<CaseFormData>
                                name={`memberships.${index}.salesStaffName`}
                                control={control}
                                label="営業担当者名"
                                error={errors.memberships?.[index]?.salesStaffName}
                            />
                        </div>

                        {/* 故人との関係 */}
                        <div style={{ gridColumn: '1 / -1' }}>
                            <FormAutocomplete<CaseFormData>
                                name={`memberships.${index}.relationToDeceased`}
                                control={control}
                                label="故人との関係"
                                options={[...RELATION_OPTIONS]}
                                error={errors.chiefMournerRelation}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
