import amqp from "amqplib";
import { emitStatus } from "./emitStatus";
import { RABBITMQ_URI, STATUS_EXCHANGE } from "./constants";

const connection = await amqp.connect(RABBITMQ_URI);

const server = Bun.serve({
  port: 3000,
  routes: {
    "/checkout": async () => {
      const productPayload = {
        orderId: Math.floor(Math.random() * 1000),
        item: "laptop",
        user: "Alice",
      };

      try {
        await emitStatus(productPayload, STATUS_EXCHANGE, connection);

        return new Response(
          JSON.stringify({
            success: true,
            message: "Order created with success",
            orderId: productPayload.orderId,
          }),
          { status: 200 },
        );
      } catch (error) {
        console.error("Failed to publish order:", error);
        return new Response("Internal Server Error", { status: 500 });
      }
    },
  },
});

console.log(`Listening on ${server.url}`);
