import { describe, it, expect } from 'vitest'
import { parseDateRange, calculateDateRange } from '../dateUtils'

// -------------------------------------------------------
// parseDateRange
// -------------------------------------------------------
describe('parseDateRange', () => {
    describe('YYYY-MM-DD 形式', () => {
        it('from/toが同じ日付になる', () => {
            expect(parseDateRange('2026-03-11')).toEqual({
                from: '2026-03-11',
                to: '2026-03-11',
            })
        })
    })

    describe('YYYY-MM 形式', () => {
        it('月初〜月末の範囲を返す（31日の月）', () => {
            expect(parseDateRange('2026-01')).toEqual({
                from: '2026-01-01',
                to: '2026-01-31',
            })
        })

        it('月初〜月末の範囲を返す（30日の月）', () => {
            expect(parseDateRange('2026-04')).toEqual({
                from: '2026-04-01',
                to: '2026-04-30',
            })
        })

        it('うるう年の2月は29日まで', () => {
            expect(parseDateRange('2024-02')).toEqual({
                from: '2024-02-01',
                to: '2024-02-29',
            })
        })

        it('平年の2月は28日まで', () => {
            expect(parseDateRange('2026-02')).toEqual({
                from: '2026-02-01',
                to: '2026-02-28',
            })
        })
    })

    describe('YYYY 形式', () => {
        it('年初〜年末の範囲を返す', () => {
            expect(parseDateRange('2026')).toEqual({
                from: '2026-01-01',
                to: '2026-12-31',
            })
        })
    })

    describe('無効な入力', () => {
        it('空文字はnullを返す', () => {
            expect(parseDateRange('')).toBeNull()
        })

        it('不正な文字列はnullを返す', () => {
            expect(parseDateRange('invalid')).toBeNull()
            expect(parseDateRange('20260')).toBeNull()
            expect(parseDateRange('2026-1')).toBeNull()
        })

        it('前後の空白は無視してパースする', () => {
            expect(parseDateRange('  2026  ')).toEqual({
                from: '2026-01-01',
                to: '2026-12-31',
            })
        })
    })
})

// -------------------------------------------------------
// calculateDateRange
// -------------------------------------------------------
describe('calculateDateRange', () => {
    it('fromInputのみ指定した場合、fromのみ返す', () => {
        const result = calculateDateRange('2026-03')
        expect(result.from).toBe('2026-03-01')
        expect(result.to).toBeUndefined()
    })

    it('toInputのみ指定した場合、toのみ返す', () => {
        const result = calculateDateRange(undefined, '2026-03')
        expect(result.from).toBeUndefined()
        expect(result.to).toBe('2026-03-31')
    })

    it('from/to両方指定した場合、それぞれの境界値を返す', () => {
        const result = calculateDateRange('2026-01', '2026-03')
        expect(result.from).toBe('2026-01-01')
        expect(result.to).toBe('2026-03-31')
    })

    it('引数なしの場合、空オブジェクトを返す', () => {
        expect(calculateDateRange()).toEqual({})
    })

    it('不正な値はスキップする', () => {
        const result = calculateDateRange('invalid', '2026-03')
        expect(result.from).toBeUndefined()
        expect(result.to).toBe('2026-03-31')
    })
})
