'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/lib/auth';

export default function Navigation() {
  const pathname = usePathname();

  // ログインページではナビゲーションを表示しない
  if (pathname === '/login') {
    return null;
  }

  const navItems = [
    { href: '/cases', label: '案件一覧' },
    { href: '/users', label: '社員管理' },
    { href: '/company', label: '自社情報' },
  ];

  const isActive = (href: string) => {
    if (href === '/cases') {
      return pathname === '/cases' || pathname?.startsWith('/cases/');
    }
    if (href === '/users') {
      return pathname === '/users' || pathname?.startsWith('/users/');
    }
    if (href === '/company') {
      return pathname === '/company' || pathname?.startsWith('/company/');
    }
    return pathname === href;
  };

  return (
    <nav
      style={{
        backgroundColor: '#1f2937',
        color: '#fff',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link
          href="/cases"
          style={{
            color: '#fff',
            textDecoration: 'none',
            fontSize: '1.25rem',
            fontWeight: 'bold',
          }}
        >
          葬儀業務システム
        </Link>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              color: isActive(item.href) ? '#60a5fa' : '#fff',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              backgroundColor: isActive(item.href) ? 'rgba(96, 165, 250, 0.1)' : 'transparent',
              transition: 'background-color 0.2s',
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <button
        onClick={() => {
          logout();
        }}
        style={{
          backgroundColor: 'transparent',
          border: '1px solid #fff',
          color: '#fff',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        ログアウト
      </button>
    </nav>
  );
}
