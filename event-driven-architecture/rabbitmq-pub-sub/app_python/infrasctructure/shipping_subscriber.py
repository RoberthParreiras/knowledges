#!/usr/bin/env python3
import pika
import json
import asyncio
from app_python.services.correios import send_package
from app_python.constants import RABBITMQ_URI, STATUS_EXCHANGE

def shipping_subscriber():
    params = pika.URLParameters(RABBITMQ_URI)
    connection = pika.BlockingConnection(params)
    channel = connection.channel()

    channel.exchange_declare(exchange=STATUS_EXCHANGE, exchange_type="fanout")

    result = channel.queue_declare(queue='', exclusive=True)
    queue_name = result.method.queue

    channel.queue_bind(exchange=STATUS_EXCHANGE, queue=queue_name)

    print(" [*] Shipping Subscriber waiting for messages.")

    def callback(ch, method, properties, body):
        try:
            payload = json.loads(body.decode())

            asyncio.run(send_package(payload=payload))

            ch.basic_ack(delivery_tag=method.delivery_tag)
            print(" [v] Created Shipping with success")
        except Exception as e:
            print("[RabbitMQ] Message processing failed: ", e)

    channel.basic_consume(
        queue=queue_name, on_message_callback=callback, auto_ack=False
    )

    channel.start_consuming()

shipping_subscriber()