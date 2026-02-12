'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { getCompanyProfile, updateCompanyProfile, CompanyProfile, UpdateCompanyProfileData } from '@/lib/company';

export default function CompanyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<UpdateCompanyProfileData>({
    companyName: '',
    companyAddress: '',
    companyTel: '',
    companyFax: '',
    repTitle: '',
    repName: '',
    bank1Name: '',
    bank1Branch: '',
    bank1Type: '',
    bank1Account: '',
    bank1Holder: '',
    bank2Name: '',
    bank2Branch: '',
    bank2Type: '',
    bank2Account: '',
    bank2Holder: '',
    bank3Name: '',
    bank3Branch: '',
    bank3Type: '',
    bank3Account: '',
    bank3Holder: '',
    bank4Name: '',
    bank4Branch: '',
    bank4Type: '',
    bank4Account: '',
    bank4Holder: '',
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    loadData();
  }, [router]);

  const loadData = async () => {
    try {
      const profile = await getCompanyProfile();
      setFormData({
        companyName: profile.companyName || '',
        companyAddress: profile.companyAddress || '',
        companyTel: profile.companyTel || '',
        companyFax: profile.companyFax || '',
        repTitle: profile.repTitle || '',
        repName: profile.repName || '',
        bank1Name: profile.bank1Name || '',
        bank1Branch: profile.bank1Branch || '',
        bank1Type: profile.bank1Type || '',
        bank1Account: profile.bank1Account || '',
        bank1Holder: profile.bank1Holder || '',
        bank2Name: profile.bank2Name || '',
        bank2Branch: profile.bank2Branch || '',
        bank2Type: profile.bank2Type || '',
        bank2Account: profile.bank2Account || '',
        bank2Holder: profile.bank2Holder || '',
        bank3Name: profile.bank3Name || '',
        bank3Branch: profile.bank3Branch || '',
        bank3Type: profile.bank3Type || '',
        bank3Account: profile.bank3Account || '',
        bank3Holder: profile.bank3Holder || '',
        bank4Name: profile.bank4Name || '',
        bank4Branch: profile.bank4Branch || '',
        bank4Type: profile.bank4Type || '',
        bank4Account: profile.bank4Account || '',
        bank4Holder: profile.bank4Holder || '',
      });
    } catch (error) {
      console.error('Failed to load company profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.companyName || !formData.companyAddress || !formData.companyTel) {
      alert('会社名、住所、TELは必須です');
      return;
    }

    setSaving(true);
    try {
      await updateCompanyProfile(formData);
      alert('更新しました');
    } catch (error: any) {
      console.error('Failed to update company profile:', error);
      alert(error.response?.data?.message || '更新に失敗しました');
    } finally {
      setSaving(false);
    }
  };

  const renderBankFields = (bankNumber: 1 | 2 | 3 | 4) => {
    const prefix = `bank${bankNumber}`;
    return (
      <div
        key={bankNumber}
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '1.5rem',
          marginBottom: '1rem',
        }}
      >
        <h3 style={{ marginBottom: '1rem' }}>振込先{bankNumber}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>銀行名</label>
            <input
              type="text"
              value={formData[`${prefix}Name` as keyof UpdateCompanyProfileData] as string || ''}
              onChange={(e) => setFormData({ ...formData, [`${prefix}Name`]: e.target.value })}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>支店名</label>
            <input
              type="text"
              value={formData[`${prefix}Branch` as keyof UpdateCompanyProfileData] as string || ''}
              onChange={(e) => setFormData({ ...formData, [`${prefix}Branch`]: e.target.value })}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>口座種別</label>
            <select
              value={formData[`${prefix}Type` as keyof UpdateCompanyProfileData] as string || ''}
              onChange={(e) => setFormData({ ...formData, [`${prefix}Type`]: e.target.value })}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            >
              <option value="">選択してください</option>
              <option value="普通">普通</option>
              <option value="当座">当座</option>
              <option value="貯蓄">貯蓄</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>口座番号</label>
            <input
              type="text"
              value={formData[`${prefix}Account` as keyof UpdateCompanyProfileData] as string || ''}
              onChange={(e) => setFormData({ ...formData, [`${prefix}Account`]: e.target.value })}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>口座名義</label>
            <input
              type="text"
              value={formData[`${prefix}Holder` as keyof UpdateCompanyProfileData] as string || ''}
              onChange={(e) => setFormData({ ...formData, [`${prefix}Holder`]: e.target.value })}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div style={{ padding: '2rem' }}>読み込み中...</div>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>自社情報管理</h1>

      {/* 基本情報 */}
      <div
        style={{
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '2rem',
          marginBottom: '2rem',
        }}
      >
        <h2 style={{ marginBottom: '1.5rem' }}>基本情報</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              会社名 <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              住所 <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.companyAddress}
              onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              TEL <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="tel"
              value={formData.companyTel}
              onChange={(e) => setFormData({ ...formData, companyTel: e.target.value })}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              FAX
            </label>
            <input
              type="tel"
              value={formData.companyFax}
              onChange={(e) => setFormData({ ...formData, companyFax: e.target.value })}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              代表者役職
            </label>
            <input
              type="text"
              value={formData.repTitle}
              onChange={(e) => setFormData({ ...formData, repTitle: e.target.value })}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              代表者名
            </label>
            <input
              type="text"
              value={formData.repName}
              onChange={(e) => setFormData({ ...formData, repName: e.target.value })}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>
        </div>
      </div>

      {/* 振込先情報 */}
      <div
        style={{
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '2rem',
          marginBottom: '2rem',
        }}
      >
        <h2 style={{ marginBottom: '1.5rem' }}>振込先情報（最大4件）</h2>
        {[1, 2, 3, 4].map((bankNumber) => renderBankFields(bankNumber as 1 | 2 | 3 | 4))}
      </div>

      {/* 保存ボタン */}
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
        <button
          onClick={handleSave}
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
          {saving ? '保存中...' : '保存'}
        </button>
      </div>
    </div>
  );
}
