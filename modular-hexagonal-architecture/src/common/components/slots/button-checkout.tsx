import { addCheckoutSession } from "@/common/lib/actions/payment-actions";
import { Product } from "@/modules/products/domain/product-schema";

export default function CheckoutButton({
  productInfo,
}: {
  productInfo: Product;
}) {
  const createCheckoutSessionWithProduct = addCheckoutSession.bind(
    null,
    productInfo
  );

  return (
    <form action={createCheckoutSessionWithProduct}>
      <h1>Stripe checkout example</h1>
      <button type="submit">checkout</button>
    </form>
  );
}
