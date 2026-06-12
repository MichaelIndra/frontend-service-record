import { getKendaraans, getKendaraanByNoPol, createKendaraan, updateKendaraan, getKendaraanByStatus } from "@/data/kendaraanRepository";

export const fetchKendaraans = async (
    page: number,
    limit: number,
    status?: string,
    sortBy?: string,
    order?: string,
    search?: string) => {
    return await getKendaraans(page, limit, status, sortBy, order, search);
}

export const fetchKendaraanDetail = async (nopol: string) => {
    if (!nopol) throw new Error('Nopol kendaraan tidak valid');
    const res = await getKendaraanByNoPol(nopol);
    return res;
}

export const fetchKendaraanByStatus = async (status: number) => {
    if(!status) throw new Error('Status tidak valid');
    return await getKendaraanByStatus(status)
}

export const addKendaraan = async (data: any) => {
    return await createKendaraan(data);
}

export const editKendaraan = async (nopol: string, data: any) => {
    return await updateKendaraan(nopol, data);
}