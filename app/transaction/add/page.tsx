import TransactionForm from '@/components/transaction/TransactionForm'
import { fetchKendaraanByStatus } from '@/business/kendaraanService';
import { fetchBengkelByStatus } from '@/business/bengkelService';

export default async function AddTransactionPage() {
  let bengkels = [];
  let kendaraans = [];

  try {
    const resKendaraan = await fetchKendaraanByStatus(1);
    kendaraans = resKendaraan?.data ? resKendaraan.data : resKendaraan;

    const resBengkel = await fetchBengkelByStatus(1);
    bengkels = resBengkel?.data ? resBengkel.data : resBengkel;
  } catch (error) {
    console.error("Gagal mengambil data master di server:", error);
  }
  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <TransactionForm bengkels={Array.isArray(bengkels) ? bengkels : []} kendaraans={Array.isArray(kendaraans) ? kendaraans : []} />
    </div>
  );
}