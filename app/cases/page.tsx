'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { searchCustomers, CustomerListItem, SearchCustomersParams } from '@/lib/customers';
import { getCities, getTowns, AddressCity, AddressTown } from '@/lib/address';
import { createInvoicePayment, cancelInvoicePayment } from '@/lib/payments';

export default function CasesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<CustomerListItem[]>([]);
  const [cities, setCities] = useState<AddressCity[]>([]);
  const [towns, setTowns] = useState<AddressTown[]>([]);
  const [searchParams, setSearchParams] = useState<SearchCustomersParams>({});
  const [paymentDialog, setPaymentDialog] = useState<{
    open: boolean;
    invoiceId: string | null;
    customerId: string | null;
    isPaid: boolean;
  }>({ open: false, invoiceId: null, customerId: null, isPaid: false });
  const [paymentData, setPaymentData] = useState({ paidAt: '', memo: '' });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    loadInitialData();
  }, [router]);

  // ページがフォーカスされたとき、またはページが表示されたときにデータを再読み込み
  useEffect(() => {
    const handleFocus = () => {
      if (isAuthenticated()) {
        loadInitialData();
      }
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isAuthenticated()) {
        loadInitialData();
      }
    };
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const loadInitialData = async () => {
    try {
      const [customersData, citiesData] = await Promise.all([
        searchCustomers({}),
        getCities(),
      ]);
      setCustomers(customersData);
      setCities(citiesData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = async (cityId: string) => {
    setSearchParams({ ...searchParams, cityId, townId: undefined });
    if (cityId) {
      const townsData = await getTowns(cityId);
      setTowns(townsData);
    } else {
      setTowns([]);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await searchCustomers(searchParams);
      setCustomers(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchParams({});
    setTowns([]);
    loadInitialData();
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      return date.toLocaleDateString('ja-JP');
    } catch {
      return '';
    }
  };

  const handlePaymentClick = (customer: CustomerListItem) => {
    if (!customer.invoiceId) return;
    setPaymentDialog({
      open: true,
      invoiceId: customer.invoiceId,
      customerId: customer.id,
      isPaid: customer.isPaid,
    });
    setPaymentData({
      paidAt: new Date().toISOString().split('T')[0],
      memo: '',
    });
  };

  const handlePaymentSave = async () => {
    if (!paymentDialog.invoiceId) return;
    try {
      if (paymentDialog.isPaid) {
        await cancelInvoicePayment(paymentDialog.invoiceId, paymentData);
      } else {
        await createInvoicePayment(paymentDialog.invoiceId, paymentData);
      }
      setPaymentDialog({ open: false, invoiceId: null, customerId: null, isPaid: false });
      handleSearch(); // 一覧を再読み込み
    } catch (error) {
      console.error('Payment failed:', error);
      alert('入金処理に失敗しました');
    }
  };

  const handlePaymentCancel = () => {
    setPaymentDialog({ open: false, invoiceId: null, customerId: null, isPaid: false });
  };

  if (loading && customers.length === 0) {
    return <div style={{ padding: '2rem' }}>読み込み中...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>葬儀案件検索一覧<div className="text-red-500 text-2xl">Tailwind OK</div></h1>

      {/* 検索条件エリア */}
      <div
        style={{
          backgroundColor: '#f5f5f5',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              市区町村
            </label>
            <select
              value={searchParams.cityId || ''}
              onChange={(e) => handleCityChange(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            >
              <option value="">選択してください</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              町字
            </label>
            <select
              value={searchParams.townId || ''}
              onChange={(e) =>
                setSearchParams({ ...searchParams, townId: e.target.value })
              }
              disabled={!searchParams.cityId}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            >
              <option value="">選択してください</option>
              {towns.map((town) => (
                <option key={town.id} value={town.id}>
                  {town.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              氏名（苗字）
            </label>
            <input
              type="text"
              value={searchParams.lastName || ''}
              onChange={(e) =>
                setSearchParams({ ...searchParams, lastName: e.target.value })
              }
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              氏名（名前）
            </label>
            <input
              type="text"
              value={searchParams.firstName || ''}
              onChange={(e) =>
                setSearchParams({ ...searchParams, firstName: e.target.value })
              }
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              受付日（From）
            </label>
            <input
              type="date"
              value={searchParams.receptionFrom || ''}
              onChange={(e) =>
                setSearchParams({ ...searchParams, receptionFrom: e.target.value })
              }
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              受付日（To）
            </label>
            <input
              type="date"
              value={searchParams.receptionTo || ''}
              onChange={(e) =>
                setSearchParams({ ...searchParams, receptionTo: e.target.value })
              }
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              葬儀日（From）
            </label>
            <input
              type="date"
              value={searchParams.funeralFrom || ''}
              onChange={(e) =>
                setSearchParams({ ...searchParams, funeralFrom: e.target.value })
              }
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              葬儀日（To）
            </label>
            <input
              type="date"
              value={searchParams.funeralTo || ''}
              onChange={(e) =>
                setSearchParams({ ...searchParams, funeralTo: e.target.value })
              }
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              入金状態
            </label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={searchParams.paid === true}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      paid: e.target.checked ? true : undefined,
                      unpaid: e.target.checked ? undefined : searchParams.unpaid,
                    })
                  }
                />
                入金済
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={searchParams.unpaid === true}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      unpaid: e.target.checked ? true : undefined,
                      paid: e.target.checked ? undefined : searchParams.paid,
                    })
                  }
                />
                未入金
              </label>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={handleSearch}
            disabled={loading}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
            }}
          >
            検索
          </button>
          <button
            onClick={handleReset}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#666',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            リセット
          </button>
          <button
            onClick={() => router.push('/cases/new')}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            新規登録
          </button>
        </div>
      </div>

      {/* 検索結果一覧 */}
      <div style={{ overflowX: 'auto' }}>
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
                氏名
              </th>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>
                行年
              </th>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>
                住所
              </th>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>
                受付日
              </th>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>
                葬儀日
              </th>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'center' }}>
                見積
              </th>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'center' }}>
                請求
              </th>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'center' }}>
                入金
              </th>
              <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'center' }}>
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  style={{ padding: '2rem', textAlign: 'center', color: '#666' }}
                >
                  検索結果がありません
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr
                  key={customer.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/cases/${customer.id}`)}
                >
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                    {customer.deceasedName}
                  </td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                    {customer.age ? `${customer.age}歳` : '-'}
                  </td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                    {customer.address}
                  </td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                    {formatDate(customer.receptionAt)}
                  </td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                    {formatDate(customer.funeralFrom)}
                  </td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'center' }}>
                    {customer.hasEstimate ? '○' : '-'}
                  </td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'center' }}>
                    {customer.hasInvoice ? '○' : '-'}
                  </td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'center' }}>
                    {customer.isPaid ? '○' : '-'}
                  </td>
                  <td
                    style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'center' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          router.push(`/estimates/${customer.id}`);
                        }}
                        style={{
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.75rem',
                          backgroundColor: customer.hasEstimate ? '#17a2b8' : '#6c757d',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        {customer.hasEstimate ? '見積' : '見積作成'}
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          router.push(`/invoices/${customer.id}`);
                        }}
                        style={{
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.75rem',
                          backgroundColor: customer.hasInvoice ? '#ffc107' : '#6c757d',
                          color: customer.hasInvoice ? 'black' : 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        {customer.hasInvoice ? '請求' : '請求作成'}
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          router.push(`/flowers/${customer.id}`);
                        }}
                        style={{
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.75rem',
                          backgroundColor: '#28a745',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        供花
                      </button>
                      {customer.hasInvoice && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePaymentClick(customer);
                          }}
                          style={{
                            padding: '0.25rem 0.5rem',
                            fontSize: '0.75rem',
                            backgroundColor: customer.isPaid ? '#6c757d' : '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                          }}
                        >
                          {customer.isPaid ? '取消' : '入金'}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 入金入力ダイアログ */}
      {paymentDialog.open && (
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
          onClick={handlePaymentCancel}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              width: '90%',
              maxWidth: '500px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: '1.5rem' }}>
              {paymentDialog.isPaid ? '入金取消' : '入金登録'}
            </h2>

            <div style={{ marginBottom: '1rem' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                }}
              >
                入金日
              </label>
              <input
                type="date"
                value={paymentData.paidAt}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, paidAt: e.target.value })
                }
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                }}
              >
                備考
              </label>
              <textarea
                value={paymentData.memo}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, memo: e.target.value })
                }
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={handlePaymentCancel}
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
                onClick={handlePaymentSave}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: paymentDialog.isPaid ? '#dc3545' : '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                {paymentDialog.isPaid ? '取消' : '保存'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
