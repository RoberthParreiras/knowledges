import { getCheckoutSessionAction } from "@/common/lib/actions/payment-actions";
import { redirect } from "next/navigation";

export default async function Success({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  if (!searchParams.session_id) {
    redirect("/");
  }

  const checkoutSession = await getCheckoutSessionAction(
    searchParams.session_id
  );

  return (
    <div>
      <h1>Payment successful</h1>
      <p>Congratulation {checkoutSession?.customerName}</p>
    </div>
  );
}
