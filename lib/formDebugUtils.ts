import { FieldErrors } from 'react-hook-form'
import { CaseFormData } from '../schemas/CaseFormSchema'

/**
 * フォームのバリデーションエラーを詳しくログ出力
 */
export function logFormErrors(errors: FieldErrors<CaseFormData>) {
    const errorList: string[] = []

    const traverse = (obj: any, prefix = '') => {
        if (!obj) return

        Object.entries(obj).forEach(([key, value]: [string, any]) => {
            const fullKey = prefix ? `${prefix}.${key}` : key

            if (value && typeof value === 'object') {
                if (value.message) {
                    // FieldError オブジェクト
                    errorList.push(`${fullKey}: ${value.message}`)
                } else {
                    // ネストされたオブジェクト
                    traverse(value, fullKey)
                }
            }
        })
    }

    traverse(errors)

    if (errorList.length === 0) {
        console.log('✓ フォーム検証エラーなし')
    } else {
        console.error('✗ フォーム検証エラー:')
        errorList.forEach((err) => console.error(`  - ${err}`))
    }

    return errorList
}
