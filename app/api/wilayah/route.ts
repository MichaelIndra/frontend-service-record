import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type'); // provinces, regencies, districts, atau villages
  const code = searchParams.get('code'); // kode wilayahnya

  let targetUrl = `https://wilayah.id/api/${type}.json`;
  if (code) {
    targetUrl = `https://wilayah.id/api/${type}/${code}.json`;
  }

  try {
    const res = await fetch(targetUrl);
    if (!res.ok) return NextResponse.json({ error: 'Gagal mengambil data dari wilayah.id' }, { status: res.status });
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}