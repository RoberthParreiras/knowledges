import MercadoPagoCheckoutButton from "@/common/components/slots/button-mercado-pago-checkout";
import { getProductAction } from "@/common/lib/actions/product-actions";

export default async function ProductInfo({
  params,
}: {
  params: { slug: string };
}) {
  const { slug: productId } = await params;
  const productResult = await getProductAction({ productId });

  const { product } = productResult;

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">{product && product.name}</h1>
      <p className="text-xl text-gray-700">${product && product.price}</p>
      <div className="mt-6">
        {product && <MercadoPagoCheckoutButton productInfo={product} />}
      </div>
    </div>
  );
}
