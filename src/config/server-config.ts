import { ServerConfig as EzServerConfig } from 'express-zod-api';
import { appConfig } from './app-config';
import certificate from '@utils/certificate-manager';
import createHttpError from 'http-errors';
import cookieParser from 'cookie-parser';
import { readFileSync } from 'fs';
import ui from 'swagger-ui-express';
import yaml from "yaml";
import express from 'express';
import type { IRouter } from 'express';
import { logger } from '@utils/logger';
import { parse as parseQs } from 'qs';
import { getEnv, getEnvPort } from './get-env-vars';
import { ConfigError } from './config-error';
import 'dotenv/config';

function getHttpConfig(): EzServerConfig['http'] {
  const port = getEnvPort('BACKEND_HTTP_PORT', false);
  const isHttps = getEnvPort('BACKEND_HTTPS_PORT', false) === false;

  if (!port && !isHttps) {
    throw new ConfigError(`Both HTTP and HTTPS ports are not set`);
  }

  if (!port) {
    return undefined;
  }

  return {
    listen: port
  };
}

function getHttpsConfig(): EzServerConfig['https'] {
  const port = getEnvPort('BACKEND_HTTPS_PORT', false);
  const isHttp = getEnvPort('BACKEND_HTTP_PORT', false) === false;

  if (!port && !isHttp) {
    throw new ConfigError(`Both HTTP and HTTPS ports are not set`);
  }

  if (!port) {
    return undefined;
  }

  const certFile = getEnv('BACKEND_CERT_FILE', false);
  const keyFile = getEnv('BACKEND_CERT_KEY_FILE', false);

  if (!certFile && !keyFile) {
    const cert = certificate.generateCert({ validityDays: 99999999 });
    return {
      listen: port,
      options: {
        cert: cert.cert,
        key: cert.privateKey,
      },
    };

  }

  if (!certFile) {
    throw new ConfigError('BACKEND_CERT_KEY_FILE defined without a BACKEND_CERT_FILE');
  }

  if (!keyFile) {
    throw new ConfigError('BACKEND_CERT_FILE defined without a BACKEND_CERT_KEY_FILE');
  }

  try {
    return {
      listen: port,
      options: {
        cert: readFileSync(certFile, 'utf-8'),
        key: readFileSync(keyFile, 'utf-8'),
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new ConfigError(`Failed to read certificate files: ${message}`);
  }
}

function getBaseUrl(): string {
  const httpsPort = getEnvPort('BACKEND_HTTPS_PORT', false);
  const httpPort = getEnvPort('BACKEND_HTTP_PORT', false);
  const isHttps = httpsPort !== false;
  const hostnamePath = getEnv('BACKEND_HOSTNAME', 'localhost');
  const backendPath = hostnamePath.replace(/^[^/]+/, '').replace(/api\/*$/, '').replace(/\/+$/, '');

  const host = hostnamePath.replace(/\/[a-zA-Z0-9./_-]+$/, '');
  const protocol = (isHttps) ? 'https' : 'http';
  const port = (isHttps) ? httpsPort : httpPort;

  return `${protocol}://${host}:${port}${backendPath}`;
}

type App = IRouter &
{ set: (setting: string, val: unknown) => void } // Hack to accept app with set function (not existent in IRouter)


const beforeRouting = ({ app }: { app: IRouter }): void => {
  const thisApp = app as App;

  // Activate cookie extraction
  thisApp.use(cookieParser());
  // Ajout du middleware express.json
  // Indique que toutes les requêtes POST / PUT seront parsées comme un objet json
  // IL faut donc requêter l'application avec le Content-type: application/json
  // et le contenu sera mis dans le body
  thisApp.use(express.json());
  thisApp.use(express.urlencoded({ extended: true }));

  // Override default express query parser to have array in inputs
  thisApp.set('query parser', (queryString: string) => parseQs(queryString));

  // Add documentation route if is debug
  if (appConfig.debug) {
    const documentation = yaml.parse(
      readFileSync(appConfig.docFile, "utf-8"),
    );
    thisApp.use("/api/docs", ui.serve, ui.setup(documentation));
  }
}

export type ServerConfig = EzServerConfig & {
  baseUrl: string,
}

export const serverConfig: ServerConfig = {
  http: getHttpConfig(),
  https: getHttpsConfig(),
  upload: {
    limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB
    limitError: createHttpError(413, 'The file is too large'),
  },
  inputSources: {
    put: ["body", "params", "files"]
  },
  cors: ({ defaultHeaders, request }) => ({
    ...defaultHeaders,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": request.get('origin') ?? 'http://localhost:3000',
  }),
  beforeRouting,
  logger,
  baseUrl: getBaseUrl(),
}
