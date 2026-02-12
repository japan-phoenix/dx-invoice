'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { getInvoice } from '@/lib/invoices';
import { getCompanyProfile } from '@/lib/company';
import { generatePDF, previewPDF } from '@/lib/pdf-utils';

export default function InvoicePdfPage() {
  const router = useRouter();
  const params = useParams();
  const invoiceId = params.invoiceId as string;
  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState<any>(null);
  const [company, setCompany] = useState<any>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    loadData();
  }, [router, invoiceId]);

  const loadData = async () => {
    try {
      const [invoiceData, companyData] = await Promise.all([
        getInvoice(invoiceId),
        getCompanyProfile(),
      ]);
      setInvoice(invoiceData);
      setCompany(companyData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePDF = async () => {
    if (!pdfContainerRef.current) return;
    
    setGenerating(true);
    try {
      const filename = `請求書_${invoice?.docNo || invoiceId}_${new Date().toISOString().split('T')[0]}.pdf`;
      await generatePDF('invoice-pdf-content', filename);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('PDFの生成に失敗しました');
    } finally {
      setGenerating(false);
    }
  };

  const handlePreviewPDF = async () => {
    if (!pdfContainerRef.current) return;
    
    setGenerating(true);
    try {
      const url = await previewPDF('invoice-pdf-content');
      setPdfUrl(url);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('PDFの生成に失敗しました');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '2rem' }}>読み込み中...</div>;
  }

  if (!invoice) {
    return <div style={{ padding: '2rem' }}>請求書が見つかりません</div>;
  }

  // PDFプレビュー表示
  if (pdfUrl) {
    return (
      <div style={{ padding: '2rem', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '1rem', textAlign: 'right' }}>
          <button
            onClick={() => setPdfUrl(null)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '1rem',
            }}
          >
            閉じる
          </button>
          <button
            onClick={handleGeneratePDF}
            disabled={generating}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: generating ? '#ccc' : '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: generating ? 'not-allowed' : 'pointer',
            }}
          >
            {generating ? '生成中...' : 'PDFダウンロード'}
          </button>
        </div>
        <iframe
          src={pdfUrl}
          style={{
            width: '100%',
            height: 'calc(100vh - 100px)',
            border: '1px solid #ddd',
            borderRadius: '4px',
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem', textAlign: 'right' }}>
        <button
          onClick={handlePreviewPDF}
          disabled={generating}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: generating ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: generating ? 'not-allowed' : 'pointer',
            marginRight: '1rem',
          }}
        >
          {generating ? '生成中...' : 'PDFプレビュー'}
        </button>
        <button
          onClick={handleGeneratePDF}
          disabled={generating}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: generating ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: generating ? 'not-allowed' : 'pointer',
            marginRight: '1rem',
          }}
        >
          {generating ? '生成中...' : 'PDFダウンロード'}
        </button>
        <button
          onClick={() => router.back()}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          閉じる
        </button>
      </div>

      {/* 請求書レイアウト（PDF生成用） */}
      <div
        id="invoice-pdf-content"
        ref={pdfContainerRef}
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          border: '1px solid #ddd',
          borderRadius: '8px',
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>家御葬儀請求書</h1>

        {company && (
          <div style={{ marginBottom: '2rem', textAlign: 'right' }}>
            <p><strong>{company.companyName}</strong></p>
            <p>{company.companyAddress}</p>
            <p>TEL: {company.companyTel}</p>
          </div>
        )}

        {invoice.customer && (
          <div style={{ marginBottom: '2rem' }}>
            <p><strong>故人名:</strong> {invoice.customer.deceasedName}</p>
            <p><strong>受付日:</strong> {invoice.customer.receptionAt ? new Date(invoice.customer.receptionAt).toLocaleDateString('ja-JP') : ''}</p>
            <p><strong>喪主名:</strong> {invoice.customer.chiefMournerName}</p>
            <p><strong>住所:</strong> {invoice.customer.chiefMournerAddress}</p>
          </div>
        )}

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '2rem',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>
                品目
              </th>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>
                摘要
              </th>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'right' }}>
                数量
              </th>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'right' }}>
                単価
              </th>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'right' }}>
                金額
              </th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item: any, index: number) => (
              <tr key={index}>
                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                  {item.productItem?.name || '-'} {item.productVariant?.name || ''}
                </td>
                <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                  {item.description || '-'}
                </td>
                <td style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'right' }}>
                  {item.qty}
                </td>
                <td style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'right' }}>
                  ¥{item.unitPriceGeneral.toLocaleString()}
                </td>
                <td style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'right' }}>
                  ¥{item.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ textAlign: 'right', marginBottom: '2rem' }}>
          <p>小計: ¥{invoice.subtotal.toLocaleString()}</p>
          <p>消費税 (10%): ¥{invoice.tax.toLocaleString()}</p>
          <p><strong>合計: ¥{invoice.total.toLocaleString()}</strong></p>
          <p>会費入金額: ¥{invoice.membershipPaidAmount.toLocaleString()}</p>
          <p><strong>差引合計: ¥{invoice.grandTotal.toLocaleString()}</strong></p>
        </div>

        {company && (
          <div style={{ marginTop: '3rem', fontSize: '0.875rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>
            <p><strong>振込先:</strong></p>
            {company.bank1Name && (
              <p>
                {company.bank1Name} {company.bank1Branch} {company.bank1Type} {company.bank1Account} {company.bank1Holder}
              </p>
            )}
            {company.bank2Name && (
              <p>
                {company.bank2Name} {company.bank2Branch} {company.bank2Type} {company.bank2Account} {company.bank2Holder}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
