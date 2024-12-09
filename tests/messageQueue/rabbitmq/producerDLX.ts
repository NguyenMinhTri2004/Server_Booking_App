import amqp from "amqplib";
import { Buffer } from "buffer";

const message = "new product";

const runProducer = async () => {
  try {
    const connection = await amqp.connect("amqp://guest:12345@localhost");
    const channel = await connection.createChannel();
    const notificationExchange = "notificationEx"; // NotificationEX direct
    const notiQueue = "notificationQueueProcess"; // assertQueue
    const notificationExchangeDLX = "notificationExDLX"; // notificationEx direct
    const notificationRoutingKeyDLX = "notificationRoutingKeyDLX"; // asser

    // 1.create Exchange
    await channel.assertExchange(notificationExchange, "direct", {
      durable: true,
    });

    // 2.create Queue
    const queueResult = await channel.assertQueue(notiQueue, {
      exclusive: false,
      deadLetterExchange: notificationExchangeDLX,
      deadLetterRoutingKey: notificationRoutingKeyDLX,
    });

    // 3.Bind Queue
    await channel.bindQueue(queueResult.queue, notificationExchange);

    // 4.Send message
    const msg = "a new product";
    console.log(msg);
    await channel.sendToQueue(queueResult.queue, Buffer.from(msg), {
      expiration: "10000",
    });

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (err) {
    console.log(err);
  }
};
