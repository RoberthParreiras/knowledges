#!/usr/bin/env bun

import amqp from "amqplib";
import { RABBITMQ_URI, STATUS_EXCHANGE } from "../constants";
import { handleOrderCreatedEvent } from "../applications/order.handler";

async function orderSubscriber() {
  const connection = await amqp.connect(RABBITMQ_URI);
  const channel = await connection.createChannel();

  await channel.assertExchange(STATUS_EXCHANGE, "fanout", { durable: false });

  const q = await channel.assertQueue("", { exclusive: true });

  channel.bindQueue(q.queue, STATUS_EXCHANGE, "");
  console.log(" [*] Inventory Subscriber waiting for messages.");

  channel.consume(
    q.queue,
    async (msg) => {
      if (!msg) return;

      try {
        const parsedPayload = JSON.parse(msg.content.toString());
        await handleOrderCreatedEvent(parsedPayload);

        channel.ack(msg);
        console.log(" [v] Created Order with success")
      } catch (error) {
        console.error("[RabbitMQ] Message processing failed:", error);
      }
    },
    {
      noAck: false,
    },
  );
}

orderSubscriber();
