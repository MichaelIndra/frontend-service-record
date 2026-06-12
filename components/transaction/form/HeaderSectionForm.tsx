'use client'

interface HeaderSectionProps {
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    bengkels: any[];
    kendaraans: any[];
}

export default function HeaderSectionForm({ formData, setFormData, bengkels, kendaraans }: HeaderSectionProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Pilih Kendaraan *</label>
                <select 
                    required 
                    className="w-full p-2.5 border rounded-lg bg-white text-sm" 
                    value={formData.no_polisi} 
                    onChange={(e) => setFormData({ ...formData, no_polisi: e.target.value })}
                >
                    <option value="">-- Pilih No Polisi --</option>
                    {kendaraans.map(k => (
                        <option key={k.no_polisi} value={k.no_polisi}>{k.no_polisi} - {k.nama}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Pilih Bengkel *</label>
                <select 
                    required 
                    className="w-full p-2.5 border rounded-lg bg-white text-sm" 
                    value={formData.bengkel_id} 
                    onChange={(e) => setFormData({ ...formData, bengkel_id: e.target.value })}
                >
                    <option value="">-- Pilih Bengkel --</option>
                    {bengkels.map(b => (
                        <option key={b.id} value={b.id}>{b.nama} - {b.jenis_service}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">KM Kendaraan Saat Ini *</label>
                <input 
                    type="text" 
                    required 
                    placeholder="Contoh: 34414" 
                    className="w-full p-2.5 border rounded-lg text-sm" 
                    value={formData.km} 
                    onChange={(e) => setFormData({ ...formData, km: e.target.value })} 
                />
            </div>
        </div>
    );
}