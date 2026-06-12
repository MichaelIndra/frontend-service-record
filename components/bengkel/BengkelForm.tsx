'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProvinces, getDistricts, getRegencies, getVillages } from '@/business/wilayahService'
import { createBengkel } from '@/data/bengkelRepository';
import { dataJenisServiceBengkel, dataTipeBengkel } from '@/constants/variabelData';

export default function BengkelForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [provinces, setProvinces] = useState<any[]>([]);
    const [regencies, setRegencies] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);
    const [villages, setVillages] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        nama: '',
        no_telp: '',
        tipe: '',
        jenis_service: '',
        alamat: '',
        provinsi: '',
        kota_kab: '',
        kecamatan: '',
        kelurahan: ''
    });



    useEffect(() => {
        getProvinces()
            .then((res: any) => {
                // Memastikan data yang masuk ke state adalah array (res atau res.data)
                const dataArray = res?.data ? res.data : res;
                if (Array.isArray(dataArray)) {
                    setProvinces(dataArray);
                } else {
                    console.error("Format data provinsi bukan array:", res);
                    setProvinces([]);
                }
            })
            .catch((err) => {
                console.error("Gagal load provinsi:", err);
                setProvinces([]);
            });
    }, []);

    const handleProvinceChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const code = e.target.value;
        const name = e.target.options[e.target.selectedIndex].text;

        setFormData({ ...formData, provinsi: name, kota_kab: '', kecamatan: '', kelurahan: '' });
        setRegencies([]); setDistricts([]); setVillages([]);

        if (code) {
            try {
                const res = await getRegencies(code);
                const dataArray = res?.data ? res.data : res;
                setRegencies(Array.isArray(dataArray) ? dataArray : []);
            } catch (err) {
                console.error("Gagal load kota:", err);
            }
        }
    };

    const handleRegencyChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const code = e.target.value;
        const name = e.target.options[e.target.selectedIndex].text;

        setFormData({ ...formData, kota_kab: name, kecamatan: '', kelurahan: '' });
        setDistricts([]); setVillages([]);

        if (code) {
            try {
                const res = await getDistricts(code);
                const dataArray = res?.data ? res.data : res;
                setDistricts(Array.isArray(dataArray) ? dataArray : []);
            } catch (err) {
                console.error("Gagal load kecamatan:", err);
            }
        }
    };

    const handleDistrictChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const code = e.target.value;
        const name = e.target.options[e.target.selectedIndex].text;

        setFormData({ ...formData, kecamatan: name, kelurahan: '' });
        setVillages([]);

        if (code) {
            try {
                const res = await getVillages(code);
                const dataArray = res?.data ? res.data : res;
                // Di sini HANYA setVillages saja
                setVillages(Array.isArray(dataArray) ? dataArray : []);
            } catch (err) {
                console.error("Gagal load kelurahan:", err);
            }
        }
    };

    const handleVillageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const name = e.target.options[e.target.selectedIndex].text;
        setFormData({ ...formData, kelurahan: name });
    };

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createBengkel(formData);
            alert('Data bengkel berhasil disimpan!');
            router.push('/bengkel');
            router.refresh();
        } catch (error) {
            alert('Gagal menyimpan data ke backend. Periksa koneksi API kamu.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md space-y-6">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-3">Form Input Master Bengkel</h2>

            {/* Grid Data Umum */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Bengkel</label>
                    <input type="text" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required
                        onChange={(e) => setFormData({ ...formData, nama: e.target.value })} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
                    <input type="text" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required
                        onChange={(e) => setFormData({ ...formData, no_telp: e.target.value })} />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Service</label>
                    <select
                        className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white cursor-pointer"
                        required
                        value={formData.jenis_service || ""}
                        onChange={(e) => setFormData({ ...formData, jenis_service: e.target.value })}
                    >

                        <option value="" disabled hidden>-- Pilih Jenis Service --</option>
                        {dataJenisServiceBengkel.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}

                    </select>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipe</label>
                    <select
                        className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white cursor-pointer"
                        required
                        value={formData.tipe || ""}
                        onChange={(e) => setFormData({ ...formData, tipe: e.target.value })}
                    >
                        <option value="" disabled hidden>-- Pilih Tipe --</option>
                        {dataTipeBengkel.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                </div>
            </div>

            {/* Alamat */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                <textarea className="w-full p-2.5 border rounded-lg h-20 focus:ring-2 focus:ring-blue-500 outline-none" required
                    onChange={(e) => setFormData({ ...formData, alamat: e.target.value })} />
            </div>

            {/* Grid Dropdown Wilayah Berantai */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">

                {/* Dropdown Provinsi */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
                    <select className="w-full p-2.5 border rounded-lg bg-white outline-none" required onChange={handleProvinceChange}>
                        <option value="">-- Pilih Provinsi --</option>
                        {provinces.map((p) => <option key={p.code} value={p.code}>{p.name}</option>)}
                    </select>
                </div>

                {/* Dropdown Kota */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kota / Kabupaten</label>
                    <select className="w-full p-2.5 border rounded-lg bg-white outline-none" required onChange={handleRegencyChange} disabled={!formData.provinsi || regencies.length === 0}>
                        <option value="">-- Pilih Kota/Kab --</option>
                        {regencies.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
                    </select>
                </div>

                {/* Dropdown Kecamatan */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kecamatan</label>
                    <select className="w-full p-2.5 border rounded-lg bg-white outline-none" required onChange={handleDistrictChange} disabled={!formData.kota_kab || districts.length === 0}>
                        <option value="">-- Pilih Kecamatan --</option>
                        {districts.map((d) => <option key={d.code} value={d.code}>{d.name}</option>)}
                    </select>
                </div>

                {/* Dropdown Kelurahan */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kelurahan / Desa</label>
                    <select className="w-full p-2.5 border rounded-lg bg-white outline-none" required onChange={handleVillageChange} disabled={!formData.kecamatan || villages.length === 0}>
                        <option value="">-- Pilih Kelurahan/Desa --</option>
                        {villages.map((v) => <option key={v.code} value={v.code}>{v.name}</option>)}
                    </select>
                </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => router.push('/bengkel')} disabled={loading}
                    className="px-5 py-2.5 rounded-lg border text-gray-600 hover:bg-gray-50 transition-colors">
                    Batal
                </button>
                <button type="submit" disabled={loading}
                    className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 transition-colors">
                    {loading ? 'Menyimpan...' : 'Simpan Bengkel'}
                </button>
            </div>
        </form>
    );
}