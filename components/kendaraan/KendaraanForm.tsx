'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createKendaraan } from '@/data/kendaraanRepository'
import { dataJenisKendaraan } from '@/constants/variabelData'

export default function KendaraanForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        jenis: '',
        manufaktur: '',
        nama: '',
        no_polisi: '',
        tahun: '',
        warna: ''
    })


    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createKendaraan(formData);
            alert('Kendaraan berhasil ditambahkan!');
            router.push('/kendaraan');
            router.refresh();
        }
        catch (error) {
            alert('Gagal menyimpan data ke backend. Periksa koneksi API kamu.');
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md space-y-6">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-3">Form Input Master Kendaraan</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No Polisi</label>
                    <input type="text" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required
                        onChange={(e) => setFormData({ ...formData, no_polisi: e.target.value })} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                    <input type="text" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required
                        onChange={(e) => setFormData({ ...formData, nama: e.target.value })} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Manufaktur</label>
                    <input type="text" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required
                        onChange={(e) => setFormData({ ...formData, manufaktur: e.target.value })} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kendaraan</label>
                    <select
                        className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white cursor-pointer"
                        required
                        value={formData.jenis || ""}
                        onChange={(e) => setFormData({ ...formData, jenis: e.target.value })}
                    >
                        <option value="" disabled hidden>-- Pilih Jenis Kendaraan --</option>
                        {dataJenisKendaraan.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}

                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tahun</label>
                    <input type="text" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required
                        onChange={(e) => setFormData({ ...formData, tahun: e.target.value })} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Warna</label>
                    <input type="text" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required
                        onChange={(e) => setFormData({ ...formData, warna: e.target.value })} />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => router.push('/kendaraan')} disabled={loading}
                    className="px-5 py-2.5 rounded-lg border text-gray-600 hover:bg-gray-50 transition-colors">
                    Batal
                </button>
                <button type="submit" disabled={loading}
                    className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 transition-colors">
                    {loading ? 'Menyimpan...' : 'Simpan Kendaraan'}
                </button>
            </div>
        </form>
    );

}