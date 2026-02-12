/**
 * PDF生成ユーティリティ
 * jspdfとhtml2canvasを使用してPDFを生成
 */

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * HTML要素をPDFに変換してダウンロード
 * @param elementId - PDF化する要素のID
 * @param filename - ダウンロードするPDFファイル名
 * @param options - PDF生成オプション
 */
export async function generatePDF(
  elementId: string,
  filename: string,
  options?: {
    format?: [number, number]; // [width, height] in mm (A4 = [210, 297])
    orientation?: 'portrait' | 'landscape';
    margin?: number; // mm
  }
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`);
  }

  // オプションのデフォルト値
  const format = options?.format || [210, 297]; // A4
  const orientation = options?.orientation || 'portrait';
  const margin = options?.margin || 10;

  // html2canvasで要素をキャンバスに変換
  const canvas = await html2canvas(element, {
    scale: 2, // 高解像度
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });

  // PDFのサイズを計算
  const imgWidth = format[0] - margin * 2;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  // jsPDFでPDFを作成
  const pdf = new jsPDF({
    orientation,
    unit: 'mm',
    format: format,
  });

  // 画像をPDFに追加
  const imgData = canvas.toDataURL('image/png');
  const pageHeight = format[1] - margin * 2;
  let heightLeft = imgHeight;
  let position = margin;

  // 1ページ目を追加
  pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  // 複数ページ対応（高さが1ページを超える場合）
  while (heightLeft > 0) {
    position = -pageHeight + margin;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  // PDFをダウンロード
  pdf.save(filename);
}

/**
 * HTML要素をPDFに変換して新しいウィンドウで表示
 * @param elementId - PDF化する要素のID
 * @param options - PDF生成オプション
 */
export async function previewPDF(
  elementId: string,
  options?: {
    format?: [number, number];
    orientation?: 'portrait' | 'landscape';
    margin?: number;
  }
): Promise<string> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`);
  }

  const format = options?.format || [210, 297];
  const orientation = options?.orientation || 'portrait';
  const margin = options?.margin || 10;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });

  const imgWidth = format[0] - margin * 2;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  const pdf = new jsPDF({
    orientation,
    unit: 'mm',
    format: format,
  });

  const imgData = canvas.toDataURL('image/png');
  const pageHeight = format[1] - margin * 2;
  let heightLeft = imgHeight;
  let position = margin;

  // 1ページ目を追加
  pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  // 複数ページ対応
  while (heightLeft > 0) {
    position = -pageHeight + margin;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  // PDFのBlob URLを返す
  const pdfBlob = pdf.output('blob');
  return URL.createObjectURL(pdfBlob);
}
