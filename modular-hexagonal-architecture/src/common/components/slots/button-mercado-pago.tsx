"use client";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

initMercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY as string);

export default function MercadoPagoButton({
  preferenceId,
}: {
  preferenceId: string;
}) {
  if (!preferenceId) {
    return null;
  }

  return <Wallet initialization={{ preferenceId }} />;
}
