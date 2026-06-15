'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import pkg from '@/package.json';

const menuItems = [
  { name: 'Dashboard', href: '/', icon: '📊' },
  { name: 'Master Bengkel', href: '/bengkel', icon: '🔧' },
  { name: 'Master Kendaraan', href: '/kendaraan', icon: '🚗' },
  { name: 'Transaksi', href: '/transaction', icon: '🧾' },
]

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const appVersion = pkg.version || '1.0.0';

  return (
    <div className="flex h-screen w-screen bg-gray-100 overflow-hidden">

      {/* SIDEBAR */}
      <aside
        className={`h-screen bg-slate-900 text-white flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out border-r border-slate-800 shadow-xl ${isOpen ? 'w-64' : 'w-0 md:w-16' // Tetap sisakan w-16 di desktop saat menutup
          }`}
      >
        {/* Header Sidebar: Teks berubah jadi singkatan/logo kecil saat menutup */}
        <div className="p-5 text-xl font-bold border-b border-slate-700 h-16 flex items-center justify-start overflow-hidden whitespace-nowrap">
          {isOpen ? (
            <span className="transition-all duration-300">Admin Panel</span>
          ) : (
            <span className="text-blue-400 mx-auto transition-all duration-300">AP</span>
          )}
        </div>

        {/* Navigasi Menu */}
        <nav className="flex-1 p-3 overflow-y-auto overflow-x-hidden">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    title={!isOpen ? item.name : undefined} // Muncul tooltip nama menu saat disorot dalam mode ikon
                    className={`flex items-center rounded-lg cursor-pointer transition-colors h-11 ${isOpen ? 'px-4 py-3 gap-3' : 'justify-center p-0'
                      } ${isActive
                        ? 'bg-blue-600 text-white font-medium shadow-md'
                        : 'hover:bg-slate-800 text-slate-300'
                      }`}
                  >
                    {/* Bagian Ikon (Selalu Muncul & Ukurannya Pas di Tengah) */}
                    <span className="text-lg flex-shrink-0 w-6 h-6 flex items-center justify-center">
                      {item.icon}
                    </span>

                    {/* Bagian Teks (Disembunyikan dengan animasi halus saat isOpen = false) */}
                    <span
                      className={`transition-all duration-200 whitespace-nowrap ${isOpen ? 'opacity-100 translate-x-0 block' : 'opacity-0 -translate-x-10 hidden md:hidden'
                        }`}
                    >
                      {item.name}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-slate-700 text-xs h-16 flex flex-col justify-center overflow-hidden whitespace-nowrap text-slate-400">
          {isOpen ? (
            <div className="flex flex-col gap-0.5 transition-all duration-300">
              <span className="text-slate-300 font-medium">Logged in as Admin</span>
              <span className="text-[10px] text-slate-500 font-mono tracking-wider">Versi {appVersion}</span>
            </div>
          ) : (
            // Saat sidebar mengecil, tampilkan nomor versi singkatnya saja (misal: "v1.0") sebagai pengganti status
            <span className="mx-auto text-[10px] font-mono text-slate-500 font-bold bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700/50" title={`Aplikasi Versi ${appVersion}`}>
              v{appVersion.split('.').slice(0, 2).join('.')}
            </span>
          )}
        </div>
      </aside>

      {/* AREA UTAMA (Top Navbar + Konten Halaman) */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">

        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 justify-between flex-shrink-0 shadow-sm">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-xl font-bold outline-none"
            title={isOpen ? "Sembunyikan Sidebar" : "Tampilkan Sidebar"}
          >
            ☰
          </button>
          <div className="text-sm font-medium text-gray-500">
            {pathname === '/' ? 'Dashboard Overview' : 'Master Bengkel'}
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6 md:p-8">
          {children}
        </main>
      </div>

    </div>
  );
}