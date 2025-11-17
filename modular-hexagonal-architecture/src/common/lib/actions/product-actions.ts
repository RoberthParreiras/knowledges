"use server";

import * as Sentry from "@sentry/nextjs";

import {
  Product,
  productSchema,
} from "@/modules/products/domain/product-schema";
import { ProductService } from "@/modules/products/domain/product-service";
import { inMemoryProductRepository } from "@/modules/products/infrastructure/in-memory-product-repository";
import { PrismaProductRepository } from "@/modules/products/infrastructure/prisma-product-repository";
import { revalidatePath } from "next/cache";
import { authAction, authFormAction } from "./auth-wrapper";

// const productRepository = new inMemoryProductRepository();
const productRepository = new PrismaProductRepository();
const productService = new ProductService(productRepository);

const addProductSchema = productSchema.omit({ id: true });

export async function getAllProductsAction() {
  try {
    const products: Product[] = await productService.getProducts();
    return {
      message: "Success: fetched all the products",
      products: products,
      success: true,
    };
  } catch (error) {
    Sentry.captureException(error);
    return { message: "An unexpected error occurred" };
  }
}


export async function deleteProduct({ productId }: { productId: string }) {
  try {
    await productService.deleteProduct(productId);
    revalidatePath("/products");
    return { message: "Success: product deleted", success: true };
  } catch (error) {
    Sentry.captureException(error);
    return { message: "An unexpected error occurred" };
  }
}

export const deleteProductAction = authAction(deleteProduct);

async function addProduct(prevState: any, formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const dataToValidate = {
      ...rawData,
      price: parseFloat(rawData.price as string),
      inventory: parseInt(rawData.inventory as string, 10),
    };

    const validatedData = addProductSchema.parse(dataToValidate);
    await productService.addProduct(validatedData);
    revalidatePath("/products");

    return { message: "Success: Product created", success: true };
  } catch (error) {
    Sentry.captureException(error);
    return { message: "An unexpected error occurred" };
  }
}

export const addProductAction = authFormAction(addProduct);
