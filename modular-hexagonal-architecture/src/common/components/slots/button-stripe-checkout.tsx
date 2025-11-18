import addCheckoutSessionAction from "@/common/lib/actions/payment-actions";
import { Product } from "@/modules/products/domain/product-schema";

export default function StripeCheckoutButton({
  productInfo,
}: {
  productInfo: Product;
}) {
  const stripeFormAction = async () => {
    await addCheckoutSessionAction(productInfo);
  };

  return (
    <form action={stripeFormAction}>
      <button type="submit">Checkout with Stripe</button>
    </form>
  );
}
