import { apiClient, apiWithFile } from "@/lib/apiClient"

const PATH = '/transaction';

export const getTransactions = async (
    page: number,
    limit: number,
    sortBy?: string,
    order?: string,
) => {
    let query = `?page=${page}&limit=${limit}`;
    if (sortBy) query += `&sortBy=${sortBy}`;
    if (order) query += `&order=${order}`;

    const response = await apiClient(`${PATH}${query}`);

    return {
        data: response.data,
        totalPage: response.total_page,
        currentPage: response.page,
        totalData: response.total_data
    };
}

export const createTransaction = async (data: any) => {
    return await apiWithFile(`${PATH}`, {
        method: 'POST',
        body: data,
    });
}