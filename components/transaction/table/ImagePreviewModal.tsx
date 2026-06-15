'use client';

import { useState } from 'react';

interface InvoicePhotoModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: any; // 🔴 Diubah ke any karena data dari backend bisa berupa string mentah "['path']" atau array asli
}

export default function InvoicePhotoModal({ isOpen, onClose, data }: InvoicePhotoModalProps) {
    const [zoomImgUrl, setZoomImgUrl] = useState<string | null>(null);

    if (!isOpen) return null;

    // Fungsi pembersih string array gaib milikmu
    const getCleanUrls = (inputData: any): string[] => {
        if (!inputData) return [];

        // Jika data sudah berupa Array asli dari backend
        if (Array.isArray(inputData)) {
            return inputData;
        }

        // Jika data berupa String yang mirip array, misal: "['uploads\\trx...']"
        if (typeof inputData === 'string') {
            let cleanStr = inputData.trim();

            // Cek apakah diawali '[' dan diakhiri ']'
            if (cleanStr.startsWith('[') && cleanStr.endsWith(']')) {
                return cleanStr
                    .slice(1, -1) // Buang bracket [ dan ]
                    .split(',')   // Pisahkan jika ada lebih dari 1 foto
                    .map(item => item.trim().replace(/^['"]|['"]$/g, '')); // Buang sisa tanda kutip ' atau "
            }

            // Jika string biasa tanpa bracket
            return [cleanStr];
        }

        return [];
    };

    const getImageUrl = (dbPath: string) => {
        if (!dbPath) return '';
        let cleanPath = dbPath.replace(/\\/g, '/'); // Ubah backslash \ jadi forward slash /
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ; // Fallback ke lokal jika env belum terbaca
        return `${baseUrl}/${cleanPath}`;
    };

    // 🟢 SAKTI: Bersihkan dulu data mentah menjadi array string murni di sini
    const cleanedImages = getCleanUrls(data);

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity animate-fadeIn">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden transform scale-100 transition-transform">

                {/* Modal Header */}
                <div className="p-4 border-b flex items-center justify-between bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        🖼️ Foto Nota Transaksi
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold p-1 rounded hover:bg-gray-200 w-8 h-8 flex items-center justify-center">
                        &times;
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto flex-1">
                    <div className="flex flex-col items-center justify-center gap-6">
                        {/* 🟢 SEKARANG KITA LOOPING DARI HASIL YANG SUDAH BERSIH */}
                        {cleanedImages && cleanedImages.length > 0 ? (
                            cleanedImages.map((imgUrl: string, idx: number) => {
                                const fullApiUrl = getImageUrl(imgUrl);
                                return (
                                    <div key={idx} className="border border-gray-200 p-3 rounded-xl bg-gray-50 w-full max-w-md shadow-sm">
                                        <div className="text-[11px] text-gray-500 mb-2 font-mono break-all bg-gray-200/60 p-2 rounded border border-gray-300/50 flex justify-between items-center">
                                            <div><span className="font-bold text-gray-700">Nota:</span> {idx + 1}</div>
                                            <span className="text-xs text-blue-600 font-sans font-medium">💡 Klik gambar untuk memperbesar</span>
                                        </div>

                                        <div className="relative w-full overflow-hidden rounded-lg bg-gray-200 border border-gray-300 min-h-[250px] flex items-center justify-center">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={fullApiUrl}
                                                alt={`Nota Transaksi ${idx + 1}`}
                                                onClick={() => setZoomImgUrl(fullApiUrl)}
                                                className="w-full h-auto max-h-[400px] object-contain hover:scale-105 transition-transform duration-300 cursor-zoom-in"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.onerror = null;
                                                    target.src = "https://placehold.co/600x400?text=Gambar+Nota+Tidak+Ditemukan";
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-gray-500 text-center py-4">Tidak ada foto nota untuk transaksi ini.</p>
                        )}
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t bg-gray-50 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors">
                        Tutup
                    </button>
                </div>
            </div>

            {/* LIGHTBOX ZOOM FULL SCREEN */}
            {zoomImgUrl && (
                <div
                    onClick={() => setZoomImgUrl(null)}
                    className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex flex-col items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
                >
                    <button
                        onClick={() => setZoomImgUrl(null)}
                        className="fixed top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center transition-colors border border-white/20 shadow"
                    >
                        &times;
                    </button>
                    <div className="max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center select-none" onClick={(e) => e.stopPropagation()}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={zoomImgUrl} alt="Nota Terzoom" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-white/10" />
                    </div>
                    <p className="text-white/60 text-xs mt-4 tracking-wide font-medium">
                        Klik area hitam atau tombol silang untuk kembali
                    </p>
                </div>
            )}
        </div>
    );
}