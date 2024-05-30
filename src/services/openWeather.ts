import * as rest from './rest';
import { createUrlObject } from '../utils';
import { WEATHER_API_KEY } from '../constants';
import { ApiError } from '../services/apiError';
/**
 * Constructs the URL to fetch location data by city name.
 *
 * @param {string} cityName - The name of the city to get the location data for.
 * @returns {URL} - The constructed URL object for the geolocation API request.
 */
function getUrlOfLocationByName(cityName: string): string {
  return createUrlObject('http://api.openweathermap.org/geo/1.0/direct', {
    q: cityName,
    limit: '1',
    appid: WEATHER_API_KEY,
  });
}

/**
 * Constructs the URL to fetch weather data by latitude and longitude.
 *
 * @param {number} lat - The latitude of the location.
 * @param {number} lon - The longitude of the location.
 * @returns {URL} - The constructed URL object for the weather API request.
 */
function getWeatherApiUrl(lat: number, lon: number): string {
  return createUrlObject('https://api.openweathermap.org/data/2.5/weather', {
    lon: `${lon}`,
    lat: `${lat}`,
    appid: WEATHER_API_KEY,
    units: 'metric',
  });
}

interface WeatherResponse {
  weather: {
    name: string;
    description: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
  };
  time: {
    utc: number;
    utcString: string;
    local: number;
    localString: string;
  };
  city: string;
}

/**
 * Fetches weather data for a given city.
 *
 * @param {string} cityName - The name of the city to get the weather data for.
 * @returns {Promise<WeatherResponse>} - A promise that resolves to an object containing the weather data.
 *
 * @throws {ApiError} - Throws an error if the city cannot be found or if there is an issue fetching the weather data.
 */
export async function getCityWeather(
  cityName: string,
): Promise<WeatherResponse> {
  const cityResponse = await rest.get(getUrlOfLocationByName(cityName));

  if (!cityResponse.length) throw ApiError.notFound('Failed to find city');

  const [city] = cityResponse;
  const { lat, lon } = city;
  const weatherApiUrl = getWeatherApiUrl(lat, lon);
  const { weather, main, dt, timezone, name } = await rest.get(weatherApiUrl);

  return {
    weather: {
      name: weather[0].main,
      description: weather[0].description,
      temperature: main.temp,
      feelsLike: main.feels_like,
      humidity: main.humidity,
    },
    time: {
      utc: dt * 1000,
      utcString: new Date(dt * 1000).toUTCString(),
      local: (dt + timezone) * 1000,
      localString: new Date((dt + timezone) * 1000).toUTCString(),
    },
    city: name,
  };
}
