import { NextFunction, Request, Response } from 'express';
import * as weatherService from './service';
import { ApiError } from '../../services/apiError';

/**
 * Controller function to get weather data by city name.
 *
 * @param {Request} req - The Express request object.
 * @param {Object} req.query - The query parameters in the request URL.
 * @param {string} req.query.city - The name of the city for which weather data is requested.
 * @param {Response} res - The Express response object.
 *
 * @returns {Promise<Response>} - The JSON response containing the weather data or an error message.
 */
export async function getByCity(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const city = req.query.city as string;
  if (!city) {
    return next(ApiError.unprocessableEntity('City is required'));
  }

  try {
    const weatherData = await weatherService.getByLocation(city);
    res.json(weatherData);
  } catch (error) {
    next(error);
  }
}
