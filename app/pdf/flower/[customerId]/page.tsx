'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { getFlowers } from '@/lib/flowers';
import { getCompanyProfile } from '@/lib/company';
import { generatePDF, previewPDF } from '@/lib/pdf-utils';

export default function FlowerPdfPage() {
  const router = useRouter();
  const params = useParams();
  const customerId = params.customerId as string;
  const [loading, setLoading] = useState(true);
  const [targets, setTargets] = useState<any[]>([]);
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
  }, [router, customerId]);

  const loadData = async () => {
    try {
      const [flowersData, companyData] = await Promise.all([
        getFlowers(customerId),
        getCompanyProfile(),
      ]);
      setTargets(flowersData);
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
      const filename = `供花請求書_${customerId}_${new Date().toISOString().split('T')[0]}.pdf`;
      await generatePDF('flower-pdf-content', filename);
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
      const url = await previewPDF('flower-pdf-content');
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
    <div style={{ padding: '2rem' }}>
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

      {/* 請求先単位で印刷（PDF生成用） */}
      <div id="flower-pdf-content" ref={pdfContainerRef}>
      {targets.map((target, targetIndex) => {
        const total = target.flowers.reduce((sum: number, f: any) => sum + f.amount, 0);
        return (
          <div
            key={target.id}
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              marginBottom: '3rem',
              pageBreakAfter: targetIndex < targets.length - 1 ? 'always' : 'auto',
            }}
          >
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>供花請求書</h1>

            {company && (
              <div style={{ marginBottom: '2rem', textAlign: 'right' }}>
                <p><strong>{company.companyName}</strong></p>
                <p>{company.companyAddress}</p>
                <p>TEL: {company.companyTel}</p>
              </div>
            )}

            <div style={{ marginBottom: '2rem' }}>
              <p><strong>請求先:</strong> {target.billToName}</p>
              <p><strong>住所:</strong> {target.billToAddress}</p>
              {target.billToTel && <p><strong>TEL:</strong> {target.billToTel}</p>}
            </div>

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
                    依頼主
                  </th>
                  <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>
                    名札
                  </th>
                  <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>
                    連名
                  </th>
                  <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'right' }}>
                    金額
                  </th>
                </tr>
              </thead>
              <tbody>
                {target.flowers.map((flower: any, index: number) => (
                  <tr key={index}>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                      {flower.requesterName}
                    </td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                      {flower.labelName || '-'}
                    </td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                      {flower.jointNames || '-'}
                    </td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'right' }}>
                      ¥{flower.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ textAlign: 'right', marginBottom: '2rem' }}>
              <p><strong>合計: ¥{total.toLocaleString()}</strong></p>
            </div>

            {company && (
              <div style={{ marginTop: '3rem', fontSize: '0.875rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>
                <p><strong>振込先:</strong></p>
                {company.bank1Name && (
                  <p>
                    {company.bank1Name} {company.bank1Branch} {company.bank1Type} {company.bank1Account} {company.bank1Holder}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
      </div>
    </div>
  );
}
