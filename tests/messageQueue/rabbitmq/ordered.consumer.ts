import amqp from "amqplib";
import { Buffer } from "buffer";

const consumerOrderedMessage = async () => {
  const connection = await amqp.connect("amqp://guest:12345@localhost");
  const channel = await connection.createChannel();
  const queueName = "ordered-queued-message";
  await channel.assertQueue(queueName, { durable: true });

  // cac message thu tu
  channel.prefetch(1);

  channel.consume(queueName, (msg) => {
    const message = msg.content.toString();

    setTimeout(() => {
      console.log("pressed", message);
      channel.ack(msg);
    }, Math.random() * 1000);
  });
};

consumerOrderedMessage().catch(() => {
  console.log("error");
});
