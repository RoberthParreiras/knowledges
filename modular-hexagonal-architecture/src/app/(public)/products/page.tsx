import CheckoutButton from "@/common/components/slots/button-mercado-pago-checkout";
import ProductCard from "@/common/components/ui/product";
import { getAllProductsAction } from "@/common/lib/actions/product-actions";
import Link from "next/link";

export default async function ProductsPage() {
  const productList = await getAllProductsAction();

  return (
    <div className="p-5">
      <div>
        <Link href="/products/add" passHref>
          <button>Add New Product</button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {productList.products?.length ? (
          productList.products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} passHref>
              <ProductCard product={product} />
            </Link>
          ))
        ) : (
          <div>There is no product</div>
        )}
      </div>
    </div>
  );
}
