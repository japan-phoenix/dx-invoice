'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getBillingTargets, FlowerBillingTarget } from '@/lib/flowers'
import { getCompanyProfile, CompanyProfile } from '@/lib/company'
import { CreateButton } from '@/components/button/CreateButton'
import { ResetButton } from '@/components/button/ResetButton'
import { SearchButton } from '@/components/button/SearchButton'
import { toast } from '@/hooks/use-toast'
import Image from 'next/image'

export default function FlowerPdfPage() {
    const router = useRouter()
    const params = useParams()
    const customerId = params.customerId as string
    const [loading, setLoading] = useState(true)
    const [targets, setTargets] = useState<FlowerBillingTarget[]>([])
    const [company, setCompany] = useState<CompanyProfile | null>(null)
    const [pdfUrl, setPdfUrl] = useState<string | null>(null)
    const [generating, setGenerating] = useState(false)

    useEffect(() => {
        loadData()
    }, [customerId])

    const loadData = async () => {
        try {
            const [flowersData, companyData] = await Promise.all([getBillingTargets(customerId), getCompanyProfile()])
            // 依頼主が1件以上いる請求先のみ表示
            setTargets(flowersData.filter((t) => t.flowers.length > 0))
            setCompany(companyData)
        } catch (error) {
            console.error('Failed to load data:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleGeneratePDF = async () => {
        setGenerating(true)
        try {
            const res = await fetch(`/api/pdf/flower/${customerId}?download`)
            if (!res.ok) throw new Error(await res.text())
            const blob = await res.blob()
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `供花請求書_${customerId}_${new Date().toISOString().split('T')[0]}.pdf`
            a.click()
            URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Failed to generate PDF:', error)
            toast({ title: 'PDFの生成に失敗しました', variant: 'destructive', duration: 3000 })
        } finally {
            setGenerating(false)
        }
    }

    const handlePreviewPDF = async () => {
        setGenerating(true)
        try {
            const res = await fetch(`/api/pdf/flower/${customerId}`)
            if (!res.ok) throw new Error(await res.text())
            const blob = await res.blob()
            const url = URL.createObjectURL(blob)
            setPdfUrl(url)
        } catch (error) {
            console.error('Failed to preview PDF:', error)
            toast({ title: 'PDFの生成に失敗しました', variant: 'destructive', duration: 3000 })
        } finally {
            setGenerating(false)
        }
    }

    if (loading) {
        return <div className="p-8">読み込み中...</div>
    }

    if (targets.length === 0) {
        return (
            <div className="p-8">
                <p className="mb-4 text-gray-500">依頼主が登録されている請求先がありません</p>
                <ResetButton onClick={() => router.back()}>戻る</ResetButton>
            </div>
        )
    }

    // PDFプレビュー表示
    if (pdfUrl) {
        return (
            <div className="flex h-screen flex-col p-8">
                <div className="mb-4 flex justify-end gap-3">
                    <ResetButton
                        onClick={() => {
                            URL.revokeObjectURL(pdfUrl)
                            setPdfUrl(null)
                        }}
                    >
                        閉じる
                    </ResetButton>
                    <SearchButton isLoading={generating} onClick={handleGeneratePDF}>
                        PDFダウンロード
                    </SearchButton>
                </div>
                <iframe src={pdfUrl} className="h-[calc(100vh-100px)] w-full rounded border border-gray-300" />
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-3xl p-8">
            {generating && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-white/80 backdrop-blur-sm">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-700" />
                    <p className="text-sm text-gray-600">PDF を生成しています...</p>
                </div>
            )}
            <div className="mb-8 flex justify-end gap-3">
                <SearchButton isLoading={generating} onClick={handlePreviewPDF}>
                    PDFプレビュー
                </SearchButton>
                <CreateButton disabled={generating} onClick={handleGeneratePDF}>
                    {generating ? '生成中...' : 'PDFダウンロード'}
                </CreateButton>
                <ResetButton onClick={() => router.back()}>閉じる</ResetButton>
            </div>

            {/* PDF生成用コンテンツ（Puppeteer がこの id を参照） */}
            <div
                id={'flower-pdf-content'}
                className="bg-white text-black"
                style={{ fontFamily: '"Noto Serif JP", serif' }}
            >
                {targets.map((target, targetIndex) => {
                    const total = target.flowers.reduce((sum: number, f) => sum + f.amount, 0)
                    const tax = Math.round(total * 0.1)
                    const totalWithTax = total + tax
                    const docTitle = target.isPaid ? '領収証' : '請求書'
                    return (
                        <div
                            key={target.id}
                            style={{
                                pageBreakAfter: targetIndex < targets.length - 1 ? 'always' : 'auto',
                                marginBottom: targetIndex < targets.length - 1 ? 0 : '3rem',
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: 'white',
                                    paddingTop: '2rem',
                                    paddingBottom: '2rem',
                                    paddingLeft: '2rem',
                                    paddingRight: '2rem',
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                }}
                            >
                                <h1
                                    className="flex w-[12rem] justify-between border-b-2 border-black px-2 text-left text-2xl font-bold"
                                    style={{ fontFamily: '"Noto Sans JP", sans-serif', letterSpacing: '-0.1rem' }}
                                >
                                    {docTitle.split('').map((char, i) => (
                                        <span key={i} className="text-center">
                                            {char}
                                        </span>
                                    ))}
                                </h1>
                                <div className="text-right tracking-[0.4em]">
                                    {(() => {
                                        const d = new Date()
                                        return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
                                    })()}
                                </div>

                                <div className="mb-2 mt-4 flex items-center justify-between gap-2">
                                    <div className="w-[60%]">
                                        <div className="mb-2 w-[90%]">
                                            <div className="text-bold flex justify-between border-b border-black text-2xl">
                                                <span className="">{target.billToName}</span>
                                                <span>様</span>
                                            </div>
                                        </div>
                                        <div className="flex w-[90%] items-center justify-between border border-black text-3xl">
                                            <p className="border-r border-black px-2">
                                                <strong>金　額</strong>
                                            </p>
                                            <p className="px-2">
                                                <strong>¥{totalWithTax.toLocaleString()}</strong>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="w-[40%] text-center">
                                        {company && (
                                            <div className="flex items-center justify-start gap-2 border-0 border-black px-2 py-1 text-left">
                                                <div className="relative h-[52px] w-[48px] overflow-hidden border-0">
                                                    <Image
                                                        src={`/images/pdf_company_logo.png`}
                                                        alt={'玉泉院'}
                                                        fill
                                                        className="object-contain"
                                                        sizes="256px"
                                                    />
                                                </div>
                                                <div className="flex flex-col items-center justify-center gap-0 border-0 border-black text-left leading-[0.8]">
                                                    <p className="text-sm leading-[1]">
                                                        <strong>{company.companyName}</strong>
                                                    </p>
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-xs leading-[1.2]">
                                                            総合
                                                            <br />
                                                            葬祭
                                                        </p>
                                                        <p className="text-xl">沖縄</p>
                                                        <p className="text-3xl mb-1">玉泉院</p>
                                                    </div>
                                                    <p className="text-sm self-start leading-[1]">
                                                        {company.companyAddress}
                                                    </p>
                                                    <p className="text-sm self-start leading-[1]">
                                                        TEL: {company.companyTel}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-between gap-0">
                                    {/* 明細ブロック */}
                                    <div className="w-[70%] border-0 border-black">
                                        <table className="w-full border-collapse border text-sm">
                                            <thead>
                                                <tr>
                                                    <th className="w-[12rem] border border-l-0 border-t-0 border-black px-2 text-center">
                                                        <div className="mx-auto flex w-[6rem] justify-between">
                                                            {'品名'.split('').map((char, i) => (
                                                                <span key={i} className="text-center">
                                                                    {char}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </th>
                                                    <th className="w-[2rem] border border-l-0 border-t-0 border-black px-2 text-center">
                                                        {'数　量'}
                                                    </th>
                                                    <th className="w-[4rem] border border-l-0 border-t-0 border-black px-2 text-center">
                                                        <div className="mx-auto flex w-[4rem] justify-between">
                                                            {'金額'.split('').map((char, i) => (
                                                                <span key={i} className="text-center">
                                                                    {char}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {target.flowers.map((flower, index) => (
                                                    <tr key={index}>
                                                        <td className="border border-l-0 border-black px-2 py-1 text-left">
                                                            {`${flower.requesterName} 様`}
                                                        </td>
                                                        <td className="border border-l-0 border-black px-2 text-right">
                                                            {'1'}
                                                        </td>
                                                        <td className="border border-l-0 border-black px-2 text-right">
                                                            ¥{flower.amount.toLocaleString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                                {Array.from({ length: Math.max(0, 8 - target.flowers.length) }).map(
                                                    (_, i) => (
                                                        <tr key={`empty-${i}`}>
                                                            <td className="border border-l-0 border-black px-2 py-1">
                                                                &nbsp;
                                                            </td>
                                                            <td className="border border-l-0 border-black px-2">
                                                                &nbsp;
                                                            </td>
                                                            <td className="border border-l-0 border-black px-2">
                                                                &nbsp;
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                            {/* 金額合計 */}
                                            <tfoot className="border-0 border-t-2 border-black">
                                                <tr>
                                                    <th className="border border-l-0 border-black py-1 text-center">
                                                        <div className="mx-auto flex w-[6rem] justify-between">
                                                            {'消費税 10%'.split('').map((char, i) => (
                                                                <span key={i} className="text-center">
                                                                    {char}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </th>
                                                    <td className="border border-black py-1 text-center">&nbsp;</td>
                                                    <td className="border border-black px-2 py-1 text-right">
                                                        ¥{tax.toLocaleString()}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th className="border border-l-0 border-black py-1 text-center">
                                                        <div className="mx-auto flex w-[6rem] justify-between">
                                                            {'合計'.split('').map((char, i) => (
                                                                <span key={i} className="text-center">
                                                                    {char}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </th>
                                                    <td className="border border-black py-1 text-center">&nbsp;</td>
                                                    <td className="border border-black px-2 py-1 text-right">
                                                        ¥{totalWithTax.toLocaleString()}
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    {/* 右ブロック */}
                                    <div className="flex w-[30%] flex-col text-sm">
                                        {/* 施行日ブロック */}
                                        <table className="w-full border-collapse border border-black">
                                            <tbody>
                                                <tr className="border-b border-black">
                                                    <th className="border border-l-0 border-t-0 border-black px-2 text-center">
                                                        <div className="mx-auto flex w-[6rem] justify-between">
                                                            {'施行日'.split('').map((char, i) => (
                                                                <span key={i} className="text-center">
                                                                    {char}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </th>
                                                </tr>
                                                <tr className="border border-black">
                                                    <td className="p-2 text-right tracking-[0.25em]">
                                                        {target.isPaid && target.paidAt
                                                            ? (() => {
                                                                  const d = new Date(target.paidAt)
                                                                  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
                                                              })()
                                                            : '-'}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        {/* 備考: 可変エリア */}
                                        <div className="min-h-0 flex-1 overflow-hidden border border-t-0 border-black px-1 text-sm">
                                            <div>備考</div>
                                            <div className="overflow-hidden">
                                                <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                                                    {company && target.isPaid && (
                                                        <p>
                                                            <strong>登録番号: {company.companyNo}</strong>
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-1 flex justify-start gap-0">
                                    上記金額正に{target.isPaid ? '領収' : '入金'}致しました。
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
