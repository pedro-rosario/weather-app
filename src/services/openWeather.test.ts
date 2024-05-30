import { getCityWeather } from './openWeather';
import * as rest from './rest';

jest.mock('./rest');

describe('openWeather', () => {
  describe('getCityWeather', () => {
    const mockCityResponse = [
      {
        name: 'La Vega',
        local_names: {
          es: 'La Vega',
          hu: 'La Vega',
          ru: 'Ла-Вега',
        },
        lat: 19.2237411,
        lon: -70.5284071,
        country: 'DO',
        state: 'La Vega',
      },
    ];

    const mockWeatherResponse = {
      coord: {
        lon: -70.5284,
        lat: 19.2237,
      },
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04d',
        },
      ],
      base: 'stations',
      main: {
        temp: 31.45,
        feels_like: 38.45,
        temp_min: 31.45,
        temp_max: 31.45,
        pressure: 1013,
        humidity: 78,
        sea_level: 1013,
        grnd_level: 978,
      },
      visibility: 10000,
      wind: {
        speed: 3.02,
        deg: 96,
        gust: 6.46,
      },
      clouds: {
        all: 100,
      },
      dt: 1717101219,
      sys: {
        type: 1,
        id: 7076,
        country: 'DO',
        sunrise: 1717063434,
        sunset: 1717110954,
      },
      timezone: -14400,
      id: 3509382,
      name: 'Concepción de la Vega',
      cod: 200,
    };

    beforeEach(() => {
      (rest.get as jest.Mock).mockImplementation((url: string) => {
        if (url.includes('direct')) {
          return Promise.resolve(mockCityResponse);
        }
        if (url.includes('weather')) {
          return Promise.resolve(mockWeatherResponse);
        }
        return Promise.reject(new Error('Invalid URL'));
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should fetch weather data for a given city', async () => {
      const cityName = 'Concepción de la Vega';
      const weatherData = await getCityWeather(cityName);

      expect(weatherData).toEqual({
        weather: {
          name: 'Clouds',
          description: 'overcast clouds',
          temperature: 31.45,
          feelsLike: 38.45,
          humidity: 78,
        },
        time: {
          utc: 1717101219000,
          utcString: 'Thu, 30 May 2024 20:33:39 GMT',
          local: 1717086819000,
          localString: 'Thu, 30 May 2024 16:33:39 GMT',
        },
        city: 'Concepción de la Vega',
      });
    });

    it('should throw an error if the city cannot be found', async () => {
      (rest.get as jest.Mock).mockImplementationOnce(() => Promise.resolve([]));

      await expect(getCityWeather('InvalidCity')).rejects.toThrow(
        'Failed to find city',
      );
    });

    it('should throw an error if there is an issue fetching weather data', async () => {
      (rest.get as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(mockCityResponse),
      );
      (rest.get as jest.Mock).mockImplementationOnce(() =>
        Promise.reject(new Error('Weather API error')),
      );

      await expect(getCityWeather('New York')).rejects.toThrow(
        'Weather API error',
      );
    });
  });
});
