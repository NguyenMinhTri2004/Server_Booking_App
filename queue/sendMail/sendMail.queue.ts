import kue from "kue";

const sendMailQueue = kue.createQueue({
  // prefix: 'breaths-queue',
  redis: {
    host: "localhost",
    port: 6379,
  },
});

export default sendMailQueue;
