import Stripe from "stripe";
import { IPayment } from "../domain/payment-interface";
import { Product } from "@/modules/products/domain/product-schema";
import { paymentSchema } from "../domain/payment-schema";
import { redirect } from "next/navigation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export class StripeGateway implements IPayment {
  async addCheckoutSession(
    productInfo: Product
  ): Promise<{ id: string } | void> {
    const validatedData = paymentSchema.parse(productInfo);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "boleto"],
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: validatedData.name,
            },
            unit_amount: validatedData.price * 100,
          },
          quantity: 1,
        },
      ],
      payment_method_options: {
        card: {
          installments: {
            enabled: true,
          },
        },
      },
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
    });

    if (session.url) {
      redirect(session.url);
    }
  }

  async getCheckoutSession(
    sessionId: string
  ): Promise<{ customerName: string }> {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return {
      customerName: session.customer_details?.name as string,
    };
  }
}
