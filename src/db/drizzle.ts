import { dbConfig } from '@config/db-config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Logger } from 'drizzle-orm/logger';
import { logger } from '@utils/logger';

const drizzleLogger = logger.child({ module: "drizzle" });

class MyLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    const message = `Query ${query}\nParameters: ${JSON.stringify(params)}`;
    drizzleLogger.debug(message);
  }
}

export const db = drizzle(dbConfig.url, {
  logger: new MyLogger(),
});
