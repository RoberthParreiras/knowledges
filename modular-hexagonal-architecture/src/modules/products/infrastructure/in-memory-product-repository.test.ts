import { beforeEach, describe, expect, it } from "vitest";
import { inMemoryProductRepository } from "./in-memory-product-repository";
import { Product } from "../domain/product-schema";

describe("InMemoryProductRepository", () => {
  let repo = new inMemoryProductRepository();

  beforeEach(() => {
    repo = new inMemoryProductRepository();
  });

  describe("getAll", () => {
    it("should return a list of all products", async () => {
      const expectedProducts: Product[] = [
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

      const products = await repo.getAll();

      expect(products).toEqual(expectedProducts);
      expect(products.length).toBe(2);
    });
  });
});
