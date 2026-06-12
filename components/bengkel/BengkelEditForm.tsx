'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProvinces, getDistricts, getRegencies, getVillages } from '@/business/wilayahService'
import { fetchBengkelDetail, editBengkel } from '@/business/bengkelService';
import { dataJenisServiceBengkel, dataTipeBengkel} from '@/constants/variabelData';

export default function BengkelEditForm({ id }: { id: number }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [provinces, setProvinces] = useState<any[]>([]);
    const [regencies, setRegencies] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);
    const [villages, setVillages] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        nama: '',
        no_telp: '',
        type: '',
        jenis_service: '',
        alamat: '',
        provinsi: '',
        kota_kab: '',
        kecamatan: '',
        kelurahan: ''
    });

    useEffect(() => {
        const initData = async () => {
            try {
                const [provList, bengkelData] = await Promise.all([
                    getProvinces(),
                    fetchBengkelDetail(id)
                ]);

                const masterProvinces = provList?.data ? provList.data : provList;
                setProvinces(masterProvinces);

                setFormData({
                    nama: bengkelData.nama || '',
                    no_telp: bengkelData.no_telp || '',
                    type: bengkelData.type || '',
                    jenis_service: bengkelData.jenis_service || '',
                    alamat: bengkelData.alamat || '',
                    provinsi: bengkelData.provinsi || '',
                    kota_kab: bengkelData.kota_kab || '',
                    kecamatan: bengkelData.kecamatan || '',
                    kelurahan: bengkelData.kelurahan || ''
                });

                const activeProv = masterProvinces.find(
                    (p: any) => p.name.toLowerCase() === (bengkelData.provinsi || '').toLowerCase()
                );

                if (activeProv) {
                    const regList = await getRegencies(activeProv.code);
                    const regData = regList?.data ? regList.data : regList;
                    setRegencies(regData);

                    const activeReg = regData.find(
                        (r: any) => r.name.toLowerCase() === (bengkelData.kota_kab || '').toLowerCase()
                    );

                    if (activeReg) {
                        const distList = await getDistricts(activeReg.code);
                        const distData = distList?.data ? distList.data : distList;
                        setDistricts(distData);

                        const activeDist = distData.find(
                            (d: any) => d.name.toLowerCase() === (bengkelData.kecamatan || '').toLowerCase()
                        );

                        if (activeDist) {
                            const villList = await getVillages(activeDist.code);
                            const villData = villList?.data ? villList.data : villList;
                            setVillages(villData);
                        }
                    }
                }

            } catch (err) {
                console.error("Gagal memuat data edit:", err);
                alert("Gagal mengambil data bengkel.");
            } finally {
                setLoading(false);
            }
        };
        initData();
    }, [id]);

    const handleProvinceChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const code = e.target.value;
        const name = e.target.options[e.target.selectedIndex].text;
        setFormData({ ...formData, provinsi: name, kota_kab: '', kecamatan: '', kelurahan: '' });
        setRegencies([]); setDistricts([]); setVillages([]);
        if (code) {
            const res = await getRegencies(code);
            setRegencies(res?.data ? res.data : res);
        }
    };

    const handleRegencyChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const code = e.target.value;
        const name = e.target.options[e.target.selectedIndex].text;
        setFormData({ ...formData, kota_kab: name, kecamatan: '', kelurahan: '' });
        setDistricts([]); setVillages([]);
        if (code) {
            const res = await getDistricts(code);
            setDistricts(res?.data ? res.data : res);
        }
    };

    const handleDistrictChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const code = e.target.value;
        const name = e.target.options[e.target.selectedIndex].text;
        setFormData({ ...formData, kecamatan: name, kelurahan: '' });
        setVillages([]);
        if (code) {
            const res = await getVillages(code);
            setVillages(res?.data ? res.data : res);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await editBengkel(id, formData);
            alert('Data bengkel berhasil diperbarui!');
            router.push('/bengkel');
            router.refresh();
        } catch (error) {
            alert('Gagal memperbarui data.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="text-center py-10 font-medium text-gray-500">Memuat data bengkel...</div>;

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md space-y-6">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-3">Edit Data Bengkel</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Bengkel</label>
                    <input type="text" value={formData.nama} className="w-full p-2.5 border rounded-lg outline-none" required
                        onChange={(e) => setFormData({ ...formData, nama: e.target.value })} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
                    <input type="text" value={formData.no_telp} className="w-full p-2.5 border rounded-lg outline-none" required
                        onChange={(e) => setFormData({ ...formData, no_telp: e.target.value })} />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Service</label>
                    <select
                        className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white cursor-pointer"
                        required
                        // Berikan nilai default jika di dalam formData sudah ada isinya (misal saat edit data)
                        value={formData.jenis_service || ""}
                        onChange={(e) => setFormData({ ...formData, jenis_service: e.target.value })}
                    >
                        {/* Opsi default sebagai placeholder */}
                        <option value="" disabled hidden>-- Pilih Jenis Service --</option>

                        {dataJenisServiceBengkel.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipe</label>
                    <select
                        className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white cursor-pointer"
                        required
                        value={formData.type || ""}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                        {/* Opsi default sebagai placeholder */}
                        <option value="" disabled hidden>-- Pilih Tipe --</option>
                        {dataTipeBengkel.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                </div>

            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                <textarea value={formData.alamat} className="w-full p-2.5 border rounded-lg h-20 outline-none" required
                    onChange={(e) => setFormData({ ...formData, alamat: e.target.value })} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                {/* Dropdown Provinsi */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
                    <select className="w-full p-2.5 border rounded-lg bg-white" required
                        value={provinces.find(p => p.name.toLowerCase() === (formData.provinsi || '').toLowerCase())?.code || ''}
                        onChange={handleProvinceChange}>
                        <option value="">-- Pilih Provinsi --</option>
                        {Array.isArray(provinces) && provinces.map((p) => <option key={p.code} value={p.code}>{p.name}</option>)}
                    </select>
                </div>

                {/* Dropdown Kota */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kota / Kabupaten</label>
                    <select className="w-full p-2.5 border rounded-lg bg-white" required
                        value={regencies.find(c => c.name.toLowerCase() === (formData.kota_kab || '').toLowerCase())?.code || ''}
                        onChange={handleRegencyChange}
                        disabled={regencies.length === 0}>
                        <option value="">-- Pilih Kota/Kab --</option>
                        {Array.isArray(regencies) && regencies.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
                    </select>
                </div>

                {/* Dropdown Kecamatan */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kecamatan</label>
                    <select className="w-full p-2.5 border rounded-lg bg-white" required
                        value={districts.find(d => d.name.toLowerCase() === (formData.kecamatan || '').toLowerCase())?.code || ''}
                        onChange={handleDistrictChange}
                        disabled={districts.length === 0}>
                        <option value="">-- Pilih Kecamatan --</option>
                        {Array.isArray(districts) && districts.map((d) => <option key={d.code} value={d.code}>{d.name}</option>)}
                    </select>
                </div>

                {/* Dropdown Kelurahan */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kelurahan / Desa</label>
                    <select className="w-full p-2.5 border rounded-lg bg-white" required
                        value={villages.find(v => v.name.toLowerCase() === (formData.kelurahan || '').toLowerCase())?.code || ''}
                        disabled={villages.length === 0}
                        onChange={(e) => setFormData({ ...formData, kelurahan: e.target.options[e.target.selectedIndex].text })}>
                        <option value="">-- Pilih Kelurahan/Desa --</option>
                        {Array.isArray(villages) && villages.map((v) => <option key={v.code} value={v.code}>{v.name}</option>)}
                    </select>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => router.push('/bengkel')} className="px-5 py-2.5 rounded-lg border text-gray-600">Batal</button>
                <button type="submit" disabled={submitting} className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:bg-emerald-300">
                    {submitting ? 'Memperbarui...' : 'Update Data'}
                </button>
            </div>
        </form>
    );
}