export default function PaymentPage({ params }: { params: { orderId: string } }) {
  return (
    <div>
      <h1>Payment - Order {params.orderId}</h1>
    </div>
  );
}
