import MercadoPagoConfig, { Payment, Preference } from "mercadopago";
import { IPayment } from "../domain/payment-interface";
import { Product } from "@/modules/products/domain/product-schema";
import { paymentSchema } from "../domain/payment-schema";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN as string,
});
const payment = new Payment(client);

export class MercadoPagoGateway implements IPayment {
  async addCheckoutSession(
    productInfo: Product
  ): Promise<{ id: string } | void> {
    const validatedData = paymentSchema.parse(productInfo);

    const origin = process.env.NEXT_PUBLIC_SITE_URL;

    const preference = new Preference(client);

    const session = await preference.create({
      body: {
        items: [
          {
            id: validatedData.id,
            title: validatedData.name,
            quantity: 1,
            unit_price: validatedData.price,
          },
        ],

        payment_methods: {
          installments: 5,
        },
        // use only with a DNS
        // back_urls: {
        //   success: `${origin}/success`,
        //   failure: `${origin}/cancel`,
        // },
        // auto_return: "approved",
      },
    });

    return { id: session.id as string };
  }

  async getCheckoutSession(
    sessionId: string
  ): Promise<{ customerName: string }> {
    const paymentDetails = await payment.get({
      id: sessionId,
    });

    return {
      customerName: paymentDetails.payer?.first_name as string,
    };
  }
}
