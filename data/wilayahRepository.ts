const BASE_PROXY_URL = '/api/wilayah';

export const fetchProvinces = async () => {
  const res = await fetch(`${BASE_PROXY_URL}?type=provinces`);
  if (!res.ok) throw new Error('Gagal mengambil data provinsi');
  return res.json();
};

export const fetchRegencies = async (provinceCode: string) => {
  const res = await fetch(`${BASE_PROXY_URL}?type=regencies&code=${provinceCode}`);
  if (!res.ok) throw new Error('Gagal mengambil data kota/kabupaten');
  return res.json();
};

export const fetchDistricts = async (regencyCode: string) => {
  const res = await fetch(`${BASE_PROXY_URL}?type=districts&code=${regencyCode}`);
  if (!res.ok) throw new Error('Gagal mengambil data kecamatan');
  return res.json();
};

export const fetchVillages = async (districtCode: string) => {
  const res = await fetch(`${BASE_PROXY_URL}?type=villages&code=${districtCode}`);
  if (!res.ok) throw new Error('Gagal mengambil data kelurahan/desa');
  return res.json();
};