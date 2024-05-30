import redisClient from './redis';
import { DEFAULT_CACHE_TTL } from '../constants';

/**
 * Retrieves the value associated with the given key from the Redis cache.
 *
 * @param {string} key - The key whose associated value is to be returned.
 * @returns {Promise<Object | null>} - A promise that resolves to the value associated
 * with the specified key, or `null` if the key does not exist.
 */
export async function get(key: string): Promise<Object | null> {
  const value = await redisClient.get(key);

  if (!value) return null;

  try {
    return await JSON.parse(value);
  } catch (error) {
    return value;
  }
}

/**
 * Stores a value in the Redis cache with the specified key and TTL (time-to-live).
 *
 * @param {string} key - The key under which the value should be stored.
 * @param {*} value - The value to be stored. If the value is not a string, it will be stringified.
 * @param {number} [ttl=DEFAULT_CACHE_TTL] - The time-to-live for the cache entry, in seconds.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the stored key and value.
 */
export async function set(
  key: string,
  value: any,
  ttl: number = DEFAULT_CACHE_TTL,
): Promise<{ key: string }> {
  const normalizedValue =
    typeof value !== 'string' ? JSON.stringify(value) : value;

  await redisClient.setex(key, ttl, normalizedValue);

  return { key: value };
}
