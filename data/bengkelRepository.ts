import { apiClient } from "@/lib/apiClient";

const PATH = '/bengkel';

export const getBengkels = async (
    page: number,
    limit: number,
    status?: string,
    sortBy?: string,
    order?: string,
    search?: string,
    provinsi?: string,
    kota_kab?: string,
    kecamatan?: string,
    kelurahan?: string
) => {
    let query = `?page=${page}&limit=${limit}`;
    if (status && status !== 'all') query += `&aktif=${status}`;
    if (sortBy) query += `&sort_by=${sortBy}`;
    if (order) query += `&order=${order}`;
    if (search) query += `&search=${encodeURIComponent(search)}`;
    if (provinsi) query += `&provinsi=${encodeURIComponent(provinsi)}`;
    if (kota_kab) query += `&kota_kab=${encodeURIComponent(kota_kab)}`;
    if (kecamatan) query += `&kecamatan=${encodeURIComponent(kecamatan)}`;
    if (kelurahan) query += `&kelurahan=${encodeURIComponent(kelurahan)}`;

    const response = await apiClient(`${PATH}${query}`);

    return {
        data: response.data,
        totalPage: response.total_page,
        currentPage: response.page,
        totalData: response.total_data
    };
}

export const getBengkelById = async (id: number) => {
    const res = await apiClient(`${PATH}/${id}`, {
        cache: 'no-store'
    })
    // if (!res.ok) throw new Error('repo Gagal mengambil detail data bengkel');
    return res;
}

export const getBengkelByStatus = async (status: number) =>{
    const res = await apiClient(`${PATH}/getBengkelByStatus/${status}`, {
        cache: 'no-store'
    })
    return res
}

export const createBengkel = async (data: any) => {
    // console.log(`data kirim : ${JSON.stringify(data)}`)
    return await apiClient(`${PATH}`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const updateBengkel = async (id: number, data: any) => {
    return await apiClient(`${PATH}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};