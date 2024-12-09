import { createClient } from "redis";
import { RedisErrorResponse } from "../core/error.response";

let client = {
  instanceConnect: null,
};

let statusConnectRedis = {
    CONNECT: "connected",
    END: "end",
    RECONNECT: "reconnecting",
    ERROR: "error",
  },
  connectionTimeout;

const REDIS_CONNECT_TIMEOUT = 10000;

const REDIS_CONNECT_MESSAGE = {
  code: -99,
  message: {
    vi: "Redis bi loi roi !!!",
    en: "Service connection error",
  },
};

const handleTimeoutError = () => {
  connectionTimeout = setTimeout(() => {
    throw new RedisErrorResponse({
      message: REDIS_CONNECT_MESSAGE.message,
      statusCode: REDIS_CONNECT_MESSAGE.code,
    });
  }, REDIS_CONNECT_TIMEOUT);
};

const handleEventConnection = ({ connectionRedis }) => {
  connectionRedis.on(statusConnectRedis.CONNECT, () => {
    console.log("connecttionRedis - Connection status connected");
    clearTimeout(connectionTimeout);
  });

  connectionRedis.on(statusConnectRedis.END, () => {
    console.log("connecttionRedis - Connection status disconnected");
    handleTimeoutError();
  });

  connectionRedis.on(statusConnectRedis.RECONNECT, () => {
    console.log("connecttionRedis - Connection status reconnecting");
    clearTimeout(connectionTimeout);
  });

  connectionRedis.on(statusConnectRedis.ERROR, (err) => {
    console.log(`connecttionRedis - Connection status error: ${err}`);
    handleTimeoutError();
  });
};

const initRedis = () => {
  const instanceRedis = createClient();
  client.instanceConnect = instanceRedis;
  handleEventConnection({
    connectionRedis: instanceRedis,
  });
};
