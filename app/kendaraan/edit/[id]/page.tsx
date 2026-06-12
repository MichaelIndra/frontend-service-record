import KendaraanEditForm from "@/components/kendaraan/KendaraanEditForm";

export default async function EditKendaraanPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = (params.id); 
  
  return (
    <div className="py-6">
      <KendaraanEditForm nopol={id} /> 
      </div>
  );
}   