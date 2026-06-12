import Link from "next/link";
import { fetchKendaraans } from '@/business/kendaraanService'
import KendaraanTable from "@/components/kendaraan/KendaraanTable";
import KendaraanAdvanceFilter from "@/components/kendaraan/KendaraanAdvanceFilter";

export default async function KendaraanPage(props: {
    searchParams: Promise<{
        page?: string;
        limit?: string;
        status?: string;
        sortBy?: string;
        order?: string
        search?: string;
    }>
}) {
    const searchParams = await props.searchParams;
    const page = parseInt(searchParams.page || '1');
    const limit = parseInt(searchParams.limit || '10');
    const status = searchParams.status || 'all';
    const sortBy = searchParams.sortBy || '';
    const order = searchParams.order || 'asc';
    const search = searchParams.search || '';
    
    const { data, totalPage, currentPage, totalData } = await fetchKendaraans(page, limit, status, sortBy, order, search);
    
    return (
        <div className="p-6">
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold">Master Kendaraan</h1>
                <Link href="kendaraan/add" className="bg-blue-600 text-white px-4 py-2 rounded">Tambah Kendaraan</Link>
            </div>
            <div className="mb-4">
                <KendaraanAdvanceFilter />
            </div>
            <KendaraanTable data={data} totalPages={totalPage} currentPage={currentPage} totalItems={totalData} />
        </div>
    )
}