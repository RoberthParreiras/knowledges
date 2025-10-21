import Products from "@/common/components/ui/product";
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
      <Products productList={productList.products} />
    </div>
  );
}
