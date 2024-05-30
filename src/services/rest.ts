/**
 * Makes an HTTP GET request to the specified URL and returns the JSON response.
 *
 * @param {string} url - The URL to which the request is sent.
 * @param {Object} [options={}] - Additional options for the fetch request.
 * @returns {Promise<Object>} - A promise that resolves to the JSON response.
 *
 * @throws {Error} - Throws an error if the response status is not OK (2xx).
 */
export async function get(url: string, options: Object = {}): Promise<any> {
  const response = await fetch(url, options);

  if (!response.ok) {
    const errorMessage = `Error: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }

  return response.json();
}
