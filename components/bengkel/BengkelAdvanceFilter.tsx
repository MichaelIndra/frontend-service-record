'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getProvinces, getRegencies, getDistricts, getVillages } from '@/business/wilayahService';

export default function BengkelAdvanceFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [isFilterOpen, setIsFilterOpen] = useState(true);
    
    const [provinces, setProvinces] = useState<any[]>([]);
    const [regencies, setRegencies] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);
    const [villages, setVillages] = useState<any[]>([]);
    
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [status, setStatus] = useState(searchParams.get('status') || 'all');
    const [selectedProv, setSelectedProv] = useState(searchParams.get('provinsi') || '');
    const [selectedKota, setSelectedKota] = useState(searchParams.get('kota_kab') || '');
    const [selectedKec, setSelectedKec] = useState(searchParams.get('kecamatan') || '');
    const [selectedKel, setSelectedKel] = useState(searchParams.get('kelurahan') || '');
    
    useEffect(() => {
        getProvinces().then((res: any) => {
            const dataArray = res?.data ? res.data : res;
            if (Array.isArray(dataArray)) setProvinces(dataArray);
        }).catch(err => console.error(err));
    }, []);

    const handleApplyFilter = (e?: React.SyntheticEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();
        
        const params = new URLSearchParams();
        params.set('page', '1'); 
        params.set('limit', searchParams.get('limit') || '10');
        
        if (search) params.set('search', search);
        if (status !== 'all') params.set('status', status);
        if (selectedProv) params.set('provinsi', selectedProv);
        if (selectedKota) params.set('kota_kab', selectedKota);
        if (selectedKec) params.set('kecamatan', selectedKec);
        if (selectedKel) params.set('kelurahan', selectedKel);

        router.push(`/bengkel?${params.toString()}`);
    };
    
    const handleReset = () => {
        setSearch(''); setStatus('all');
        setSelectedProv(''); setSelectedKota(''); setSelectedKec(''); setSelectedKel('');
        setRegencies([]); setDistricts([]); setVillages([]);
        router.push('/bengkel');
    };
    
    const handleProvinceChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const code = e.target.value;
        const name = e.target.options[e.target.selectedIndex].text;
        
        setSelectedProv(code ? name : '');
        setSelectedKota(''); setSelectedKec(''); setSelectedKel('');
        setRegencies([]); setDistricts([]); setVillages([]);

        if (code) {
            try {
                const res = await getRegencies(code);
                const dataArray = res?.data ? res.data : res;
                setRegencies(Array.isArray(dataArray) ? dataArray : []);
            } catch (err) { console.error(err); }
        }
    };
    
    const handleRegencyChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const code = e.target.value;
        const name = e.target.options[e.target.selectedIndex].text;

        setSelectedKota(code ? name : '');
        setSelectedKec(''); setSelectedKel('');
        setDistricts([]); setVillages([]);

        if (code) {
            try {
                const res = await getDistricts(code);
                const dataArray = res?.data ? res.data : res;
                setDistricts(Array.isArray(dataArray) ? dataArray : []);
            } catch (err) { console.error(err); }
        }
    };
    
    const handleDistrictChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const code = e.target.value;
        const name = e.target.options[e.target.selectedIndex].text;

        setSelectedKec(code ? name : '');
        setSelectedKel('');
        setVillages([]);

        if (code) {
            try {
                const res = await getVillages(code);
                const dataArray = res?.data ? res.data : res;
                setVillages(Array.isArray(dataArray) ? dataArray : []);
            } catch (err) { console.error(err); }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden transition-all duration-300">
            {/* Bagian Header / Baris Utama (Selalu Muncul) */}
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

                {/* Tombol Toggle Buka/Tutup Filter */}
                <button 
                    type="button"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="w-full md:w-auto px-4 py-2 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors flex items-center justify-center gap-1 mt-2 md:mt-5"
                >
                    {isFilterOpen ? 'Sembunyikan Filter Wilayah ▴' : 'Tampilkan Filter Wilayah ▾'}
                </button>
            </div>

            {/* Bagian Konten Wilayah yang Bisa Di-Show/Hide */}
            <form 
                onSubmit={handleApplyFilter} 
                className={`p-4 space-y-4 bg-white transition-all duration-300 origin-top ${
                    isFilterOpen ? 'block opacity-100 max-h-[500px]' : 'hidden opacity-0 max-h-0 overflow-hidden'
                }`}
            >
                {/* Dropdown Wilayah Berantai */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Provinsi</label>
                        <select className="w-full p-2 border rounded text-sm bg-white outline-none" onChange={handleProvinceChange}>
                            <option value="">-- Semua Provinsi --</option>
                            {provinces.map((p) => <option key={p.code} value={p.code}>{p.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Kota / Kabupaten</label>
                        <select className="w-full p-2 border rounded text-sm bg-white outline-none" disabled={!selectedProv} onChange={handleRegencyChange}>
                            <option value="">-- Semua Kota/Kab --</option>
                            {regencies.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Kecamatan</label>
                        <select className="w-full p-2 border rounded text-sm bg-white outline-none" disabled={!selectedKota} onChange={handleDistrictChange}>
                            <option value="">-- Semua Kecamatan --</option>
                            {districts.map((d) => <option key={d.code} value={d.code}>{d.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Kelurahan / Desa</label>
                        <select className="w-full p-2 border rounded text-sm bg-white outline-none" disabled={!selectedKec} onChange={(e) => setSelectedKel(e.target.value ? e.target.options[e.target.selectedIndex].text : '')}>
                            <option value="">-- Semua Kelurahan --</option>
                            {villages.map((v) => <option key={v.code} value={v.code}>{v.name}</option>)}
                        </select>
                    </div>
                </div>

                {/* Tombol Aksi Terapkan / Reset */}
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
    );
}