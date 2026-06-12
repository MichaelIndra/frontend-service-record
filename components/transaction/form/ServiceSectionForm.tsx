'use client'

import { useState } from "react"
import {formatRupiah, parseNumber} from '@/constants/functionData'

interface ServiceSectionProps {
    services: any[]
    setServices: React.Dispatch<React.SetStateAction<any[]>>
    totalBiayaService: number
}

export default function ServiceSectionForm({ services, setServices, totalBiayaService }: ServiceSectionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [editIdx, setEditIdx] = useState<number | null>(null);
    const [svcInput, setSvcInput] = useState({ nama_service: '', biaya: 0 });
    const [svcFoto, setSvcFoto] = useState<File | null>(null);

    

    const handleOpenModal = (idx: number | null = null) => {
        if (idx !== null) {
            setSvcInput({ nama_service: services[idx].nama_service, biaya: services[idx].biaya });
            setEditIdx(idx);
        } else {
            setSvcInput({ nama_service: '', biaya: 0 });
            setSvcFoto(null);
            setEditIdx(null);
        }
        setIsOpen(true);
    };

    const handleSave = () => {
        if (!svcInput.nama_service || svcInput.biaya <= 0) return alert('Nama dan biaya wajib diisi!');
        setServices(
            editIdx !== null
                ? services.map((item, i) => (i === editIdx ? { ...svcInput, foto_service: svcFoto } : item))
                : [...services, { ...svcInput, foto_service: svcFoto }]
        );
        setIsOpen(false);
    };

    return (
        <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 space-y-3">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-800 text-md flex items-center gap-1">⚙️ Detail List Service</h3>
                    <span className="px-2.5 py-0.5 bg-gray-200 text-gray-800 text-xs font-bold rounded-full border border-gray-300">
                        Total: Rp {totalBiayaService.toLocaleString('id-ID')}
                    </span>
                </div>
                <button type="button" onClick={() => handleOpenModal()} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold flex items-center gap-1 transition-colors shadow">
                    <span>➕</span> Tambah Service
                </button>
            </div>

            <div className="overflow-x-auto border rounded-lg bg-white">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-xs font-bold text-gray-600 uppercase border-b">
                        <tr>
                            <th className="p-3">Nama Service</th>
                            <th className="p-3 text-right">Biaya</th>
                            <th className="p-3">Foto Bukti</th>
                            <th className="p-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {services.length === 0 ? (
                            <tr><td colSpan={4} className="p-4 text-center text-gray-400 italic">Belum ada service ditambahkan.</td></tr>
                        ) : (
                            services.map((item, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50">
                                    <td className="p-3 font-medium text-gray-800">{item.nama_service}</td>
                                    <td className="p-3 text-right text-emerald-600 font-semibold">Rp {item.biaya.toLocaleString('id-ID')}</td>
                                    <td className="p-3 text-xs text-gray-500 font-mono">{item.foto_service ? item.foto_service.name : '-'}</td>
                                    <td className="p-3 text-center space-x-2">
                                        <button type="button" onClick={() => handleOpenModal(idx)} className="text-blue-600 hover:underline font-semibold text-xs">Edit</button>
                                        <button type="button" onClick={() => setServices(services.filter((_, i) => i !== idx))} className="text-red-600 hover:underline font-semibold text-xs">Hapus</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* MODAL SERVICE */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                            <h4 className="font-bold text-gray-800">{editIdx !== null ? '📝 Edit Item' : '➕ Tambah Item'} Service</h4>
                            <button type="button" onClick={() => setIsOpen(false)} className="text-xl font-bold hover:text-gray-600">&times;</button>
                        </div>
                        <div className="p-5 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold mb-1">Nama Service *</label>
                                <input type="text" required className="w-full p-2 border rounded" placeholder="Contoh: GANTI OLI" value={svcInput.nama_service} onChange={e => setSvcInput({ ...svcInput, nama_service: e.target.value.toUpperCase() })} />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold mb-1">Biaya *</label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><span className="text-gray-500 text-sm">Rp</span></div>
                                    <input type="text" required className="w-full p-2 pl-9 border rounded text-right font-medium" placeholder="0" value={formatRupiah(svcInput.biaya)} onChange={e => setSvcInput({ ...svcInput, biaya: parseNumber(e.target.value) })} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold mb-1">Foto Service</label>
                                <input type="file" accept="image/jpeg, image/png, image/heif" className="w-full text-xs" onChange={e => setSvcFoto(e.target.files ? e.target.files[0] : null)} />
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