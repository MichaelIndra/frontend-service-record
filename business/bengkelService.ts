import { getBengkels, createBengkel, updateBengkel, getBengkelById, getBengkelByStatus } from "@/data/bengkelRepository";

export const fetchBengkels = async (
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
    return await getBengkels(page, limit, status, sortBy, order, search, provinsi, kota_kab, kecamatan, kelurahan);
}   

export const addBengkel = async (data: any) => {
    return await createBengkel(data);
}  

export const editBengkel = async (id: number, data: any) => {
    return await updateBengkel(id, data);
}   

export const fetchBengkelDetail = async (id: number) => {
    if (!id) throw new Error('ID bengkel tidak valid');
    const res = await getBengkelById(id);
    return res;
}

export const fetchBengkelByStatus = async (status: number) => {
    if(!status) throw new Error('Status tidak valid');
    return await getBengkelByStatus(status)
}