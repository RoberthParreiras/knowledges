import { getCheckoutSession } from "@/common/lib/actions/payment-actions";

export default async function Success({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  if (!searchParams.session_id) {
    throw new Error("Please provide a valid session_id");
  }

  const checkoutSession = await getCheckoutSession(searchParams.session_id);

  return (
    <div>
      <h1>Payment successful</h1>
      <p>Congratulation {checkoutSession?.customerName}</p>
    </div>
  );
}
