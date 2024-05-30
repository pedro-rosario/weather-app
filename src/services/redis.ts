import Redis from 'ioredis';
import { REDIS_HOST, REDIS_PORT } from '../constants';

const redisClient = new Redis(REDIS_PORT, REDIS_HOST);

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

export default redisClient;
