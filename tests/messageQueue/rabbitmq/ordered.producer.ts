import amqp from "amqplib";
import { Buffer } from "buffer";

const consumerOrderedMessage = async () => {
  const connection = await amqp.connect("amqp://guest:12345@localhost");
  const channel = await connection.createChannel();
  const queueName = "ordered-queued-message";
  await channel.assertQueue(queueName, { durable: true });

  for (let i = 0; i < 10; i++) {
    const message = Buffer.from(
      JSON.stringify({
        id: i,
        name: `message ${i}`,
      })
    );
    await channel.sendToQueue(queueName, message, {
      persistent: true,
    });
  }

  setTimeout(() => {
    connection.close();
  }, 1000);
};

consumerOrderedMessage().catch(() => {
  console.log("error");
});
