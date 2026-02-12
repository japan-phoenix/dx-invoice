'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { getEstimate, getEstimates, createEstimate, updateEstimate, Estimate, EstimateItem } from '@/lib/estimates';
import { getCustomer } from '@/lib/customers';
import { getProducts, getProductVariants, ProductItem, ProductVariant } from '@/lib/products';

export default function EstimatePage() {
  const router = useRouter();
  const params = useParams();
  const customerId = params.customerId as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [customer, setCustomer] = useState<any>(null);
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [searchProductName, setSearchProductName] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  const [formData, setFormData] = useState({
    docNo: '',
    status: 'DRAFT',
    items: [] as EstimateItem[],
    cremationProcessType: '',
    altarPlaceType: '',
    ceilingHeight: '',
    estimateStaff: '',
    ceremonyStaff: '',
    transportStaff: '',
    decorationStaff: '',
    returnStaff: '',
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    loadData();
  }, [router, customerId]);

  const loadData = async () => {
    try {
      console.log('Loading data for customerId:', customerId);
      const [customerData, estimatesData] = await Promise.all([
        getCustomer(customerId),
        getEstimates(customerId),
      ]);
      setCustomer(customerData);
      
      console.log('Estimates data:', estimatesData);
      console.log('Estimates count:', estimatesData.length);

      if (estimatesData.length > 0) {
        console.log('Loading estimate detail for ID:', estimatesData[0].id);
        const estimateData = await getEstimate(estimatesData[0].id);
        console.log('Estimate detail loaded:', estimateData);
        setEstimate(estimateData);
        setFormData({
          docNo: estimateData.docNo || '',
          status: estimateData.status,
          items: estimateData.items || [],
          cremationProcessType: (estimateData as any).cremationProcessType || '',
          altarPlaceType: (estimateData as any).altarPlaceType || '',
          ceilingHeight: (estimateData as any).ceilingHeight || '',
          estimateStaff: (estimateData as any).estimateStaff || '',
          ceremonyStaff: (estimateData as any).ceremonyStaff || '',
          transportStaff: (estimateData as any).transportStaff || '',
          decorationStaff: (estimateData as any).decorationStaff || '',
          returnStaff: (estimateData as any).returnStaff || '',
        });
      } else {
        console.log('No estimates found for customerId:', customerId);
        setEstimate(null);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchProducts = async () => {
    try {
      const results = await getProducts(searchProductName);
      setProducts(results);
    } catch (error) {
      console.error('Failed to search products:', error);
    }
  };

  const handleSelectProduct = async (product: ProductItem) => {
    setSelectedProduct(product);
    if (product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    } else {
      setSelectedVariant(null);
    }
  };

  const handleAddItem = () => {
    if (!selectedProduct || !selectedVariant) {
      alert('商品と種類を選択してください');
      return;
    }

    const newItem: EstimateItem = {
      productItemId: selectedProduct.id,
      productVariantId: selectedVariant.id,
      description: '',
      unitPriceGeneral: selectedVariant.priceGeneral,
      unitPriceMember: selectedVariant.priceMember,
      qty: 1,
      amount: selectedVariant.priceGeneral,
      sortNo: formData.items.length,
      productItem: selectedProduct,
      productVariant: selectedVariant,
    };

    setFormData({
      ...formData,
      items: [...formData.items, newItem],
    });

    setSelectedProduct(null);
    setSelectedVariant(null);
    setSearchProductName('');
    setProducts([]);
  };

  const handleUpdateItem = (index: number, field: string, value: any) => {
    const newItems = [...formData.items];
    const item = { ...newItems[index] };

    if (field === 'qty') {
      item.qty = parseInt(value) || 0;
      item.amount = item.unitPriceGeneral * item.qty;
    } else if (field === 'description') {
      item.description = value;
    } else {
      (item as any)[field] = value;
    }

    newItems[index] = item;
    setFormData({ ...formData, items: newItems });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.amount, 0);
    const tax = Math.round(subtotal * 0.1);
    const total = subtotal + tax;
    const membershipPaidAmount = customer?.memberships?.reduce(
      (sum: number, m: any) => sum + (m.paymentAmount || 0),
      0,
    ) || 0;
    const grandTotal = Math.max(0, total - membershipPaidAmount);

    return { subtotal, tax, total, membershipPaidAmount, grandTotal };
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const totals = calculateTotals();
      const data = {
        ...formData,
        ...totals,
        items: formData.items.map((item, index) => ({
          ...item,
          sortNo: index,
        })),
      };

      if (estimate) {
        await updateEstimate(estimate.id, data);
        alert('更新しました');
        // 更新後は見積書編集画面に留まる（データを再読み込み）
        await loadData();
      } else {
        const newEstimate = await createEstimate(customerId, data);
        alert('登録しました');
        // 新規作成後は見積書編集画面に遷移（データを再読み込み）
        await loadData();
      }
    } catch (error) {
      console.error('Failed to save:', error);
      alert('保存に失敗しました');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '2rem' }}>読み込み中...</div>;
  }

  const totals = calculateTotals();

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>見積書 {estimate ? '編集' : '作成'}</h1>

      {/* ヘッダー情報 */}
      {customer && (
        <div
          style={{
            backgroundColor: '#f5f5f5',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '2rem',
          }}
        >
          <p><strong>故人名:</strong> {customer.deceasedName}</p>
          <p><strong>受付日:</strong> {customer.receptionAt ? new Date(customer.receptionAt).toLocaleDateString('ja-JP') : ''}</p>
          <p><strong>喪主名:</strong> {customer.chiefMournerName}</p>
          <p><strong>住所:</strong> {customer.chiefMournerAddress}</p>
        </div>
      )}

      {/* 品目検索・追加 */}
      <div
        style={{
          backgroundColor: '#f9f9f9',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem',
        }}
      >
        <h3 style={{ marginBottom: '1rem' }}>品目追加</h3>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="品目名で検索"
            value={searchProductName}
            onChange={(e) => setSearchProductName(e.target.value)}
            style={{
              flex: 1,
              minWidth: '200px',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
          <button
            onClick={handleSearchProducts}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            検索
          </button>
        </div>

        {products.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>品目選択</label>
            <select
              value={selectedProduct?.id || ''}
              onChange={(e) => {
                const product = products.find((p) => p.id === e.target.value);
                if (product) handleSelectProduct(product);
              }}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            >
              <option value="">選択してください</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedProduct && selectedProduct.variants.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>種類選択</label>
            <select
              value={selectedVariant?.id || ''}
              onChange={(e) => {
                const variant = selectedProduct.variants.find((v) => v.id === e.target.value);
                if (variant) setSelectedVariant(variant);
              }}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            >
              {selectedProduct.variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.name} (一般: ¥{variant.priceGeneral.toLocaleString()}, 会員: ¥{variant.priceMember.toLocaleString()})
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedProduct && selectedVariant && (
          <button
            onClick={handleAddItem}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            ＋ 明細行追加
          </button>
        )}
      </div>

      {/* 明細一覧 */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>明細</h3>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: 'white',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>品目</th>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>種類</th>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>摘要</th>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>一般単価</th>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>会員単価</th>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>個数</th>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>金額</th>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {formData.items.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                  明細がありません
                </td>
              </tr>
            ) : (
              formData.items.map((item, index) => (
                <tr key={index}>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                    {item.productItem?.name || '-'}
                  </td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                    {item.productVariant?.name || '-'}
                  </td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                    <input
                      type="text"
                      value={item.description || ''}
                      onChange={(e) => handleUpdateItem(index, 'description', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.25rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                      }}
                    />
                  </td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                    ¥{item.unitPriceGeneral.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                    ¥{item.unitPriceMember.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) => handleUpdateItem(index, 'qty', e.target.value)}
                      min="0"
                      style={{
                        width: '80px',
                        padding: '0.25rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                      }}
                    />
                  </td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                    ¥{item.amount.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                    <button
                      onClick={() => handleRemoveItem(index)}
                      style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 合計エリア */}
      <div
        style={{
          backgroundColor: '#f9f9f9',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem',
        }}
      >
        <h3 style={{ marginBottom: '1rem' }}>合計</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', maxWidth: '500px' }}>
          <div><strong>小計:</strong></div>
          <div>¥{totals.subtotal.toLocaleString()}</div>
          <div><strong>消費税 (10%):</strong></div>
          <div>¥{totals.tax.toLocaleString()}</div>
          <div><strong>合計:</strong></div>
          <div>¥{totals.total.toLocaleString()}</div>
          <div><strong>会費入金額:</strong></div>
          <div>¥{totals.membershipPaidAmount.toLocaleString()}</div>
          <div><strong>差引合計:</strong></div>
          <div>¥{totals.grandTotal.toLocaleString()}</div>
        </div>
      </div>

      {/* その他項目 */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>その他</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>火葬許可証手続</label>
            <select
              value={formData.cremationProcessType}
              onChange={(e) => setFormData({ ...formData, cremationProcessType: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="">選択してください</option>
              <option value="FAMILY">喪家</option>
              <option value="NEIGHBORHOOD">隣組</option>
              <option value="COMPANY">自社代行</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>祭壇設置場所</label>
            <select
              value={formData.altarPlaceType}
              onChange={(e) => setFormData({ ...formData, altarPlaceType: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="">選択してください</option>
              <option value="HOME">自宅</option>
              <option value="FUNERAL_HALL">斎場</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>天井高</label>
            <input
              type="text"
              value={formData.ceilingHeight}
              onChange={(e) => setFormData({ ...formData, ceilingHeight: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>見積担当</label>
            <input
              type="text"
              value={formData.estimateStaff}
              onChange={(e) => setFormData({ ...formData, estimateStaff: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>式担当</label>
            <input
              type="text"
              value={formData.ceremonyStaff}
              onChange={(e) => setFormData({ ...formData, ceremonyStaff: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>搬送担当</label>
            <input
              type="text"
              value={formData.transportStaff}
              onChange={(e) => setFormData({ ...formData, transportStaff: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>飾り担当</label>
            <input
              type="text"
              value={formData.decorationStaff}
              onChange={(e) => setFormData({ ...formData, decorationStaff: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>引上担当</label>
            <input
              type="text"
              value={formData.returnStaff}
              onChange={(e) => setFormData({ ...formData, returnStaff: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
        </div>
      </div>

      {/* 操作ボタン */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
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
        {estimate && (
          <button
            onClick={() => router.push(`/pdf/estimate/${estimate.id}`)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            PDFプレビュー
          </button>
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: saving ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: saving ? 'not-allowed' : 'pointer',
          }}
        >
          {saving ? '保存中...' : estimate ? '更新' : '登録'}
        </button>
      </div>
    </div>
  );
}
