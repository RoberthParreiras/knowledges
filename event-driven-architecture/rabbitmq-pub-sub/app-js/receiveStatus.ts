#!/usr/bin/env bun

import amqp from "amqplib";
import { RABBITMQ_URI, STATUS_EXCHANGE } from "./constants";

async function main() {
  const connection = await amqp.connect(RABBITMQ_URI);
  const channel = await connection.createChannel();

  await channel.assertExchange(STATUS_EXCHANGE, "fanout", {
    durable: false,
  });

  const q = await channel.assertQueue("", {
    exclusive: true,
  });
  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
  channel.bindQueue(q.queue, STATUS_EXCHANGE, "");

  channel.consume(
    q.queue,
    (msg) => {
      if (msg?.content) {
        const parsed = JSON.parse(msg.content.toString());
        console.log(" [x]", parsed);
        channel.ack(msg);

        return {
          status: "OK",
          payload: parsed,
        };
      }
    },
    {
      noAck: false,
    },
  );
}

main();
