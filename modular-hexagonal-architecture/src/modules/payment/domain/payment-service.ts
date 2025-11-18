import { Product } from "@/modules/products/domain/product-schema";
import { IPayment } from "./payment-interface";

export class PaymentService {
  constructor(private payment: IPayment) {}

  async addPaymentCheckoutSession(
    productInfo: Product
  ): Promise<{ id: string } | void> {
    return await this.payment.addCheckoutSession(productInfo);
  }

  async getPaymentCheckoutSession(
    sessionId: string
  ): Promise<{ customerName: string }> {
    return await this.payment.getCheckoutSession(sessionId);
  }
}
