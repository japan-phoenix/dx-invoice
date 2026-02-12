'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { getUsers, createUser, updateUser, User, CreateUserData, UpdateUserData } from '@/lib/users';

export default function UsersPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [searchName, setSearchName] = useState('');
  const [editDialog, setEditDialog] = useState<{
    open: boolean;
    user: User | null;
  }>({ open: false, user: null });
  const [formData, setFormData] = useState({
    name: '',
    tel: '',
    password: '',
    email: '',
    birthDate: '',
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    loadUsers();
  }, [router]);

  const loadUsers = async () => {
    try {
      const usersData = await getUsers(searchName || undefined);
      setUsers(usersData);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    loadUsers();
  };

  const handleNewUser = () => {
    setFormData({
      name: '',
      tel: '',
      password: '',
      email: '',
      birthDate: '',
    });
    setEditDialog({ open: true, user: null });
  };

  const handleEditUser = (user: User) => {
    setFormData({
      name: user.name,
      tel: user.tel,
      password: '', // パスワードは編集時は空にする
      email: user.email || '',
      birthDate: user.birthDate ? user.birthDate.split('T')[0] : '',
    });
    setEditDialog({ open: true, user });
  };

  const handleSave = async () => {
    try {
      if (editDialog.user) {
        // 更新
        const updateData: UpdateUserData = {
          name: formData.name,
          tel: formData.tel,
          email: formData.email || undefined,
          birthDate: formData.birthDate || undefined,
        };
        if (formData.password) {
          updateData.password = formData.password;
        }
        await updateUser(editDialog.user.id, updateData);
      } else {
        // 新規作成
        if (!formData.password) {
          alert('パスワードは必須です');
          return;
        }
        const createData: CreateUserData = {
          name: formData.name,
          tel: formData.tel,
          password: formData.password,
          email: formData.email || undefined,
          birthDate: formData.birthDate || undefined,
        };
        await createUser(createData);
      }
      setEditDialog({ open: false, user: null });
      loadUsers();
      alert(editDialog.user ? '更新しました' : '登録しました');
    } catch (error: any) {
      console.error('Failed to save user:', error);
      alert(error.response?.data?.message || '保存に失敗しました');
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('ja-JP');
  };

  if (loading && users.length === 0) {
    return <div style={{ padding: '2rem' }}>読み込み中...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>社員管理</h1>

      {/* 検索条件エリア */}
      <div
        style={{
          backgroundColor: '#f5f5f5',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              名前で検索
            </label>
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="名前を入力"
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handleSearch}
              style={{
                padding: '0.5rem 1.5rem',
                backgroundColor: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              検索
            </button>
            <button
              onClick={() => {
                setSearchName('');
                loadUsers();
              }}
              style={{
                padding: '0.5rem 1.5rem',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              リセット
            </button>
          </div>
        </div>
      </div>

      {/* 新規登録ボタン */}
      <div style={{ marginBottom: '1rem', textAlign: 'right' }}>
        <button
          onClick={handleNewUser}
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
      </div>

      {/* ユーザー一覧 */}
      <div
        style={{
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'left' }}>
                名前
              </th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'left' }}>
                TEL
              </th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'left' }}>
                Email
              </th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'left' }}>
                生年月日
              </th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                  社員が見つかりません
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.75rem' }}>{user.name}</td>
                  <td style={{ padding: '0.75rem' }}>{user.tel}</td>
                  <td style={{ padding: '0.75rem' }}>{user.email || '-'}</td>
                  <td style={{ padding: '0.75rem' }}>{formatDate(user.birthDate)}</td>
                  <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                    <button
                      onClick={() => handleEditUser(user)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#0070f3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      編集
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 編集ダイアログ */}
      {editDialog.open && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setEditDialog({ open: false, user: null })}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '90vh',
              overflow: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: '1.5rem' }}>
              {editDialog.user ? '社員編集' : '社員新規登録'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  名前 <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  value={formData.tel}
                  onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
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
                  パスワード {!editDialog.user && <span style={{ color: 'red' }}>*</span>}
                  {editDialog.user && <span style={{ fontSize: '0.875rem', color: '#666' }}>（変更する場合のみ入力）</span>}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  生年月日
                </label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setEditDialog({ open: false, user: null })}
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
                onClick={handleSave}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#0070f3',
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
