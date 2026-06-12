'use client';
import {formatRupiah} from '@/constants/functionData'

interface ServiceDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: any[] | null;
}

export default function ServiceDetailModal({ isOpen, onClose, data }: ServiceDetailModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity animate-fadeIn">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden transform scale-100 transition-transform">
                
                {/* Modal Header */}
                <div className="p-4 border-b flex items-center justify-between bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        ⚙️ Detail Layanan Service
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold p-1 rounded hover:bg-gray-200 w-8 h-8 flex items-center justify-center">
                        &times;
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto flex-1">
                    <div className="overflow-x-auto border border-gray-100 rounded-lg">
                        <table className="min-w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-700 text-xs font-semibold uppercase border-b">
                                <tr>
                                    <th className="py-2.5 px-4">Nama Service</th>
                                    <th className="py-2.5 px-4 text-right">Biaya</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {data && data.length > 0 ? (
                                    data.map((svc: any) => (
                                        <tr key={svc.id} className="hover:bg-gray-50">
                                            <td className="py-2.5 px-4 font-medium text-gray-800">{svc.nama_service}</td>
                                            <td className="py-2.5 px-4 text-right text-emerald-700 font-semibold">{formatRupiah(svc.biaya)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={2} className="text-center py-4 text-gray-500">Tidak ada detail service.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t bg-gray-50 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors">
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}