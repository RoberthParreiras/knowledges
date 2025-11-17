"use client";

import { deleteProductAction } from "@/common/lib/actions/product-actions";
import { Product } from "@/modules/products/domain/product-schema";
import CheckoutButton from "@/common/components/slots/button-checkout";

export default function Products({
  productList,
}: {
  productList: Product[] | undefined;
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {productList?.length ? (
          productList.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700">
                Price: ${product.price.toFixed(2)}
              </p>
              <p className="text-gray-700">Inventory: {product.inventory}</p>
              <CheckoutButton productInfo={product} />
              <button
                className="text-red-700"
                type="button"
                onClick={() => deleteProductAction({ productId: product.id })}
              >
                delete
              </button>
            </div>
          ))
        ) : (
          <div>There is no product</div>
        )}
      </div>
    </div>
  );
}
