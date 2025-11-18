import prisma from "@/common/lib/prisma/prisma";
import { IProductRepository } from "../domain/product-repository";
import { Product } from "../domain/product-schema";

export class PrismaProductRepository implements IProductRepository {
  async get(productId: string): Promise<Product> {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    return {
      ...product,
      price: product?.price.toNumber() as number,
    } as Product;
  }

  async getAll(): Promise<Product[]> {
    const products = await prisma.product.findMany();
    return products.map((product) => ({
      ...product,
      price: product.price.toNumber(),
    }));
  }

  async delete(productId: string): Promise<void> {
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });
  }

  async add(product: Omit<Product, "id">): Promise<Product> {
    const newProduct = await prisma.product.create({
      data: {
        ...product,
      },
    });

    return {
      ...newProduct,
      price: newProduct.price.toNumber(),
    };
  }
}
