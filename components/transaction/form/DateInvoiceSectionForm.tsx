'use client';

interface DateInvoiceSectionProps {
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function DateInvoiceSectionForm({ formData, setFormData }: DateInvoiceSectionProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">No Nota (Opsional)</label>
                <input
                    type="text"
                    placeholder="Masukkan nomor nota"
                    className="w-full p-2.5 border rounded-lg text-sm"
                    value={formData.no_nota}
                    onChange={(e) => setFormData({ ...formData, no_nota: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tanggal Masuk</label>
                <input
                    type="date"
                    className="w-full p-2.5 border rounded-lg text-sm"
                    value={formData.tanggal_masuk}
                    onChange={(e) => setFormData({ ...formData, tanggal_masuk: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tanggal Selesai</label>
                <input
                    type="date"
                    className="w-full p-2.5 border rounded-lg text-sm"
                    value={formData.tanggal_selesai}
                    onChange={(e) => setFormData({ ...formData, tanggal_selesai: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tanggal Transaksi *</label>
                <input
                    type="date"
                    required
                    className="w-full p-2.5 border rounded-lg text-sm"
                    value={formData.tanggal_transaksi}
                    onChange={(e) => setFormData({ ...formData, tanggal_transaksi: e.target.value })}
                />
            </div>
        </div>
    );
}