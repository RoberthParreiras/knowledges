import type { ChannelModel } from "amqplib";

export async function emitStatus(
  jsonData: {},
  exchange: string,
  connection: ChannelModel,
) {
  const channel = await connection.createChannel();

  await channel.assertExchange(exchange, "fanout", {
    durable: false,
  });

  const payload = JSON.stringify(jsonData);

  channel.publish(exchange, "", Buffer.from(payload), {
    contentType: "application/json",
  });

  channel.close();
}
