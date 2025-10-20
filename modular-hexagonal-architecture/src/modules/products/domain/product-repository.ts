import { Product } from "./product-schema";

export interface IProductRepository {
  getAll(): Promise<Product[]>;
  add(product: Omit<Product, "id">): Promise<Product>;
  delete(productId: string): void;
}
