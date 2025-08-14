import 'dotenv/config';
import { ConfigError } from './config-error';
import { getEnvPort, getEnvUrlEncodedVar } from './get-env-vars';

/**
 * Extract database url from environnement variable
 * Uses env variables :
 * - DB_URL
 * - DB_USER if DB_URL not set
 * - DB_PASSWORD if DB_URL not set
 * - DB_NAME if DB_URL not set
 * - DB_PORT if DB_URL not set
 * - DB_HOST if DB_URL not set
 * @returns
 */
function getUrl(): string {

  if (process.env.DB_URL) {
    return process.env.DB_URL;
  }

  const {
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT,
    DB_HOST
  } = process.env;

  if (!DB_USER || !DB_PASSWORD || !DB_NAME || !DB_PORT || !DB_HOST) {

    throw new ConfigError('Missing database configuration');
  }

  const dbUser = getEnvUrlEncodedVar('DB_USER');
  const dbPassword = getEnvUrlEncodedVar('DB_PASSWORD', null) ? ':' + getEnvUrlEncodedVar('DB_PASSWORD') : '';
  const dbName = getEnvUrlEncodedVar('DB_NAME');
  const dbPort = getEnvPort('DB_PORT') ? ':' + getEnvPort('DB_PORT', 5432) : '';
  const dbHost = getEnvUrlEncodedVar('DB_HOST');

  return `postgres://${dbUser}${dbPassword}@${dbHost}${dbPort}/${dbName}`;
}



export const dbConfig = {
  url: getUrl()
}
