export const API_PORT = parseInt(process.env.PORT || '', 10) || 3000;
export const DEFAULT_CACHE_TTL =
  parseInt(process.env.DEFAULT_CACHE_TTL || '', 10) || 3600;

export const REDIS_HOST = process.env.REDIS_HOST || 'redis';
export const REDIS_PORT = parseInt(process.env.REDIS_PORT || '', 10) || 6379;
export const WEATHER_API_KEY = process.env.WEATHER_API_KEY || '';
