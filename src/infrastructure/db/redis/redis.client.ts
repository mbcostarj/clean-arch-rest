import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

(async () => {
  if (!redisClient.isOpen){
    await redisClient.connect();
  }
})();

export { redisClient };