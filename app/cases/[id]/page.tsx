'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { getCustomer, updateCustomer } from '@/lib/customers';
import { getCities, getTowns, AddressCity, AddressTown } from '@/lib/address';

export default function EditCustomerPage() {
  const router = useRouter();
  const params = useParams();
  const customerId = params.id as string;
  const [activeTab, setActiveTab] = useState<'deceased' | 'funeral' | 'membership'>('deceased');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cities, setCities] = useState<AddressCity[]>([]);
  const [towns, setTowns] = useState<AddressTown[]>([]);

  const [formData, setFormData] = useState<any>(null);
  const [hasEstimate, setHasEstimate] = useState(false);
  const [hasInvoice, setHasInvoice] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    loadData();
  }, [router, customerId]);

  const loadData = async () => {
    try {
      const [customerData, citiesData] = await Promise.all([
        getCustomer(customerId),
        getCities(),
      ]);
      setCities(citiesData);

      // 日付を安全に変換する関数（datetime-local入力用）
      // UTC時刻をローカルタイムゾーンに変換して表示
      const formatDateForInput = (dateValue: string | Date | null | undefined): string => {
        if (!dateValue) return '';
        try {
          const date = new Date(dateValue);
          if (isNaN(date.getTime())) return '';
          
          // UTC時刻をローカルタイムゾーンに変換
          // 年、月、日、時、分をローカルタイムゾーンで取得
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
          
          return `${year}-${month}-${day}T${hours}:${minutes}`;
        } catch {
          return '';
        }
      };

      // フォームデータに変換
      const formattedData = {
        receptionAt: formatDateForInput(customerData.receptionAt),
        deceasedName: customerData.deceasedName || '',
        deceasedLastName: customerData.deceasedLastName || '',
        deceasedFirstName: customerData.deceasedFirstName || '',
        gender: customerData.gender || '',
        age: customerData.age?.toString() || '',
        religion: customerData.religion || '',
        chiefMournerName: customerData.chiefMournerName || '',
        chiefMournerRelation: customerData.chiefMournerRelation || '',
        chiefMournerCityId: customerData.chiefMournerCityId || '',
        chiefMournerTownId: customerData.chiefMournerTownId || '',
        chiefMournerAddress: customerData.chiefMournerAddress || '',
        chiefMournerTel: customerData.chiefMournerTel || '',
        sameAsChiefMourner: false,
        payerName: customerData.payerName || '',
        payerRelation: customerData.payerRelation || '',
        payerAddress: customerData.payerAddress || '',
        payerTel: customerData.payerTel || '',
        pickupPlace: customerData.pickupPlace || '',
        wakeAt: formatDateForInput(customerData.wakeAt),
        wakePlace: customerData.wakePlace || '',
        departureAt: formatDateForInput(customerData.departureAt),
        departurePlace: customerData.departurePlace || '',
        funeralFrom: formatDateForInput(customerData.funeralFrom),
        funeralTo: formatDateForInput(customerData.funeralTo),
        funeralPlace: customerData.funeralPlace || '',
        returnAt: formatDateForInput(customerData.returnAt),
        returnPlace: customerData.returnPlace || '',
        notes: customerData.notes || '',
        memberCardNote: customerData.memberCardNote || '',
        memberships: customerData.memberships?.map((m: any) => ({
          rowNo: m.rowNo,
          memberNo: m.memberNo || '',
          joinedAt: formatDateForInput(m.joinedAt) ? formatDateForInput(m.joinedAt).split('T')[0] : '',
          memberName: m.memberName || '',
          courseUnits: m.courseUnits?.toString() || '',
          maturityAmount: m.maturityAmount?.toString() || '',
          paymentTimes: m.paymentTimes?.toString() || '',
          paymentAmount: m.paymentAmount?.toString() || '',
          salesStaffName: m.salesStaffName || '',
          relationToDeceased: m.relationToDeceased || '',
        })) || [
          { rowNo: 1, memberNo: '', joinedAt: '', memberName: '', courseUnits: '', maturityAmount: '', paymentTimes: '', paymentAmount: '', salesStaffName: '', relationToDeceased: '' },
          { rowNo: 2, memberNo: '', joinedAt: '', memberName: '', courseUnits: '', maturityAmount: '', paymentTimes: '', paymentAmount: '', salesStaffName: '', relationToDeceased: '' },
          { rowNo: 3, memberNo: '', joinedAt: '', memberName: '', courseUnits: '', maturityAmount: '', paymentTimes: '', paymentAmount: '', salesStaffName: '', relationToDeceased: '' },
        ],
      };

      setFormData(formattedData);
      setHasEstimate(customerData.estimates && customerData.estimates.length > 0);
      setHasInvoice(customerData.invoices && customerData.invoices.length > 0);

          // 市区町村が設定されている場合、町字を読み込む
          if (formattedData.chiefMournerCityId) {
            const townsData = await getTowns(formattedData.chiefMournerCityId);
            setTowns(townsData);
          }
    } catch (error) {
      console.error('Failed to load data:', error);
      alert('データの読み込みに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = async (cityId: string) => {
    setFormData({ ...formData, chiefMournerCityId: cityId, chiefMournerTownId: '' });
    if (cityId) {
      try {
        const townsData = await getTowns(cityId);
        setTowns(townsData);
      } catch (error) {
        console.error('Failed to load towns:', error);
      }
    } else {
      setTowns([]);
    }
  };

  const handleSameAsChiefMourner = (checked: boolean) => {
    setFormData({
      ...formData,
      sameAsChiefMourner: checked,
      payerName: checked ? formData.chiefMournerName : '',
      payerRelation: checked ? formData.chiefMournerRelation : '',
      payerAddress: checked ? formData.chiefMournerAddress : '',
      payerTel: checked ? formData.chiefMournerTel : '',
    });
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      // 日付を安全に変換する関数（ISO文字列用）
      // datetime-local入力はローカルタイムゾーンで解釈されるため、UTCに変換する
      const formatDateForISO = (dateValue: string | null | undefined): string | null => {
        if (!dateValue) return null;
        try {
          // datetime-local形式（YYYY-MM-DDTHH:mm）をローカルタイムゾーンとして解釈
          // 例: "2024-02-03T03:00" → ローカルタイムゾーン（JST）の2024-02-03 03:00として扱う
          const date = new Date(dateValue);
          if (isNaN(date.getTime())) return null;
          
          // toISOString()は自動的にUTCに変換する
          // ローカルタイムゾーン（JST）の時刻をUTCに変換するため、9時間引かれる
          // これは正しい動作（データベースにはUTCで保存）
          return date.toISOString();
        } catch {
          return null;
        }
      };

      const submitData = {
        ...formData,
        receptionAt: formatDateForISO(formData.receptionAt),
        age: formData.age ? parseInt(formData.age) : null,
        wakeAt: formatDateForISO(formData.wakeAt),
        departureAt: formatDateForISO(formData.departureAt),
        funeralFrom: formatDateForISO(formData.funeralFrom),
        funeralTo: formatDateForISO(formData.funeralTo),
        returnAt: formatDateForISO(formData.returnAt),
        memberships: formData.memberships.map((m: any) => ({
          ...m,
          rowNo: m.rowNo,
          joinedAt: m.joinedAt || null,
          courseUnits: m.courseUnits ? parseInt(m.courseUnits) : null,
          maturityAmount: m.maturityAmount ? parseInt(m.maturityAmount) : null,
          paymentTimes: m.paymentTimes ? parseInt(m.paymentTimes) : null,
          paymentAmount: m.paymentAmount ? parseInt(m.paymentAmount) : null,
        })),
      };
      await updateCustomer(customerId, submitData);
      alert('更新しました');
      router.push('/cases');
    } catch (error) {
      console.error('Failed to update customer:', error);
      alert('更新に失敗しました');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !formData) {
    return <div style={{ padding: '2rem' }}>読み込み中...</div>;
  }

  // 新規登録画面と同じフォーム構造を使用（簡略化のため、同じコンポーネントを共有する方が良いですが、今回は別ファイルにしています）
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>葬儀案件 編集</h1>

      {/* タブ */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '2px solid #ddd' }}>
        <button
          onClick={() => setActiveTab('deceased')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: activeTab === 'deceased' ? '#0070f3' : 'transparent',
            color: activeTab === 'deceased' ? 'white' : '#333',
            border: 'none',
            borderBottom: activeTab === 'deceased' ? '2px solid #0070f3' : 'none',
            cursor: 'pointer',
          }}
        >
          故人情報
        </button>
        <button
          onClick={() => setActiveTab('funeral')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: activeTab === 'funeral' ? '#0070f3' : 'transparent',
            color: activeTab === 'funeral' ? 'white' : '#333',
            border: 'none',
            borderBottom: activeTab === 'funeral' ? '2px solid #0070f3' : 'none',
            cursor: 'pointer',
          }}
        >
          葬儀情報
        </button>
        <button
          onClick={() => setActiveTab('membership')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: activeTab === 'membership' ? '#0070f3' : 'transparent',
            color: activeTab === 'membership' ? 'white' : '#333',
            border: 'none',
            borderBottom: activeTab === 'membership' ? '2px solid #0070f3' : 'none',
            cursor: 'pointer',
          }}
        >
          会員情報
        </button>
      </div>

      {/* 故人情報タブ */}
      {activeTab === 'deceased' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>受付日</label>
            <input
              type="datetime-local"
              value={formData.receptionAt}
              onChange={(e) => setFormData({ ...formData, receptionAt: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>故人名</label>
            <input
              type="text"
              value={formData.deceasedName}
              onChange={(e) => setFormData({ ...formData, deceasedName: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>故人姓</label>
            <input
              type="text"
              value={formData.deceasedLastName}
              onChange={(e) => setFormData({ ...formData, deceasedLastName: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>故人名（名前）</label>
            <input
              type="text"
              value={formData.deceasedFirstName}
              onChange={(e) => setFormData({ ...formData, deceasedFirstName: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>性別</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="">選択してください</option>
              <option value="MALE">男性</option>
              <option value="FEMALE">女性</option>
              <option value="OTHER">その他</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>行年</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>御宗旨</label>
            <input
              type="text"
              value={formData.religion}
              onChange={(e) => setFormData({ ...formData, religion: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <h3 style={{ marginBottom: '1rem' }}>喪主情報</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>喪主名</label>
                <input
                  type="text"
                  value={formData.chiefMournerName}
                  onChange={(e) => setFormData({ ...formData, chiefMournerName: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>喪主続柄</label>
                <input
                  type="text"
                  value={formData.chiefMournerRelation}
                  onChange={(e) => setFormData({ ...formData, chiefMournerRelation: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>市区町村</label>
                <select
                  value={formData.chiefMournerCityId}
                  onChange={(e) => handleCityChange(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
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
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>町字</label>
                <select
                  value={formData.chiefMournerTownId}
                  onChange={(e) => setFormData({ ...formData, chiefMournerTownId: e.target.value })}
                  disabled={!formData.chiefMournerCityId}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                >
                  <option value="">選択してください</option>
                  {towns.map((town) => (
                    <option key={town.id} value={town.id}>
                      {town.name}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>喪主住所</label>
                <input
                  type="text"
                  value={formData.chiefMournerAddress}
                  onChange={(e) => setFormData({ ...formData, chiefMournerAddress: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>喪主TEL</label>
                <input
                  type="tel"
                  value={formData.chiefMournerTel}
                  onChange={(e) => setFormData({ ...formData, chiefMournerTel: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
            </div>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <input
                type="checkbox"
                checked={formData.sameAsChiefMourner}
                onChange={(e) => handleSameAsChiefMourner(e.target.checked)}
              />
              喪主と同じ
            </label>
            <h3 style={{ marginBottom: '1rem' }}>御支払者情報</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>御支払者名</label>
                <input
                  type="text"
                  value={formData.payerName}
                  onChange={(e) => setFormData({ ...formData, payerName: e.target.value })}
                  disabled={formData.sameAsChiefMourner}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>御支払者続柄</label>
                <input
                  type="text"
                  value={formData.payerRelation}
                  onChange={(e) => setFormData({ ...formData, payerRelation: e.target.value })}
                  disabled={formData.sameAsChiefMourner}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>御支払者住所</label>
                <input
                  type="text"
                  value={formData.payerAddress}
                  onChange={(e) => setFormData({ ...formData, payerAddress: e.target.value })}
                  disabled={formData.sameAsChiefMourner}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>御支払者TEL</label>
                <input
                  type="tel"
                  value={formData.payerTel}
                  onChange={(e) => setFormData({ ...formData, payerTel: e.target.value })}
                  disabled={formData.sameAsChiefMourner}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 葬儀情報タブ */}
      {activeTab === 'funeral' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>引取場所</label>
            <input
              type="text"
              value={formData.pickupPlace}
              onChange={(e) => setFormData({ ...formData, pickupPlace: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>本通夜（日時）</label>
            <input
              type="datetime-local"
              value={formData.wakeAt}
              onChange={(e) => setFormData({ ...formData, wakeAt: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>本通夜（場所）</label>
            <input
              type="text"
              value={formData.wakePlace}
              onChange={(e) => setFormData({ ...formData, wakePlace: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>出棺（日時）</label>
            <input
              type="datetime-local"
              value={formData.departureAt}
              onChange={(e) => setFormData({ ...formData, departureAt: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>出棺（場所）</label>
            <input
              type="text"
              value={formData.departurePlace}
              onChange={(e) => setFormData({ ...formData, departurePlace: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>告別式（From）</label>
            <input
              type="datetime-local"
              value={formData.funeralFrom}
              onChange={(e) => setFormData({ ...formData, funeralFrom: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>告別式（To）</label>
            <input
              type="datetime-local"
              value={formData.funeralTo}
              onChange={(e) => setFormData({ ...formData, funeralTo: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>告別式（場所）</label>
            <input
              type="text"
              value={formData.funeralPlace}
              onChange={(e) => setFormData({ ...formData, funeralPlace: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>引上日（日時）</label>
            <input
              type="datetime-local"
              value={formData.returnAt}
              onChange={(e) => setFormData({ ...formData, returnAt: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>引上日（場所）</label>
            <input
              type="text"
              value={formData.returnPlace}
              onChange={(e) => setFormData({ ...formData, returnPlace: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>備考</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>会員証</label>
            <input
              type="text"
              value={formData.memberCardNote}
              onChange={(e) => setFormData({ ...formData, memberCardNote: e.target.value })}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
        </div>
      )}

      {/* 会員情報タブ */}
      {activeTab === 'membership' && (
        <div>
          {formData.memberships.map((membership: any, index: number) => (
            <div
              key={membership.rowNo}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '1rem',
              }}
            >
              <h3 style={{ marginBottom: '1rem' }}>会員情報 {membership.rowNo}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>会員番号</label>
                  <input
                    type="text"
                    value={membership.memberNo}
                    onChange={(e) => {
                      const newMemberships = [...formData.memberships];
                      newMemberships[index].memberNo = e.target.value;
                      setFormData({ ...formData, memberships: newMemberships });
                    }}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>入会月日</label>
                  <input
                    type="date"
                    value={membership.joinedAt}
                    onChange={(e) => {
                      const newMemberships = [...formData.memberships];
                      newMemberships[index].joinedAt = e.target.value;
                      setFormData({ ...formData, memberships: newMemberships });
                    }}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>会員名</label>
                  <input
                    type="text"
                    value={membership.memberName}
                    onChange={(e) => {
                      const newMemberships = [...formData.memberships];
                      newMemberships[index].memberName = e.target.value;
                      setFormData({ ...formData, memberships: newMemberships });
                    }}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>コース（口数）</label>
                  <input
                    type="number"
                    value={membership.courseUnits}
                    onChange={(e) => {
                      const newMemberships = [...formData.memberships];
                      newMemberships[index].courseUnits = e.target.value;
                      setFormData({ ...formData, memberships: newMemberships });
                    }}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>満期額</label>
                  <input
                    type="number"
                    value={membership.maturityAmount}
                    onChange={(e) => {
                      const newMemberships = [...formData.memberships];
                      newMemberships[index].maturityAmount = e.target.value;
                      setFormData({ ...formData, memberships: newMemberships });
                    }}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>入金回数</label>
                  <input
                    type="number"
                    value={membership.paymentTimes}
                    onChange={(e) => {
                      const newMemberships = [...formData.memberships];
                      newMemberships[index].paymentTimes = e.target.value;
                      setFormData({ ...formData, memberships: newMemberships });
                    }}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>入金額</label>
                  <input
                    type="number"
                    value={membership.paymentAmount}
                    onChange={(e) => {
                      const newMemberships = [...formData.memberships];
                      newMemberships[index].paymentAmount = e.target.value;
                      setFormData({ ...formData, memberships: newMemberships });
                    }}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>営業担当者</label>
                  <input
                    type="text"
                    value={membership.salesStaffName}
                    onChange={(e) => {
                      const newMemberships = [...formData.memberships];
                      newMemberships[index].salesStaffName = e.target.value;
                      setFormData({ ...formData, memberships: newMemberships });
                    }}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>故人との続柄</label>
                  <input
                    type="text"
                    value={membership.relationToDeceased}
                    onChange={(e) => {
                      const newMemberships = [...formData.memberships];
                      newMemberships[index].relationToDeceased = e.target.value;
                      setFormData({ ...formData, memberships: newMemberships });
                    }}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 関連機能へのリンク */}
      <div
        style={{
          backgroundColor: '#f5f5f5',
          padding: '1.5rem',
          borderRadius: '8px',
          marginTop: '2rem',
          marginBottom: '2rem',
        }}
      >
        <h3 style={{ marginBottom: '1rem' }}>関連機能</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => router.push(`/estimates/${customerId}`)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: hasEstimate ? '#17a2b8' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {hasEstimate ? '見積書を編集' : '見積書を作成'}
          </button>
          {hasEstimate && (
            <button
              onClick={() => router.push(`/invoices/${customerId}`)}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: hasInvoice ? '#ffc107' : '#6c757d',
                color: hasInvoice ? 'black' : 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {hasInvoice ? '請求書を編集' : '請求書を作成'}
            </button>
          )}
          <button
            onClick={() => router.push(`/flowers/${customerId}`)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            供花管理
          </button>
        </div>
      </div>

      {/* 操作ボタン */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'flex-end' }}>
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
        <button
          onClick={handleSubmit}
          disabled={saving}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: saving ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: saving ? 'not-allowed' : 'pointer',
          }}
        >
          {saving ? '更新中...' : '更新'}
        </button>
      </div>
    </div>
  );
}
