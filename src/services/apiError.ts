export class ApiError extends Error {
  public statusCode: number;
  public errors: any[];

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  static notFound(message: string): ApiError {
    return new ApiError(message, 404);
  }

  static unprocessableEntity(message: string): ApiError {
    return new ApiError(message, 422);
  }
}
