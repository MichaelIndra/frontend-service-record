import { fetchProvinces, fetchRegencies, fetchDistricts, fetchVillages } from '@/data/wilayahRepository';

export const getProvinces = async () => {
    const response = await fetchProvinces();
    return response.data || [];
}

export const getRegencies = async (provinceCode: string) => {
  if (!provinceCode) return [];
  const response = await fetchRegencies(provinceCode);
  return response.data || [];
};

export const getDistricts = async (regencyCode: string) => {
  if (!regencyCode) return [];
  const response = await fetchDistricts(regencyCode);
  return response.data || [];
};

export const getVillages = async (districtCode: string) => {
  if (!districtCode) return [];
  const response = await fetchVillages(districtCode);
  return response.data || [];
};

