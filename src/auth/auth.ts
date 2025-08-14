import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@db/drizzle';
import { logger } from '@utils/logger';
import { usersTable } from '@db/tables/users-table';
import { accountsTable } from '@db/tables/accounts-table';
import { verificationsTable } from '@db/tables/verifications-table';
import { sessionsTable } from '@db/tables/sessions-table';

// Configure the logger for BetterAuth
const authLogger = logger.child({ module: "better-auth" });

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: usersTable,
      account: accountsTable,
      verification: verificationsTable,
      session: sessionsTable
    }
  }),
  logger: {
    disabled: false,
    level: "debug", // We log everything by default because it will be the logger which reduce log level
    log: (level, message, ...args) => {
      switch (level) {
        case "error":
          authLogger.error(message, ...args);
          break;
        case "warn":
          authLogger.warn(message, ...args);
          break;
        case "info":
          authLogger.info(message, ...args);
          break;
        case "debug":
        default:
          authLogger.debug(message, ...args);
          break;
      }
    }
  }
});
