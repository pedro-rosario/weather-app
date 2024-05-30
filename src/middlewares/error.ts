import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../services/apiError';

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof ApiError) {
    // If the error is an instance of APIError, use its status code and message
    return res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  }
  // For all other errors, use a generic 500 Internal Server Error status code
  res.status(500).json({
    status: 500,
    message: error.message,
  });
}
