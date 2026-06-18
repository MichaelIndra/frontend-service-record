import { apiClient } from "@/lib/apiClient"

const PATH = '/kendaraan';

export const getKendaraans = async (
    page: number,
    limit: number,
    status?: string,
    sortBy?: string,
    order?: string,
    search?: string,
) => {
    let query = `?page=${page}&limit=${limit}`;
    if (status && status !== 'all') query += `&aktif=${status}`;
    if (sortBy) query += `&sortBy=${sortBy}`;
    if (order) query += `&order=${order}`;
    if (search) query += `&search=${encodeURIComponent(search)}`;

    const response = await apiClient(`${PATH}${query}`);

    return {
        data: response.data,
        totalPage: response.total_page,
        currentPage: response.page,
        totalData: response.total_data
    };
}

export const getKendaraanByNoPol = async (nopol: string) => {
    const response = await apiClient(`${PATH}/${nopol}`, { cache : 'no-store'});
    return response;
};

export const getKendaraanByStatus = async (status: number) =>{
    const res = await apiClient(`${PATH}/getKendaraanByStatus/${status}`, {
        cache: 'no-store'
    })
    return res
}

export const createKendaraan = async (data: any) => {
    return await apiClient(`${PATH}`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const updateKendaraan = async (nopol: string, data: any) => {
    return await apiClient(`${PATH}/${nopol}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
};