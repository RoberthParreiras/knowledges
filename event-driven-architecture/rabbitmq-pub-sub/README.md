This repo focus in the use of RabbitMQ as a message broker and the use of the pattern Publish/Subscribe. This pattern focus on a producer sending a message, a queue storing the messages and the consumer receiving the message. In the application, instead of calling the queue directly to a producer when he sends a message, between the producer and the queue, includes a exchange. It is used to send the messages to the queues, handling which queues should receive the messages.

# Implementation
The application is a simple (very simple) checkout route writen using Bun, and it sents the payload of the buy to two subscribes: A order subscribe that is writen using TypeScript, and another shipping subscribe that is writen using python. The pourpose of using two differents languages was to test for a real life scenario that uses services in differents programming languages. The RabbitMQ broker is running using Docker Compose.

# How to run
First, needs to run the RabbitMQ Docker image:
```sh
docker compose up
```

After this, run the receivers scripts:
```sh
cd app-js/
chmod +x ./receiveStatus.ts
./receiveStatus.ts
```

```sh
cd app_python/infrastructure/
chmod +x ./shipping_subscriber
cd ../../
python3 -m app_python.infrasctructure.shipping_subscriber
```

then, run the main application and the producer:
```sh
cd app-js/
bun run start
```