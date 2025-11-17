"use server";

import * as Sentry from "@sentry/nextjs";
import Stripe from "stripe";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  Product,
  productSchema,
} from "@/modules/products/domain/product-schema";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const addCheckout = productSchema.omit({ id: true, inventory: true });

export async function addCheckoutSession(productInfo: Product) {
  try {
    const validatedData = addCheckout.parse(productInfo);

    const origin = (await headers()).get("origin");

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
  } catch (error: any) {
    if (error.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    Sentry.captureException(error);
    console.log(error);
  }
}

export async function getCheckoutSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  return {
    customerName: session.customer_details?.name,
  };
}
