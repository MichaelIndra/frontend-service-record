import Link from "next/link";
import { fetchTransactions } from '@/business/transactionService'
import TransactionTable from "@/components/transaction/TransactionTable";

export default async function TransactionPage(props: {
    searchParams: Promise<{
        page?: string;
        limit?: string;
        sortBy?: string;
        order?: string
    }>
}) {
    const searchParams = await props.searchParams;
    const page = parseInt(searchParams.page || '1');
    const limit = parseInt(searchParams.limit || '10');
    const sortBy = searchParams.sortBy || '';
    const order = searchParams.order || 'asc';
    
    const { data, totalPage, currentPage, totalData } = await fetchTransactions(page, limit, sortBy, order);
    return (
        <div className="p-6">
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold">Transaksi</h1>
                <Link href="transaction/add" className="bg-blue-600 text-white px-4 py-2 rounded">Tambah Transaksi</Link>
            </div>
            
            <TransactionTable data={data} totalPages={totalPage} currentPage={currentPage} totalItems={totalData} />
        </div>
    )
}