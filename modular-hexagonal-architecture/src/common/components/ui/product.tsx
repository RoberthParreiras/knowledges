"use client";

import { deleteProductAction } from "@/common/lib/actions/product-actions";
import { Product } from "@/modules/products/domain/product-schema";
import { ReactNode } from "react";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-700">Price: ${product.price.toFixed(2)}</p>
      <p className="text-gray-700">Inventory: {product.inventory}</p>
      <button
        className="text-red-700"
        type="button"
        onClick={() => deleteProductAction({ productId: product.id })}
      >
        delete
      </button>
    </div>
  );
}
