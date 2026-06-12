import BengkelEditForm from "@/components/bengkel/BengkelEditForm";

export default async function EditBengkelPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = Number(params.id);

  return (
    <div className="py-6">
      <BengkelEditForm id={id} />
    </div>
  );
}