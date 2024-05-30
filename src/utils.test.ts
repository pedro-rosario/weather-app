import { createUrlObject } from './utils';

describe('utils', () => {
  describe('createUrlObject', () => {
    it('should construct a URL with no query parameters', () => {
      const baseUrl = 'https://api.example.com/data';
      const result = createUrlObject(baseUrl);

      expect(result).toBe(baseUrl);
    });

    it('should construct a URL with one query parameter', () => {
      const baseUrl = 'https://api.example.com/data';
      const queryParams = { key1: 'value1' };
      const result = createUrlObject(baseUrl, queryParams);

      expect(result).toBe(`${baseUrl}?key1=value1`);
    });

    it('should construct a URL with multiple query parameters', () => {
      const baseUrl = 'https://api.example.com/data';
      const queryParams = { key1: 'value1', key2: 'value2' };
      const result = createUrlObject(baseUrl, queryParams);

      expect(result).toBe(`${baseUrl}?key1=value1&key2=value2`);
    });

    it('should handle an empty base URL', () => {
      const baseUrl = '';
      const queryParams = { key1: 'value1' };
      expect(() => createUrlObject(baseUrl, queryParams)).toThrow();
    });

    it('should handle a base URL with existing query parameters', () => {
      const baseUrl = 'https://api.example.com/data?existingKey=existingValue';
      const queryParams = { key1: 'value1' };
      const result = createUrlObject(baseUrl, queryParams);

      expect(result).toBe(`${baseUrl}&key1=value1`);
    });
  });
});
