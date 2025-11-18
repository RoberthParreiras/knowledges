"use server";

import * as Sentry from "@sentry/nextjs";

import { Product } from "@/modules/products/domain/product-schema";
import { MercadoPagoGateway } from "@/modules/payment/infrastructure/mercado-pago-gateway";
import { PaymentService } from "@/modules/payment/domain/payment-service";
import { StripeGateway } from "@/modules/payment/infrastructure/stripe-gateway";

// const apiGateway = new StripeGateway()
const apiGateway = new MercadoPagoGateway();
const apiGatewayClient = new PaymentService(apiGateway);

export default async function addCheckoutSessionAction(productInfo: Product) {
  try {
    const session = await apiGatewayClient.addPaymentCheckoutSession(
      productInfo
    );
    return session;
  } catch (error: any) {
    if (error.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    Sentry.captureException(error);
    console.log(error);
  }
}

export async function getCheckoutSessionAction(sessionId: string) {
  try {
    const session = await apiGatewayClient.getPaymentCheckoutSession(sessionId);
    return session;
  } catch (error) {
    console.log("Error", error);
  }
}
