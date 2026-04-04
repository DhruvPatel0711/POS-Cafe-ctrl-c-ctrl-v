export default function OrderPage({ params }: { params: { tableId: string } }) {
  return (
    <div>
      <h1>Order - Table {params.tableId}</h1>
    </div>
  );
}
