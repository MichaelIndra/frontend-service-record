import Link from "next/link";
import { fetchBengkels } from '@/business/bengkelService'
import BengkelTable from "@/components/bengkel/BengkelTable";
import BengkelAdvanceFilter from "@/components/bengkel/BengkelAdvanceFilter";

export default async function BengkelPage(props: {
    searchParams: Promise<{
        page?: string;
        limit?: string;
        status?: string;
        sortBy?: string;
        order?: string
        search?: string;
        provinsi?: string;
        kota_kab?: string;
        kecamatan?: string;
        kelurahan?: string;
    }>
}) {
    const searchParams = await props.searchParams;
    const page = parseInt(searchParams.page || '1');
    const limit = parseInt(searchParams.limit || '10');
    const status = searchParams.status || 'all';
    const sortBy = searchParams.sortBy || '';
    const order = searchParams.order || 'asc';
    const search = searchParams.search || '';
    const provinsi = searchParams.provinsi || '';
    const kota_kab = searchParams.kota_kab || '';
    const kecamatan = searchParams.kecamatan || '';
    const kelurahan = searchParams.kelurahan || '';
    
    const { data, totalPage, currentPage, totalData } = await fetchBengkels(page, limit, status, sortBy, order, search, provinsi, kota_kab, kecamatan, kelurahan);

    return (
        <div className="p-6">
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold">Master Bengkel</h1>
                <Link href="bengkel/add" className="bg-blue-600 text-white px-4 py-2 rounded">Tambah Bengkel</Link>
            </div>
            <div className="mb-4">
                <BengkelAdvanceFilter />
            </div>
            <BengkelTable data={data} totalPages={totalPage} currentPage={currentPage} totalItems={totalData} />
        </div>
    )
}