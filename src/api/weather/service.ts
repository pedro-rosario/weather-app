import * as cache from '../../services/cache';
import * as openWeather from '../../services/openWeather';

/**
 * Fetches weather data for a given city.
 *
 * @param {string} cityName - The name of the city to get the weather data for.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the weather data.
 *
 * @throws {Error} - Throws an error if there is an issue fetching the weather data.
 */
export async function getByLocation(cityName: string): Promise<Object> {
  const cacheWeatherKey = `weather:${cityName}`;
  const cachedWeather = await cache.get(cacheWeatherKey);

  if (cachedWeather) return cachedWeather;
  const cityWeather = await openWeather.getCityWeather(cityName);

  await cache.set(cacheWeatherKey, cityWeather);

  return cityWeather;
}
