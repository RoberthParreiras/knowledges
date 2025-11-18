import { Product } from "./product-schema";

export interface IProductRepository {
  get(productId: string): Promise<Product>;
  getAll(): Promise<Product[]>;
  add(product: Omit<Product, "id">): Promise<Product>;
  delete(productId: string): void;
}
