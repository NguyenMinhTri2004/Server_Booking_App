import { createClient } from "redis";
import { promisify } from "util";
// import config from '../configs/app.config';

const redisClient = createClient({
  url: `redis://localhost:6379`,
});

const pexpire = promisify(redisClient.pExpire).bind(redisClient);

const setxnAsync = promisify(redisClient.setNX).bind(redisClient);

export const acquireLock = async (accommodation, quantity) => {
  const key = `lock_v2023_${accommodation}`;
  const retryTimes = 10;
  const expireTime = 3000;

  for (let i = 0; i < retryTimes; i++) {
    const result = await setxnAsync(key, expireTime);
    console.log("result: ", result);
    if (result === 1) {
      // thao tac voi availableRoom
      return key;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }
};

export const releaseLock = async (keyLock) => {
  const delAsyncKey = promisify(redisClient.del).bind(redisClient);
  return await delAsyncKey(keyLock);
};

export default redisClient;
