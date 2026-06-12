'use client';

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react';
import { HandleSort, HandleLimitChange } from '@/constants/functionData'
import {formatRupiah, formatDate} from '@/constants/functionData'

import InvoicePhotoModal from './table/InvoicePhotoModal';
import ServiceDetailModal from './table/ServiceDetailModal';
import SparepartDetailModal from './table/SparepartDetailModal';

export default function TransactionTable({ data, totalPages,
    currentPage,
    totalItems = 0 }: {
        data: any[], totalPages: number,
        currentPage: number,
        totalItems?: number
    }) {
    const path = 'kendaraan'
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentLimit = searchParams.get('limit') || '10';
    const currentSortBy = searchParams.get('sortBy') || 'tanggal_transaksi';
    const currentOrder = searchParams.get('order') || 'desc';

    const [activeModal, setActiveModal] = useState<'foto' | 'service' | 'sparepart' | null>(null);
    const [modalData, setModalData] = useState<any>(null);

  
    // Helper: Menampilkan strip '-' jika data null atau kosong
    const renderCell = (value: any) => {
        return value !== null && value !== undefined && value !== '' ? value : '-';
    };

    const openModal = (type: 'foto' | 'service' | 'sparepart', itemData: any) => {
        console.log(itemData)
        setModalData(itemData);
        setActiveModal(type);
    };

    const closeModal = () => {
        setActiveModal(null);
        setModalData(null);
    };

    const renderSortIcon = (field: string) => {
        if (currentSortBy !== field) return <span className="text-gray-300 ml-1">↕</span>;
        return currentOrder === 'asc' ? <span className="text-blue-600 ml-1">▲</span> : <span className="text-blue-600 ml-1">▼</span>;
    };
    return (
        <div className="w-full">
            {/* TABEL UTAMA */}
            <div className="overflow-x-auto shadow rounded-lg bg-white border border-gray-200">
                <table className="min-w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-700 border-b border-gray-200 text-xs uppercase font-semibold">
                            <th className="py-3 px-4">No Polisi</th>
                            <th className="py-3 px-4">Kendaraan</th>
                            <th className="py-3 px-4">Bengkel</th>
                            <th className="py-3 px-4">No Nota</th>
                            <th className="py-3 px-4">KM</th>
                            <th className="py-3 px-4">Biaya Bruto</th>
                            <th className="py-3 px-4">PPN</th>
                            <th className="py-3 px-4">Diskon</th>
                            <th className="py-3 px-4">Biaya Netto</th>
                            <th className="py-3 px-4">Tgl Masuk</th>
                            <th className="py-3 px-4">Tgl Selesai</th>
                            <th
                                onClick={() => HandleSort(searchParams, router, 'tanggal_transaksi', path)}
                                className="py-3 px-4">Tgl Transaksi {renderSortIcon('tanggal_transaksi')}</th>
                            <th className="py-3 px-4 text-center">Aksi Detail</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={11} className="text-center py-8 text-gray-500">
                                    Tidak ada data transaksi.
                                </td>
                            </tr>
                        ) : (
                            data.map((trx) => (
                                <tr key={trx.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">{renderCell(trx.no_polisi)}</td>
                                    <td className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">{renderCell(trx.kendaraan.nama)}</td>
                                    <td className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">{renderCell(trx.Bengkel.nama)}</td>
                                    <td className="py-3 px-4 text-gray-600">{renderCell(trx.no_nota)}</td>
                                    <td className="py-3 px-4 text-gray-600">{renderCell(trx.km)}</td>
                                    <td className="py-3 px-4 text-right text-gray-600 whitespace-nowrap">{formatRupiah(trx.biaya_bruto)}</td>
                                    <td className="py-3 px-4 text-right text-gray-600 whitespace-nowrap">{formatRupiah(trx.ppn)}</td>
                                    <td className="py-3 px-4 text-right text-red-600 whitespace-nowrap">{formatRupiah(trx.diskon)}</td>
                                    <td className="py-3 px-4 text-right text-emerald-700 font-semibold whitespace-nowrap">{formatRupiah(trx.biaya_netto)}</td>
                                    <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{formatDate(trx.tanggal_masuk)}</td>
                                    <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{formatDate(trx.tanggal_selesai)}</td>
                                    <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{formatDate(trx.tanggal_transaksi)}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex justify-center items-center gap-1.5">
                                            <button
                                                onClick={() => openModal('foto', trx.foto_nota)}
                                                className="px-2.5 py-1 text-xs bg-amber-500 hover:bg-amber-600 text-white rounded font-medium transition-colors"
                                            >
                                                🖼️ Nota
                                            </button>
                                            <button
                                                onClick={() => openModal('service', trx.details_service)}
                                                className="px-2.5 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
                                            >
                                                ⚙️ Service
                                            </button>
                                            <button
                                                onClick={() => openModal('sparepart', trx.details_sparepart)}
                                                className="px-2.5 py-1 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded font-medium transition-colors"
                                            >
                                                📦 Sparepart
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
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

                <div className="flex items-center gap-2 self-end sm:self-auto">
                    <a
                        href={`/${path}?page=${currentPage - 1}&limit=${currentLimit}`}
                        className={`px-3 py-1.5 border text-xs rounded-md font-semibold transition-colors ${currentPage <= 1
                            ? 'bg-gray-100 text-gray-400 border-gray-200 pointer-events-none'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                            }`}
                    >
                        Sebelumnya
                    </a>
                    <div className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm">
                        Halaman {currentPage} dari {totalPages || 1}
                    </div>
                    <a
                        href={`/${path}?page=${currentPage + 1}&limit=${currentLimit}`}
                        className={`px-3 py-1.5 border text-xs rounded-md font-semibold transition-colors ${currentPage >= totalPages
                            ? 'bg-gray-100 text-gray-400 border-gray-200 pointer-events-none'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                            }`}
                    >
                        Berikutnya
                    </a>
                </div>
            </div>

            {/* ==================== DIALOG / MODAL SYSTEM ==================== */}
            <InvoicePhotoModal isOpen={activeModal === 'foto'} onClose={closeModal} data={modalData} />
            <ServiceDetailModal isOpen={activeModal === 'service'} onClose={closeModal} data={modalData} />
            <SparepartDetailModal isOpen={activeModal === 'sparepart'} onClose={closeModal} data={modalData} />
        </div>
    );
}