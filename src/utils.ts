/**
 * Constructs a URL with the specified base URL and query parameters.
 *
 * @param {string} baseUrl - The base URL to which the query parameters will be appended.
 * @param {Object} [queryParams={}] - An object containing the query parameters as key-value pairs.
 * @returns {URL} - The constructed URL object with the appended query parameters.
 */
export function createUrlObject(
  baseUrl: string,
  queryParams: Record<string, string> = {},
): string {
  const url = new URL(baseUrl);

  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  return url.href;
}
