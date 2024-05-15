import { createClient } from 'redis';

// import config from '../configs/app.config';

const redisClient = createClient({
  url: `redis://localhost:6379`,
});

export default redisClient;
