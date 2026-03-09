/**
 * 郵便番号から住所を検索するAPI
 * Zipcloud API (https://zipcloud.ibsnet.co.jp/api/search) を利用
 */

import { NextRequest, NextResponse } from 'next/server'

export interface PostalSearchResponse {
    zipcode: string
    prefecture: string
    city: string
    town: string
    fullAddress: string
}

// 開発用モックデータのフォールバック
const MOCK_POSTAL_DATA: Record<string, PostalSearchResponse> = {
    '1000001': {
        zipcode: '1000001',
        prefecture: '東京都',
        city: '千代田区',
        town: '丸の内',
        fullAddress: '東京都千代田区丸の内',
    },
    '1040052': {
        zipcode: '1040052',
        prefecture: '東京都',
        city: '中央区',
        town: '月島',
        fullAddress: '東京都中央区月島',
    },
}

export async function GET(request: NextRequest) {
    console.log('[Postal Search] Incoming request:', request.url)
    const { searchParams } = new URL(request.url)
    const zipcode = searchParams.get('zipcode')
    console.log('[Postal Search] Zipcode parameter:', zipcode)

    if (!zipcode) {
        console.log('[Postal Search] Zipcode is empty')
        return NextResponse.json({ error: '郵便番号が指定されていません' }, { status: 400 })
    }

    // 郵便番号を正規化（数字のみに）
    const normalizedZipcode = zipcode
        .replace(/[０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
        .replace(/[^0-9]/g, '')

    console.log('[Postal Search] Normalized zipcode:', normalizedZipcode)

    if (normalizedZipcode.length !== 7) {
        console.log('[Postal Search] Zipcode length is not 7:', normalizedZipcode.length)
        return NextResponse.json({ error: '郵便番号は7桁である必要があります' }, { status: 400 })
    }

    try {
        // 実際のZipcloud APIを呼び出し
        const apiUrl = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${normalizedZipcode}`
        console.log('[Postal Search] Fetching from Zipcloud API:', apiUrl)

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; Japan-Phoenix/1.0)',
            },
            signal: AbortSignal.timeout(5000), // 5秒のタイムアウト
        })

        console.log('[Postal Search] Response status:', response.status)

        if (response.ok) {
            const data = await response.json()
            console.log('[Postal Search] API Response:', JSON.stringify(data, null, 2))

            // APIが結果を返した場合
            if (data.results && data.results.length > 0) {
                const result = data.results[0]
                const prefecture = result.address1 || result.pref
                const city = result.address2 || result.city
                const town = result.address3 || result.town

                console.log('[Postal Search] Returning API result:', result)
                return NextResponse.json({
                    data: {
                        zipcode: result.zipcode,
                        prefecture: prefecture,
                        city: city,
                        town: town,
                        fullAddress: `${prefecture}${city}${town}`,
                    },
                })
            }
        }

        // API呼び出し失敗時、モックデータでフォールバック
        console.log('[Postal Search] API failed or no results, falling back to mock data')
        const mockResult = MOCK_POSTAL_DATA[normalizedZipcode]

        if (mockResult) {
            console.log('[Postal Search] Mock: Returning result:', mockResult)
            return NextResponse.json({ data: mockResult })
        }

        // モックデータにもない場合
        console.log('[Postal Search] Mock: No results for zipcode:', normalizedZipcode)
        console.log('[Postal Search] Mock: Available zipcodes:', Object.keys(MOCK_POSTAL_DATA))
        return NextResponse.json({ data: null }, { status: 404 })
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error)
        console.error('[Postal Search] Error:', errorMessage)
        console.error('[Postal Search] Full error:', error)

        // ネットワークエラー時はモックデータでリトライ
        console.log('[Postal Search] Network error, trying mock data as fallback')
        const mockResult = MOCK_POSTAL_DATA[normalizedZipcode]

        if (mockResult) {
            console.log('[Postal Search] Mock fallback: Returning result:', mockResult)
            return NextResponse.json({ data: mockResult })
        }

        return NextResponse.json(
            {
                error: `郵便番号検索に失敗しました: ${errorMessage}`,
            },
            { status: 500 }
        )
    }
}
