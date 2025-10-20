import { describe, it, expect, vi, beforeEach } from "vitest";
import { ProductService } from "./product-service";
import { Product } from "./product-schema";
import { IProductRepository } from "./product-repository";

describe("ProductService", () => {
  const mockRepo: IProductRepository = {
    getAll: vi.fn(),
    add: vi.fn(),
    delete: vi.fn(),
  };
  const productService = new ProductService(mockRepo);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const productData: Product[] = [
    {
      id: "7ac9a9ca-a2b2-47e1-aaa5-1e69b56f00dc",
      name: "Steel Beam",
      price: 120.5,
      inventory: 200,
    },
    {
      id: "9e89eef9-e8a2-4aa1-8b5c-ca8ccffba12e",
      name: "Steel Plate",
      price: 85.0,
      inventory: 120,
    },
  ];

  describe("getProducts", () => {
    it("should return all products from the repository", async () => {
      (mockRepo.getAll as ReturnType<typeof vi.fn>).mockResolvedValue(
        productData
      );

      const products = await productService.getProducts();

      expect(mockRepo.getAll).toHaveBeenCalledOnce();
      expect(products).toEqual(productData);
      expect(products.length).toBe(2);
    });
  });
});
