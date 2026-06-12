import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";

export const HandleSort = (searchParams: ReadonlyURLSearchParams, router: AppRouterInstance, field: string, path: string) => {
    const currentOrder = searchParams.get('order') || 'asc';
    const currentSortBy = searchParams.get('sortBy') || '';
    const params = new URLSearchParams(searchParams.toString());

    if (currentSortBy === field) {
        // Jika kolom yang diklik sama, balikkan arahnya (asc -> desc -> default)
        if (currentOrder === 'asc') {
            params.set('order', 'desc');
        } else {
            // Jika sudah desc, diklik lagi maka kita reset sort-nya
            params.delete('sortBy');
            params.delete('order');
        }
    } else {
        // Jika klik kolom baru, set kolom tersebut dengan order 'asc'
        params.set('sortBy', field);
        params.set('order', 'asc');
    }

    params.set('page', '1'); // Reset ke halaman 1 setiap kali sort berubah
    router.push(`/${path}?${params.toString()}`);
};

export const HandleLimitChange = (searchParams: ReadonlyURLSearchParams, router: AppRouterInstance, newLimit: string, path: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('limit', newLimit);
    params.set('page', '1');
    router.push(`/${path}?${params.toString()}`);
};
export const formatRupiah = (value: number | string) => {
    if (!value || value === 0) return '';
    return Number(String(value).replace(/[^0-9]/g, '')).toLocaleString('id-ID');
};

export const parseNumber = (value: string) => {
    return Number(value.replace(/[^0-9]/g, '')) || 0;
};

export const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};