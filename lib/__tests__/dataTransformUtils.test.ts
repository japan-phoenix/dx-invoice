import { describe, it, expect } from 'vitest'
import { apiToForm, formToApi } from '../dataTransformUtils'

// -------------------------------------------------------
// apiToForm
// -------------------------------------------------------
describe('apiToForm', () => {
    it('nullをundefinedに変換する', () => {
        expect(apiToForm({ name: null })).toEqual({ name: undefined })
    })

    it('undefinedはそのまま維持する', () => {
        expect(apiToForm({ name: undefined })).toEqual({ name: undefined })
    })

    it('文字列・数値・真偽値はそのまま維持する', () => {
        expect(apiToForm({ name: '田中', age: 30, active: true })).toEqual({
            name: '田中',
            age: 30,
            active: true,
        })
    })

    it('ネストしたオブジェクトのnullをundefinedに変換する', () => {
        expect(apiToForm({ address: { city: null, town: '新宿' } })).toEqual({
            address: { city: undefined, town: '新宿' },
        })
    })

    it('配列内のnullをundefinedに変換する', () => {
        expect(apiToForm([{ name: null }, { name: '花子' }])).toEqual([{ name: undefined }, { name: '花子' }])
    })

    it('プリミティブ値はそのまま返す', () => {
        expect(apiToForm('text')).toBe('text')
        expect(apiToForm(42)).toBe(42)
        expect(apiToForm(true)).toBe(true)
    })

    it('空配列はそのまま返す', () => {
        expect(apiToForm([])).toEqual([])
    })

    it('空オブジェクトはそのまま返す', () => {
        expect(apiToForm({})).toEqual({})
    })
})

// -------------------------------------------------------
// formToApi
// -------------------------------------------------------
describe('formToApi', () => {
    it('空文字をnullに変換する', () => {
        expect(formToApi({ name: '' })).toEqual({ name: null })
    })

    it('undefinedのキーを削除する', () => {
        const result = formToApi({ name: '田中', note: undefined })
        expect(result).toEqual({ name: '田中' })
        expect('note' in result).toBe(false)
    })

    it('文字列・数値・真偽値はそのまま維持する', () => {
        expect(formToApi({ name: '田中', age: 30, active: true })).toEqual({
            name: '田中',
            age: 30,
            active: true,
        })
    })

    it('ネストしたオブジェクトの空文字をnullに変換する', () => {
        expect(formToApi({ address: { city: '', town: '新宿' } })).toEqual({
            address: { city: null, town: '新宿' },
        })
    })

    it('ネストしたオブジェクトのundefinedキーを削除する', () => {
        const result = formToApi({ address: { city: '東京', zip: undefined } })
        expect(result).toEqual({ address: { city: '東京' } })
        expect('zip' in result.address).toBe(false)
    })

    it('配列内の空文字をnullに変換する', () => {
        expect(formToApi([{ name: '' }, { name: '花子' }])).toEqual([{ name: null }, { name: '花子' }])
    })

    it('プリミティブ値はそのまま返す', () => {
        expect(formToApi('text')).toBe('text')
        expect(formToApi(42)).toBe(42)
        expect(formToApi(true)).toBe(true)
    })

    it('空配列はそのまま返す', () => {
        expect(formToApi([])).toEqual([])
    })
})
