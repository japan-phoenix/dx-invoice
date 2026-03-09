// API <-> Form データ変換ユーティリティ
// 再帰的に変換する

/**
 * APIから受け取ったデータのnullをundefinedに変換（再帰的）
 */
export function apiToForm<T>(data: T): T {
    if (Array.isArray(data)) {
        return data.map(apiToForm) as any
    } else if (data && typeof data === 'object') {
        const result: any = {}
        for (const [k, v] of Object.entries(data)) {
            if (v === null) {
                result[k] = undefined
            } else {
                result[k] = apiToForm(v)
            }
        }
        return result
    }
    return data
}

/**
 * フォームデータの空文字をnull、undefinedを削除してAPI用に変換（再帰的）
 */
export function formToApi<T>(data: T): any {
    if (Array.isArray(data)) {
        return data.map(formToApi)
    } else if (data && typeof data === 'object') {
        const result: any = {}
        for (const [k, v] of Object.entries(data)) {
            if (v === undefined) {
                // undefinedは送信しない
                continue
            } else if (typeof v === 'string' && v === '') {
                result[k] = null
            } else {
                result[k] = formToApi(v)
            }
        }
        return result
    }
    return data
}
