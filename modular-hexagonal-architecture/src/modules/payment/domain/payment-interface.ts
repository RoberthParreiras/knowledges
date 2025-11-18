import { Product } from "@/modules/products/domain/product-schema";

export interface IPayment {
  addCheckoutSession(productInfo: Product): Promise<{ id: string } | void>;
  getCheckoutSession(sessionId: string): Promise<{ customerName: string }>;
}
