'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { makeTransaction } from '@/business/transactionService'
import SparepartSectionForm from './form/SparepartSectionForm';
import ServiceSectionForm from './form/ServiceSectionForm';
import HeaderSectionForm from './form/HeaderSectionForm';
import DateInvoiceSectionForm from './form/DateInvoiceSectionForm'
import FinancialSummarySectionForm from './form/FinancialSummarySectionForm'

export default function TransactionForm({ bengkels, kendaraans }: { bengkels: any[], kendaraans: any[] }) {
    const router = useRouter();
    // 1. STATE FORM UTAMA
    const [formData, setFormData] = useState({
        no_polisi: '',
        bengkel_id: '',
        no_nota: '',
        km: '',
        biaya_bruto: 0,
        ppn: 0,
        diskon: 0,
        tanggal_masuk: '',
        tanggal_selesai: '',
        tanggal_transaksi: new Date().toISOString().split('T')[0],
    });

    const [fotoNota, setFotoNota] = useState<File | null>(null);

    // 2. STATE DETAIL LOKAL (TABEL)
    const [services, setServices] = useState<any[]>([]);
    const [spareparts, setSpareparts] = useState<any[]>([]);

    // ==================== KALKULASI OTOMATIS ====================

    const totalBiayaService = useMemo(() => {
        return services.reduce((sum, item) => sum + (Number(item.biaya) || 0), 0);
    }, [services]);

    const totalBiayaSparepart = useMemo(() => {
        return spareparts.reduce((sum, item) => sum + ((Number(item.qty) || 0) * (Number(item.harga_satuan) || 0)), 0);
    }, [spareparts]);

    const biayaBruto = useMemo(() => {
        return totalBiayaService + totalBiayaSparepart;
    }, [totalBiayaService, totalBiayaSparepart]);

    const biayaNetto = useMemo(() => {
        const bruto = Number(biayaBruto) || 0;
        const ppn = Number(formData.ppn) || 0;
        const diskon = Number(formData.diskon) || 0;
        return bruto - diskon + ppn;
    }, [biayaBruto, formData.ppn, formData.diskon]);

    // ==================== SUBMIT FORM AKHIR ====================
    const handleSubmitAll = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dataToSend = new FormData();
        dataToSend.append('no_polisi', formData.no_polisi);
        dataToSend.append('bengkel_id', formData.bengkel_id);
        dataToSend.append('biaya_bruto', String(biayaBruto));
        dataToSend.append('diskon', String(formData.diskon));
        dataToSend.append('biaya_netto', String(biayaNetto));
        dataToSend.append('tanggal_transaksi', formData.tanggal_transaksi);
        dataToSend.append('tanggal_masuk', formData.tanggal_masuk);
        dataToSend.append('tanggal_selesai', formData.tanggal_selesai);
        dataToSend.append('km', formData.km);
        dataToSend.append('no_nota', formData.no_nota);
        if (fotoNota) dataToSend.append('foto_nota[]', fotoNota);

        services.forEach((svc) => {
            dataToSend.append('service_name[]', svc.nama_service);
            dataToSend.append('service_price[]', String(svc.biaya));
            if (svc.foto_service) dataToSend.append('foto_service[]', svc.foto_service);
        });
        spareparts.forEach((part) => {
            dataToSend.append('sparepart_name[]', part.nama_sparepart);
            dataToSend.append('sparepart_code[]', part.kode_sparepart || '');
            dataToSend.append('sparepart_price[]', String(part.harga_satuan));
            dataToSend.append('sparepart_qty[]', String(part.qty));
            dataToSend.append('sparepart_batas_km[]', part.batas_km || '');
            dataToSend.append('sparepart_batas_waktu[]', String(part.batas_waktu || ''));
            dataToSend.append('sparepart_remind[]', String(part.remind));
            if (part.foto_sparepart) dataToSend.append('foto_sparepart[]', part.foto_sparepart);
        });

        console.log("Cek isi FormData sebelum dikirim:");
        console.log(Array.from(dataToSend.entries()));

        try {
            await makeTransaction(dataToSend);
            alert('Data transaksi berhasil disimpan!');
            router.push('/transaction');
            router.refresh();
        } catch (error) {
            alert('Gagal menyimpan data.');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmitAll} className="space-y-8 bg-white p-6 rounded-xl shadow border border-gray-200 max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-3">Tambah Transaksi Baru</h2>

            {/* BARIS 1: DROPDOWN & DATA UTAMA */}
            <HeaderSectionForm formData={formData} setFormData={setFormData} bengkels={bengkels} kendaraans={kendaraans} />

            {/* BARIS 2: NOTA & TANGGAL */}
            <DateInvoiceSectionForm formData={formData} setFormData={setFormData} />

            {/* BARIS 3: UPLOAD FOTO NOTA */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Foto Nota *</label>
                <input type="file" required accept="image/jpeg, image/png, image/heif" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 file:cursor-pointer hover:file:bg-blue-100" onChange={(e) => setFotoNota(e.target.files ? e.target.files[0] : null)} />
            </div>

            {/* TABEL 1: DATA DETAIL SERVICE */}
            <ServiceSectionForm services={services} setServices={setServices} totalBiayaService={totalBiayaService} />

            {/* TABEL 2: DATA DETAIL SPAREPART */}
            <SparepartSectionForm spareparts={spareparts} setSpareparts={setSpareparts} totalBiayaSparepart={totalBiayaSparepart} />

            {/* BARIS KEUANGAN AKHIR (DENGAN LIVE CURRENCY FORMAT) */}
            <FinancialSummarySectionForm biayaBruto={biayaBruto} biayaNetto={biayaNetto} formData={formData} setFormData={setFormData} />

            {/* TOMBOL SIMPAN UTAMA */}
            <div className="flex justify-end pt-4">
                <button type="submit" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow font-bold text-md transition-colors">
                    💾 Simpan Semua Transaksi
                </button>
            </div>
            
        </form>
    );
}