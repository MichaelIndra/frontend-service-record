'use client';

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { fetchKendaraanDetail, editKendaraan } from '@/business/kendaraanService';
import { dataJenisKendaraan } from '@/constants/variabelData';

export default function KendaraanEditForm({ nopol }: { nopol: string }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        jenis: '',
        manufaktur: '',
        nama: '',
        no_polisi: '',
        tahun: '',
        warna: ''
    })

    useEffect(() => {
        const loadKendaraan = async () => {
            setLoading(true);
            try {
                const res = await fetchKendaraanDetail(nopol);
                // console.log( `data ${JSON.stringify(res)} data dari nopol : ${res.no_polisi}`)
                setFormData({
                    jenis: res.jenis || '',
                    manufaktur: res.manufaktur || '',
                    nama: res.nama || '',
                    no_polisi: res.no_polisi || '',
                    tahun: res.tahun || '',
                    warna: res.warna || ''
                });
            } catch (error) {
                alert('Gagal memuat data kendaraan. Periksa koneksi API kamu.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        loadKendaraan();
    }, [nopol]);

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await editKendaraan(nopol, formData);
            alert('Kendaraan berhasil diperbarui!');
            router.push('/kendaraan');
            router.refresh();
        } catch (error) {
            alert('Gagal memperbarui kendaraan. Periksa koneksi API kamu.');
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="text-center py-10 font-medium text-gray-500">Memuat data Kendaraan...</div>;

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md space-y-6">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-3">Form Edit Master Kendaraan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No Polisi</label>
                    <input type="text" value={formData.no_polisi} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required
                        onChange={(e) => setFormData({ ...formData, no_polisi: e.target.value })} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                    <input type="text" value={formData.nama} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required
                        onChange={(e) => setFormData({ ...formData, nama: e.target.value })} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Manufaktur</label>
                    <input type="text" value={formData.manufaktur} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required
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
                    <input type="text" value={formData.tahun} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required
                        onChange={(e) => setFormData({ ...formData, tahun: e.target.value })} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Warna</label>
                    <input type="text" value={formData.warna} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required
                        onChange={(e) => setFormData({ ...formData, warna: e.target.value })} />
                </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => router.push('/kendaraan')} className="px-5 py-2.5 rounded-lg border text-gray-600">Batal</button>
                <button type="submit" disabled={submitting} className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:bg-emerald-300">
                    {submitting ? 'Memperbarui...' : 'Update Data'}
                </button>
            </div>
        </form>
    )
}