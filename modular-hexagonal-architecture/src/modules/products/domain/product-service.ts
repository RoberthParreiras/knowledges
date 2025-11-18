import { IProductRepository } from "./product-repository";
import { Product } from "./product-schema";

export class ProductService {
  constructor(private productRepository: IProductRepository) {}

  async getProduct(productId: string): Promise<Product> {
    return await this.productRepository.get(productId);
  }

  async getProducts(): Promise<Product[]> {
    return await this.productRepository.getAll();
  }

  async deleteProduct(productId: string): Promise<void> {
    this.productRepository.delete(productId);
  }

  async addProduct(data: {
    name: string;
    price: number;
    inventory: number;
  }): Promise<Product> {
    return await this.productRepository.add({
      ...data,
    });
  }
}
