import { get, set } from './cache';
import redisClient from './redis';
import { DEFAULT_CACHE_TTL } from '../constants';

jest.mock('./redis', () => ({
  get: jest.fn(),
  setex: jest.fn(),
}));

describe('cache', () => {
  describe('get', () => {
    it('should return null if the key does not exist', async () => {
      (redisClient.get as jest.Mock).mockResolvedValueOnce(null);

      const key = 'nonexistent_key';
      const result = await get(key);

      expect(result).toBeNull();
      expect(redisClient.get).toHaveBeenCalledWith(key);
    });

    it('should return parsed JSON if the value is a JSON string', async () => {
      const mockValue = { data: 'test' };
      (redisClient.get as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(mockValue),
      );

      const key = 'json_key';
      const result = await get(key);

      expect(result).toEqual(mockValue);
      expect(redisClient.get).toHaveBeenCalledWith(key);
    });

    it('should return the value as is if it is not a JSON string', async () => {
      const mockValue = 'plain_string';
      (redisClient.get as jest.Mock).mockResolvedValueOnce(mockValue);

      const key = 'plain_string_key';
      const result = await get(key);

      expect(result).toBe(mockValue);
      expect(redisClient.get).toHaveBeenCalledWith(key);
    });

    it('should return the value as is if JSON parsing fails', async () => {
      const invalidJson = 'invalid_json';
      (redisClient.get as jest.Mock).mockResolvedValueOnce(invalidJson);

      const key = 'invalid_json_key';
      const result = await get(key);

      expect(result).toBe(invalidJson);
      expect(redisClient.get).toHaveBeenCalledWith(key);
    });
  });

  describe('set', () => {
    it('should store the value in Redis with the specified key and default TTL', async () => {
      const key = 'test_key';
      const value = { data: 'test' };

      await set(key, value);

      expect(redisClient.setex).toHaveBeenCalledWith(
        key,
        DEFAULT_CACHE_TTL,
        JSON.stringify(value),
      );
    });

    it('should store the value in Redis with the specified key and TTL', async () => {
      const key = 'test_key';
      const value = { data: 'test' };
      const ttl = 600;

      await set(key, value, ttl);

      expect(redisClient.setex).toHaveBeenCalledWith(
        key,
        ttl,
        JSON.stringify(value),
      );
    });

    it('should store string values in Redis without modification', async () => {
      const key = 'string_key';
      const value = 'plain_string';

      await set(key, value);

      expect(redisClient.setex).toHaveBeenCalledWith(
        key,
        DEFAULT_CACHE_TTL,
        value,
      );
    });

    it('should return an object containing the stored key', async () => {
      const key = 'return_key';
      const value = 'some_value';

      const result = await set(key, value);

      expect(result).toEqual({ key: value });
    });
  });
});
