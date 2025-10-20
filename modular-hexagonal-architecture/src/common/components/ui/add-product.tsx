"use client";

import { addProductAction } from "@/common/lib/actions/product-actions";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

const initialState = {
  message: "",
  success: false,
};

export function AddProduct() {
  const [state, formAction] = useActionState(addProductAction, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      alert("Product created successfully!");
      router.push("/products");
    }
  }, [state, router]);

  return (
    <form action={formAction} className="flex flex-col gap-4 max-w-md">
      <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
      <div>
        <label htmlFor="name" className="block mb-1 font-medium">
          Product Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="price" className="block mb-1 font-medium">
          Price
        </label>
        <input
          id="price"
          name="price"
          type="number"
          step="0.01"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="inventory" className="block mb-1 font-medium">
          Inventory
        </label>
        <input
          id="inventory"
          name="inventory"
          type="number"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Create Product
      </button>

      {state?.message && !state.success && (
        <p className="text-red-600">{state.message}</p>
      )}
    </form>
  );
}
