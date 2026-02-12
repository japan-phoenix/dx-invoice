'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { getFlowers, createFlower, updateFlower, deleteFlower, Flower, FlowerBillingTarget } from '@/lib/flowers';
import { getCustomer } from '@/lib/customers';
import { createFlowerTargetPayment, cancelFlowerTargetPayment } from '@/lib/payments';

export default function FlowersPage() {
  const router = useRouter();
  const params = useParams();
  const customerId = params.customerId as string;
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState<any>(null);
  const [targets, setTargets] = useState<FlowerBillingTarget[]>([]);
  const [editDialog, setEditDialog] = useState<{
    open: boolean;
    flower: Flower | null;
    targetId?: string;
  }>({ open: false, flower: null });
  const [formData, setFormData] = useState({
    requesterName: '',
    labelName: '',
    jointNames: '',
    billToName: '',
    billToAddress: '',
    billToTel: '',
    deliveryTo: '',
    amount: '',
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
      const [customerData, flowersData] = await Promise.all([
        getCustomer(customerId),
        getFlowers(customerId),
      ]);
      setCustomer(customerData);
      setTargets(flowersData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewFlower = () => {
    setFormData({
      requesterName: '',
      labelName: '',
      jointNames: '',
      billToName: '',
      billToAddress: '',
      billToTel: '',
      deliveryTo: '',
      amount: '',
    });
    setEditDialog({ open: true, flower: null });
  };

  const handleEditFlower = (flower: Flower) => {
    setFormData({
      requesterName: flower.requesterName,
      labelName: flower.labelName || '',
      jointNames: flower.jointNames || '',
      billToName: flower.billToName,
      billToAddress: flower.billToAddress,
      billToTel: flower.billToTel || '',
      deliveryTo: flower.deliveryTo || '',
      amount: flower.amount.toString(),
    });
    setEditDialog({ open: true, flower });
  };

  const handleSaveFlower = async () => {
    try {
      const data = {
        ...formData,
        amount: parseInt(formData.amount) || 0,
      };

      if (editDialog.flower) {
        await updateFlower(editDialog.flower.id, data);
      } else {
        await createFlower(customerId, data);
      }
      setEditDialog({ open: false, flower: null });
      loadData();
    } catch (error) {
      console.error('Failed to save flower:', error);
      alert('保存に失敗しました');
    }
  };

  const handleDeleteFlower = async (id: string) => {
    if (!confirm('削除してもよろしいですか？')) return;

    try {
      await deleteFlower(id);
      loadData();
    } catch (error) {
      console.error('Failed to delete flower:', error);
      alert('削除に失敗しました');
    }
  };

  const handlePayment = async (targetId: string, isPaid: boolean) => {
    try {
      if (isPaid) {
        await cancelFlowerTargetPayment(targetId);
      } else {
        await createFlowerTargetPayment(targetId);
      }
      loadData();
    } catch (error) {
      console.error('Failed to update payment:', error);
      alert('入金処理に失敗しました');
    }
  };

  const getTargetTotal = (target: FlowerBillingTarget) => {
    return target.flowers.reduce((sum, f) => sum + f.amount, 0);
  };

  const getTargetPaymentStatus = async (targetId: string) => {
    // TODO: APIから入金状態を取得
    return false;
  };

  if (loading) {
    return <div style={{ padding: '2rem' }}>読み込み中...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>供花一覧</h1>

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
        </div>
      )}

      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={handleNewFlower}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          新規登録
        </button>
        <button
          onClick={() => router.push(`/pdf/flower/${customerId}`)}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginLeft: '1rem',
          }}
        >
          請求書一括印刷
        </button>
      </div>

      {/* 請求先単位で表示 */}
      {targets.length === 0 ? (
        <p style={{ color: '#666' }}>供花が登録されていません</p>
      ) : (
        targets.map((target) => {
          const total = getTargetTotal(target);
          return (
            <div
              key={target.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  paddingBottom: '1rem',
                  borderBottom: '2px solid #ddd',
                }}
              >
                <div>
                  <h3 style={{ marginBottom: '0.5rem' }}>請求先: {target.billToName}</h3>
                  <p style={{ color: '#666', fontSize: '0.875rem' }}>
                    {target.billToAddress} {target.billToTel && `TEL: ${target.billToTel}`}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                    合計: ¥{total.toLocaleString()}
                  </p>
                  <button
                    onClick={() => handlePayment(target.id, false)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginTop: '0.5rem',
                    }}
                  >
                    入金完了
                  </button>
                  <button
                    onClick={() => handlePayment(target.id, true)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginTop: '0.5rem',
                      marginLeft: '0.5rem',
                    }}
                  >
                    入金取消
                  </button>
                </div>
              </div>

              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  backgroundColor: 'white',
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
                    <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>
                      配送先
                    </th>
                    <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'right' }}>
                      金額
                    </th>
                    <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'center' }}>
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {target.flowers.map((flower) => (
                    <tr key={flower.id}>
                      <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                        {flower.requesterName}
                      </td>
                      <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                        {flower.labelName || '-'}
                      </td>
                      <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                        {flower.jointNames || '-'}
                      </td>
                      <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                        {flower.deliveryTo || '-'}
                      </td>
                      <td style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'right' }}>
                        ¥{flower.amount.toLocaleString()}
                      </td>
                      <td style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'center' }}>
                        <button
                          onClick={() => handleEditFlower(flower)}
                          style={{
                            padding: '0.25rem 0.5rem',
                            backgroundColor: '#17a2b8',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            marginRight: '0.5rem',
                          }}
                        >
                          編集
                        </button>
                        <button
                          onClick={() => handleDeleteFlower(flower.id)}
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
                  ))}
                </tbody>
              </table>
            </div>
          );
        })
      )}

      {/* 編集ダイアログ */}
      {editDialog.open && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setEditDialog({ open: false, flower: null })}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              width: '90%',
              maxWidth: '600px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: '1.5rem' }}>
              {editDialog.flower ? '供花編集' : '供花新規登録'}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>依頼主 *</label>
                <input
                  type="text"
                  value={formData.requesterName}
                  onChange={(e) => setFormData({ ...formData, requesterName: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>名札</label>
                <input
                  type="text"
                  value={formData.labelName}
                  onChange={(e) => setFormData({ ...formData, labelName: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>連名</label>
                <input
                  type="text"
                  value={formData.jointNames}
                  onChange={(e) => setFormData({ ...formData, jointNames: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>請求先名 *</label>
                <input
                  type="text"
                  value={formData.billToName}
                  onChange={(e) => setFormData({ ...formData, billToName: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>請求先TEL</label>
                <input
                  type="tel"
                  value={formData.billToTel}
                  onChange={(e) => setFormData({ ...formData, billToTel: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>請求先住所 *</label>
                <input
                  type="text"
                  value={formData.billToAddress}
                  onChange={(e) => setFormData({ ...formData, billToAddress: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                  required
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>配送先</label>
                <input
                  type="text"
                  value={formData.deliveryTo}
                  onChange={(e) => setFormData({ ...formData, deliveryTo: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>金額 *</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  min="0"
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button
                onClick={() => setEditDialog({ open: false, flower: null })}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                キャンセル
              </button>
              <button
                onClick={handleSaveFlower}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
