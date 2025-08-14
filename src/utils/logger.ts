import { createLogger, format, type Logger as WinstonLogger } from "winston";
import { Console } from "winston/lib/winston/transports";

export type Logger = WinstonLogger;

export const logger = createLogger({
  level: 'debug',
  transports: [
    new Console({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.colorize(),
        format.printf(({ timestamp, level, message, ...meta }) => {
          const { module, ...restMeta } = meta;

          if (module) {
            return `${timestamp} [${module}] ${level}: ${message}  ${Object.keys(restMeta).length ? JSON.stringify(restMeta) : ''}`;
          }

          return `${timestamp} ${level}: ${message} ${Object.keys(restMeta).length ? JSON.stringify(restMeta) : ''}`;
        })
      )
    })
  ]
});
