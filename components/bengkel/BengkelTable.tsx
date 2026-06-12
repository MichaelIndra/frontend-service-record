'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { editBengkel } from '@/business/bengkelService';
import { HandleSort, HandleLimitChange } from '@/constants/functionData'

export default function BengkelTable({
    data,
    totalPages,
    currentPage,
    totalItems = 0 }: {
        data: any[],
        totalPages: number,
        currentPage: number,
        totalItems?: number
    }) {
    const path = 'bengkel'
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentStatus = searchParams.get('status') || 'all';
    const currentLimit = searchParams.get('limit') || '10';
    const currentSortBy = searchParams.get('sortBy') || '';
    const currentOrder = searchParams.get('order') || 'asc';
    const currentSearch = searchParams.get('search') || '';
    const currentProv = searchParams.get('provinsi') || '';
    const currentKota = searchParams.get('kota_kab') || '';
    const currentKec = searchParams.get('kecamatan') || '';
    const currentKel = searchParams.get('kelurahan') || '';

    const handleDelete = async (bengkel: any) => {
        if (confirm(`Apakah Anda yakin ingin  ${bengkel.aktif ? 'menonaktifkan' : 'mengaktifkan'} bengkel ${bengkel.nama}?`)) {
            bengkel.aktif = !bengkel.aktif;
            await editBengkel(bengkel.id, bengkel);
            router.refresh();
        }
    }
    

    const renderSortIcon = (field: string) => {
        if (currentSortBy !== field) return <span className="text-gray-300 ml-1">↕</span>;
        return currentOrder === 'asc' ? <span className="text-blue-600 ml-1">▲</span> : <span className="text-blue-600 ml-1">▼</span>;
    };

    return (
        <>
            <div className="overflow-x-auto shadow rounded-lg bg-white border border-gray-200">
                <table className="min-w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-700 border-b border-gray-200">
                            <th
                                onClick={() => HandleSort(searchParams, router, 'nama', path)}
                                className="py-3 px-4 font-semibold text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                            >
                                Nama {renderSortIcon('nama')}
                            </th>
                            <th
                                onClick={() => HandleSort(searchParams, router,'jenis_service', path)}
                                className="py-3 px-4 font-semibold text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                            >
                                Jenis Bengkel {renderSortIcon('jenis_service')}
                            </th>
                            <th className="py-3 px-4 font-semibold text-sm">Tipe</th>
                            <th className="py-3 px-4 font-semibold text-sm">Alamat</th>
                            <th className="py-3 px-4 font-semibold text-sm">Provinsi</th>
                            <th className="py-3 px-4 font-semibold text-sm">Kota/Kabupaten</th>
                            <th className="py-3 px-4 font-semibold text-sm">Kecamatan</th>
                            <th className="py-3 px-4 font-semibold text-sm">Kelurahan</th>
                            <th className="py-3 px-4 font-semibold text-sm">Status</th>
                            <th className="py-3 px-4 font-semibold text-sm text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="text-center py-8 text-gray-500 font-medium">
                                    Tidak ada data bengkel yang ditemukan.
                                </td>
                            </tr>
                        ) : (
                            data.map((bengkel) => (
                                <tr key={bengkel.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                                    <td className="py-2.5 px-4 text-sm text-gray-800 font-medium">{bengkel.nama}</td>
                                    <td className="py-2.5 px-4 text-sm text-gray-600">{bengkel.jenis_service}</td>
                                    <td className="py-2.5 px-4 text-sm text-gray-600">{bengkel.type}</td>
                                    <td className="py-2.5 px-4 text-sm text-gray-600 max-w-xs truncate" title={bengkel.alamat}>
                                        {bengkel.alamat}
                                    </td>
                                    <td className="py-2.5 px-4 text-sm text-gray-600">{bengkel.provinsi}</td>
                                    <td className="py-2.5 px-4 text-sm text-gray-600">{bengkel.kota_kab}</td>
                                    <td className="py-2.5 px-4 text-sm text-gray-600">{bengkel.kecamatan}</td>
                                    <td className="py-2.5 px-4 text-sm text-gray-600">{bengkel.kelurahan}</td>
                                    <td className="py-2.5 px-4 text-sm">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${bengkel.aktif ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {bengkel.aktif ? 'Aktif' : 'Non Aktif'}
                                        </span>
                                    </td>
                                    <td className="py-2.5 px-4 text-sm">
                                        <div className="flex items-center justify-center gap-2">
                                            <a
                                                href={`/bengkel/edit/${bengkel.id}`}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded shadow-sm text-xs font-medium transition-colors text-center inline-block"
                                            >
                                                Edit
                                            </a>
                                            <button
                                                onClick={() => handleDelete(bengkel)}
                                                className={`px-3 py-1.5 rounded shadow-sm text-xs font-medium text-white transition-colors ${bengkel.aktif
                                                    ? 'bg-red-600 hover:bg-red-700'
                                                    : 'bg-emerald-600 hover:bg-emerald-700'
                                                    }`}
                                            >
                                                {bengkel.aktif ? 'Hapus' : 'Aktifkan'}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Bagian Navigasi Bawah Modern */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">

                {/* Sisi Kiri: Info Data & Pengatur Limit Data */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 font-medium">
                    <div>
                        Menampilkan <span className="text-gray-900 font-semibold">{data.length}</span> dari{' '}
                        <span className="text-gray-900 font-semibold">{totalItems}</span> data
                    </div>

                    <div className="flex items-center gap-1.5 border-l pl-4 border-gray-300">
                        <span>Tampilkan:</span>
                        <select
                            value={currentLimit}
                            onChange={(e) => HandleLimitChange(searchParams, router, e.target.value, path)}
                            className="p-1 border rounded bg-white text-gray-700 outline-none font-semibold text-xs cursor-pointer border-gray-300"
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>

                {/* Sisi Kanan: Pagination Elemen (Prev, Halaman Aktif, Next) */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                    {/* Tombol Sebelumnya (Prev) */}
                    <a
                        href={`/bengkel?page=${currentPage - 1}&status=${currentStatus}&limit=${currentLimit}&search=${currentSearch}&provinsi=${currentProv}&kota_kab=${currentKota}&kecamatan=${currentKec}&kelurahan=${currentKel}`}
                        className={`px-3 py-1.5 border text-xs rounded-md font-semibold transition-colors ${currentPage <= 1
                            ? 'bg-gray-100 text-gray-400 border-gray-200 pointer-events-none'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                            }`}
                    >
                        Sebelumnya
                    </a>

                    {/* Info Halaman Posisi Aktif */}
                    <div className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm">
                        Halaman {currentPage} dari {totalPages || 1}
                    </div>

                    {/* Tombol Berikutnya (Next) */}
                    <a
                        href={`/bengkel?page=${currentPage + 1}&status=${currentStatus}&limit=${currentLimit}&search=${currentSearch}&provinsi=${currentProv}&kota_kab=${currentKota}&kecamatan=${currentKec}&kelurahan=${currentKel}`}
                        className={`px-3 py-1.5 border text-xs rounded-md font-semibold transition-colors ${currentPage >= totalPages
                            ? 'bg-gray-100 text-gray-400 border-gray-200 pointer-events-none'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                            }`}
                    >
                        Berikutnya
                    </a>
                </div>
            </div>
        </>
    );
}