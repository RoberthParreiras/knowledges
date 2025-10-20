import { IProductRepository } from "../domain/product-repository";
import { Product } from "../domain/product-schema";

const products: Product[] = [
  {
    id: "e86e05f9-2e00-4fca-9225-1f91eab6c57f",
    name: "name 1",
    price: 15,
    inventory: 200,
  },
  {
    id: "bc406692-df9d-4fa1-bf72-850566727106",
    name: "name 2",
    price: 20,
    inventory: 120,
  },
];

export class inMemoryProductRepository implements IProductRepository {
  async getAll(): Promise<Product[]> {
    return Promise.resolve(products);
  }
  
  delete(productId: string): void {}

  async add(product: Omit<Product, "id">): Promise<Product> {
    const newProduct = {
      id: "f86e05f9-2e00-4fca-9225-1f91eab6c57f",
      ...product,
    };

    products.push(newProduct);
    return Promise.resolve(newProduct);
  }
}
