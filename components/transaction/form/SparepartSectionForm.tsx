'use client';

import { useState } from 'react';
import {formatRupiah, parseNumber} from '@/constants/functionData'

interface SparepartSectionProps {
    spareparts: any[];
    setSpareparts: React.Dispatch<React.SetStateAction<any[]>>;
    totalBiayaSparepart: number;
}

export default function SparepartSectionForm({ spareparts, setSpareparts, totalBiayaSparepart }: SparepartSectionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [editIdx, setEditIdx] = useState<number | null>(null);
    const [partInput, setPartInput] = useState({
        nama_sparepart: '', kode_sparepart: '', batas_km: '', batas_waktu: '', remind: false, qty: 1, harga_satuan: 0
    });
    const [partFoto, setPartFoto] = useState<File | null>(null);
    
    const handleOpenModal = (idx: number | null = null) => {
        if (idx !== null) {
            setPartInput(spareparts[idx]);
            setEditIdx(idx);
        } else {
            setPartInput({ nama_sparepart: '', kode_sparepart: '', batas_km: '', batas_waktu: '', remind: false, qty: 1, harga_satuan: 0 });
            setPartFoto(null);
            setEditIdx(null);
        }
        setIsOpen(true);
    };

    const handleSave = () => {
        if (!partInput.nama_sparepart || partInput.qty <= 0 || partInput.harga_satuan <= 0) {
            return alert('Nama, QTY, dan Harga Satuan wajib diisi!');
        }
        setSpareparts(
            editIdx !== null
                ? spareparts.map((item, i) => (i === editIdx ? { ...partInput, foto_sparepart: partFoto } : item))
                : [...spareparts, { ...partInput, foto_sparepart: partFoto }]
        );
        setIsOpen(false);
    };

    return (
        <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 space-y-3">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-800 text-md flex items-center gap-1">📦 Detail Ganti Sparepart</h3>
                    <span className="px-2.5 py-0.5 bg-gray-200 text-gray-800 text-xs font-bold rounded-full border border-gray-300">
                        Total: Rp {totalBiayaSparepart.toLocaleString('id-ID')}
                    </span>
                </div>
                <button type="button" onClick={() => handleOpenModal()} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-semibold flex items-center gap-1 transition-colors shadow">
                    <span>➕</span> Tambah Sparepart
                </button>
            </div>

            <div className="overflow-x-auto border rounded-lg bg-white">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-xs font-bold text-gray-600 uppercase border-b">
                        <tr>
                            <th className="p-3">Nama Sparepart</th>
                            <th className="p-3">Kode</th>
                            <th className="p-3 text-center">QTY</th>
                            <th className="p-3 text-right">Harga Satuan</th>
                            <th className="p-3 text-right">Total</th>
                            <th className="p-3 text-center">Remind?</th>
                            <th className="p-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {spareparts.length === 0 ? (
                            <tr><td colSpan={7} className="p-4 text-center text-gray-400 italic">Belum ada sparepart ditambahkan.</td></tr>
                        ) : (
                            spareparts.map((item, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50">
                                    <td className="p-3 font-medium text-gray-800">{item.nama_sparepart}</td>
                                    <td className="p-3 text-gray-500">{item.kode_sparepart || '-'}</td>
                                    <td className="p-3 text-center">{item.qty}</td>
                                    <td className="p-3 text-right">Rp {item.harga_satuan.toLocaleString('id-ID')}</td>
                                    <td className="p-3 text-right text-emerald-600 font-semibold">Rp {(item.qty * item.harga_satuan).toLocaleString('id-ID')}</td>
                                    <td className="p-3 text-center text-xs">{item.remind ? '✅ Ya' : '❌ Tidak'}</td>
                                    <td className="p-3 text-center space-x-2">
                                        <button type="button" onClick={() => handleOpenModal(idx)} className="text-blue-600 hover:underline font-semibold text-xs">Edit</button>
                                        <button type="button" onClick={() => setSpareparts(spareparts.filter((_, i) => i !== idx))} className="text-red-600 hover:underline font-semibold text-xs">Hapus</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* MODAL SPAREPART */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                            <h4 className="font-bold text-gray-800">{editIdx !== null ? '📝 Edit Item' : '➕ Tambah Item'} Sparepart</h4>
                            <button type="button" onClick={() => setIsOpen(false)} className="text-xl font-bold hover:text-gray-600">&times;</button>
                        </div>
                        <div className="p-5 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold mb-1">Nama Sparepart *</label>
                                <input type="text" required className="w-full p-2 border rounded" placeholder="Contoh: AKI GS ASTRA" value={partInput.nama_sparepart} onChange={e => setPartInput({ ...partInput, nama_sparepart: e.target.value.toUpperCase() })} />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-xs font-semibold mb-1">Kode Sparepart</label>
                                    <input type="text" className="w-full p-2 border rounded" placeholder="Opsional" value={partInput.kode_sparepart} onChange={e => setPartInput({ ...partInput, kode_sparepart: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold mb-1">Foto Sparepart</label>
                                    <input type="file" accept="image/jpeg, image/png, image/heif" className="w-full text-xs mt-1" onChange={e => setPartFoto(e.target.files ? e.target.files[0] : null)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-xs font-semibold mb-1">Batas KM (Garansi)</label>
                                    <input type="text" className="w-full p-2 border rounded" placeholder="Contoh: 10000" value={partInput.batas_km} onChange={e => setPartInput({ ...partInput, batas_km: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold mb-1">Batas Waktu (Bulan)</label>
                                    <input type="number" className="w-full p-2 border rounded" placeholder="Contoh: 6" value={partInput.batas_waktu} onChange={e => setPartInput({ ...partInput, batas_waktu: e.target.value })} />
                                </div>
                            </div>
                            <div className="pt-1">
                                <label className="flex items-center gap-2 text-xs font-semibold select-none cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500" checked={partInput.remind} onChange={e => setPartInput({ ...partInput, remind: e.target.checked })} />
                                    Nyalakan Remind
                                </label>
                            </div>
                            <div className="grid grid-cols-2 gap-2 border-t pt-3">
                                <div>
                                    <label className="block text-xs font-semibold mb-1">QTY *</label>
                                    <input type="number" min="1" className="w-full p-2 border rounded" value={partInput.qty} onChange={e => setPartInput({ ...partInput, qty: Math.max(1, Number(e.target.value)) })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold mb-1">Harga Satuan *</label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><span className="text-gray-500 text-sm">Rp</span></div>
                                        <input type="text" required className="w-full p-2 pl-9 border rounded text-right font-medium" placeholder="0" value={formatRupiah(partInput.harga_satuan)} onChange={e => setPartInput({ ...partInput, harga_satuan: parseNumber(e.target.value) })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 border-t flex justify-end gap-2">
                            <button type="button" onClick={() => setIsOpen(false)} className="px-3 py-1.5 border rounded text-xs font-semibold text-gray-600 bg-white hover:bg-gray-50">Batal</button>
                            <button type="button" onClick={handleSave} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold shadow">Simpan Ke Tabel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}