import { Product } from "@/modules/products/domain/product-schema";
import MercadoPagoButton from "./button-mercado-pago";
import addCheckoutSessionAction from "@/common/lib/actions/payment-actions";

export default async function MercadoPagoCheckoutButton({
  productInfo,
}: {
  productInfo: Product;
}) {
  const preference = await addCheckoutSessionAction(productInfo);

  return (
    <div>
      {preference?.id && <MercadoPagoButton preferenceId={preference.id} />}
    </div>
  );
}
