'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { createCustomer } from '@/lib/customers';
import { getCities, getTowns, AddressCity, AddressTown } from '@/lib/address';

export default function NewCustomerPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'deceased' | 'funeral' | 'membership'>('deceased');
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<AddressCity[]>([]);
  const [towns, setTowns] = useState<AddressTown[]>([]);

  const [formData, setFormData] = useState({
    // 故人情報
    receptionAt: '',
    deceasedName: '',
    deceasedLastName: '',
    deceasedFirstName: '',
    gender: '',
    age: '',
    religion: '',
    chiefMournerName: '',
    chiefMournerRelation: '',
    chiefMournerCityId: '',
    chiefMournerTownId: '',
    chiefMournerAddress: '',
    chiefMournerTel: '',
    sameAsChiefMourner: false,
    payerName: '',
    payerRelation: '',
    payerAddress: '',
    payerTel: '',
    // 葬儀情報
    pickupPlace: '',
    wakeAt: '',
    wakePlace: '',
    departureAt: '',
    departurePlace: '',
    funeralFrom: '',
    funeralTo: '',
    funeralPlace: '',
    returnAt: '',
    returnPlace: '',
    notes: '',
    memberCardNote: '',
    // 会員情報
    memberships: [
      { rowNo: 1, memberNo: '', joinedAt: '', memberName: '', courseUnits: '', maturityAmount: '', paymentTimes: '', paymentAmount: '', salesStaffName: '', relationToDeceased: '' },
      { rowNo: 2, memberNo: '', joinedAt: '', memberName: '', courseUnits: '', maturityAmount: '', paymentTimes: '', paymentAmount: '', salesStaffName: '', relationToDeceased: '' },
      { rowNo: 3, memberNo: '', joinedAt: '', memberName: '', courseUnits: '', maturityAmount: '', paymentTimes: '', paymentAmount: '', salesStaffName: '', relationToDeceased: '' },
    ],
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    loadCities();
  }, [router]);

  const loadCities = async () => {
    try {
      const citiesData = await getCities();
      setCities(citiesData);
    } catch (error) {
      console.error('Failed to load cities:', error);
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
    setLoading(true);
    try {
      const submitData = {
        ...formData,
        receptionAt: formData.receptionAt ? new Date(formData.receptionAt).toISOString() : null,
        age: formData.age ? parseInt(formData.age) : null,
        wakeAt: formData.wakeAt ? new Date(formData.wakeAt).toISOString() : null,
        departureAt: formData.departureAt ? new Date(formData.departureAt).toISOString() : null,
        funeralFrom: formData.funeralFrom ? new Date(formData.funeralFrom).toISOString() : null,
        funeralTo: formData.funeralTo ? new Date(formData.funeralTo).toISOString() : null,
        returnAt: formData.returnAt ? new Date(formData.returnAt).toISOString() : null,
        memberships: formData.memberships.map((m) => ({
          ...m,
          rowNo: m.rowNo,
          joinedAt: m.joinedAt || null,
          courseUnits: m.courseUnits ? parseInt(m.courseUnits) : null,
          maturityAmount: m.maturityAmount ? parseInt(m.maturityAmount) : null,
          paymentTimes: m.paymentTimes ? parseInt(m.paymentTimes) : null,
          paymentAmount: m.paymentAmount ? parseInt(m.paymentAmount) : null,
        })),
      };
      const result = await createCustomer(submitData);
      router.push(`/cases/${result.id}`);
    } catch (error) {
      console.error('Failed to create customer:', error);
      alert('登録に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>葬儀案件 新規登録</h1>

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
          {formData.memberships.map((membership, index) => (
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
          disabled={loading}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: loading ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? '登録中...' : '登録'}
        </button>
      </div>
    </div>
  );
}
