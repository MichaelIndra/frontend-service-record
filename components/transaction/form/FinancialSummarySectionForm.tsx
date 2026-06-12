'use client';
import {formatRupiah, parseNumber} from '@/constants/functionData'

interface FinancialSummarySectionProps {
    biayaBruto: number;
    biayaNetto: number;
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function FinancialSummarySectionForm({ biayaBruto, biayaNetto, formData, setFormData }: FinancialSummarySectionProps) {
    

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 items-end">
            <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Biaya Bruto (Rp) *</label>
                <div className="w-full p-2 bg-gray-100 text-gray-700 font-bold text-md rounded text-right border border-gray-300">
                    Rp {biayaBruto.toLocaleString('id-ID')}
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">PPN (Rp)</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 text-sm">Rp</span>
                    </div>
                    <input 
                        type="text" 
                        className="w-full p-2 pl-9 border rounded font-semibold text-blue-600 text-right" 
                        placeholder="0" 
                        value={formatRupiah(formData.ppn)} 
                        onChange={(e) => setFormData({ ...formData, ppn: parseNumber(e.target.value) })} 
                    />
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Diskon (Rp)</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 text-sm">Rp</span>
                    </div>
                    <input 
                        type="text" 
                        className="w-full p-2 pl-9 border rounded font-semibold text-red-600 text-right" 
                        placeholder="0" 
                        value={formatRupiah(formData.diskon)} 
                        onChange={(e) => setFormData({ ...formData, diskon: parseNumber(e.target.value) })} 
                    />
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Biaya Netto (Kalkulasi Otomatis)</label>
                <div className="w-full p-2 bg-emerald-100 text-emerald-800 font-bold text-lg rounded text-right border border-emerald-300">
                    Rp {biayaNetto.toLocaleString('id-ID')}
                </div>
            </div>
        </div>
    );
}