/**
 * Utility fonctions for env variables
 */

import { ConfigError } from "./config-error";

/**
 * Get port from the environment variables
 * @param envVarName variable name
 * @param defaultValue default value to return if the variable is not set
 * @returns port number
 * @throws {ConfigError} if the variable is not set and defaultvalue not set
 */
export function getEnvPort(envVarName: string): number;
export function getEnvPort<DefaultValue>(envVarName: string, defaultValue: DefaultValue): number | DefaultValue;
export function getEnvPort<DefaultValue>(envVarName: string, defaultValue?: DefaultValue): number | DefaultValue {
  // export function getEnvPort(envVarName: string, defaultValue?: number): number | null {
  const port = process.env[envVarName] as string;
  if (!port) {
    if (typeof defaultValue === 'undefined') {
      throw new ConfigError(`Environment variable '${envVarName}' is not set`);
    }
    return defaultValue;
  }

  const parsedPort = parseInt(port, 10);

  if (isNaN(parsedPort) || parsedPort <= 0 || parsedPort > 65535) {
    throw new ConfigError(`Environment variable '${envVarName}' is not a valid port number`);
  }

  return parsedPort;
}

/**
 * Get a variable from the environment and URI encode it
 * @param envVarName variable name
 * @param mandatory whether the variable is mandatory
 * @returns URL encoded variable or default value URI encoded if string
 * @throws {ConfigError} if the variable is not set and mandatory is true
 */
export function getEnvUrlEncodedVar(envVarName: string): string;
export function getEnvUrlEncodedVar<DefaultValue>(envVarName: string, defaultValue: string | DefaultValue): string | DefaultValue;
export function getEnvUrlEncodedVar<DefaultValue>(envVarName: string, defaultValue?: string | DefaultValue): string | DefaultValue {
  const value = getEnv(envVarName, defaultValue);
  return typeof value === 'string' ? encodeURIComponent(value) : value as DefaultValue;
}

export function getEnv(envVarName: string): string;
export function getEnv<DefaultValue>(envVarName: string, defaultValue: string | DefaultValue): string | DefaultValue;
export function getEnv<DefaultValue>(envVarName: string, defaultValue?: string | DefaultValue): string | DefaultValue {
  const value = process.env[envVarName] as string;
  if (!value) {
    if (typeof defaultValue === 'undefined') {
      throw new ConfigError(`Environment variable '${envVarName}' is not set`);
    }
    return defaultValue;
  }

  return value;
}
