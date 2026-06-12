'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function KendaraanAdvanceFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [status, setStatus] = useState(searchParams.get('status') || 'all');

    const handleApplyFilter = (e?: React.SyntheticEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();

        const params = new URLSearchParams();
        params.set('page', '1');
        params.set('limit', searchParams.get('limit') || '10');

        if (search) params.set('search', search);
        if (status !== 'all') params.set('status', status);

        router.push(`/kendaraan?${params.toString()}`);
    };


    const handleReset = () => {
        setSearch(''); setStatus('all');
        router.push('/kendaraan');
    };

    return (
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden transition-all duration-300">
            <div className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-100 bg-gray-50/50">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Cari Nama Bengkel</label>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Ketik nama bengkel..."
                            className="w-full p-2 border rounded text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full p-2 border rounded text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">Semua Status</option>
                            <option value="true">Aktif</option>
                            <option value="false">Non Aktif</option>
                        </select>
                    </div>
                </div>
                <form
                    onSubmit={handleApplyFilter}
                    className={`p-4 space-y-4 bg-white transition-all duration-300 origin-top block opacity-100 max-h-[500px]`}
                >
                    <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                        <button type="button" onClick={handleReset} className="px-4 py-2 text-sm border rounded text-gray-600 hover:bg-gray-50 transition-colors">
                            Reset Filter
                        </button>
                        <button type="submit" className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 shadow transition-colors">
                            Terapkan Filter
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}