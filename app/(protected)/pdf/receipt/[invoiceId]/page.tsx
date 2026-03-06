'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getInvoice } from '@/lib/invoices'
import { getProducts } from '@/lib/products'
import { CreateButton } from '@/components/button/CreateButton'
import { ResetButton } from '@/components/button/ResetButton'
import { SearchButton } from '@/components/button/SearchButton'
import { toast } from '@/hooks/use-toast'
import { PdfReceiptLayout } from '@/app/(protected)/pdf/components/PdfReceiptLayout'

export default function ReceiptPdfPage() {
    const router = useRouter()
    const params = useParams()
    const invoiceId = params.invoiceId as string
    const [loading, setLoading] = useState(true)
    const [invoice, setInvoice] = useState<any>(null)
    const [products, setProducts] = useState<any[]>([])
    const [pdfUrl, setPdfUrl] = useState<string | null>(null)
    const [generating, setGenerating] = useState(false)

    useEffect(() => {
        loadData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoiceId])

    const loadData = async () => {
        try {
            const [invoiceData, productsData] = await Promise.all([getInvoice(invoiceId), getProducts()])
            setInvoice(invoiceData)
            setProducts(productsData)
        } catch (error) {
            console.error('Failed to load invoice:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleGeneratePDF = async () => {
        setGenerating(true)
        try {
            const res = await fetch(`/api/pdf/receipt/${invoiceId}?download`)
            if (!res.ok) throw new Error(await res.text())
            const blob = await res.blob()
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `領収書_${invoice?.docNo || invoiceId}_${new Date().toISOString().split('T')[0]}.pdf`
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
            const res = await fetch(`/api/pdf/receipt/${invoiceId}`)
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

    if (!invoice) {
        return <div className="p-8">請求書が見つかりません</div>
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
        <div className="mx-auto max-w-2xl p-8">
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

            {/* 領収書レイアウト（PDF生成用） */}
            <PdfReceiptLayout contentId="receipt-pdf-content" document={invoice} products={products} />
        </div>
    )
}
