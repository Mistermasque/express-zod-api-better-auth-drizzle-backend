import { PrismaClient } from "@prisma/client"
import { logger } from "@utils/logger";

const prismaLogger = logger.child({ module: "prisma" });

const prismaInstance = new PrismaClient(
  {
    log: [
      { emit: "event", level: "query" },
      { emit: "event", level: "info" },
      { emit: "event", level: "warn" },
      { emit: "event", level: "error" },
    ]
  }
);

prismaInstance.$on('query', (e) => {
  prismaLogger.debug({ query: e.query, params: e.params, duration: e.duration }, 'Prisma query executed %dms', e.duration);
});

prismaInstance.$on('info', (e) => {
  prismaLogger.info(e.message);
});

prismaInstance.$on('warn', (e) => {
  prismaLogger.warn(e.message);
});

prismaInstance.$on('error', (e) => {
  prismaLogger.error(e.message);
});


const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || prismaInstance;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prismaInstance;
}
