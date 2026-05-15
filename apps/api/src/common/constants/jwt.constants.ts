import { env } from 'process';

export const jwtConstans = {
  secret: env.SECRETJWT,
};
export const MaxAge_License = 30 * 24 * 60 * 60 * 1000;
