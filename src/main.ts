// import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "@auth/auth";
import routing from "@routes/index";
import { logger } from "@utils/logger";


const authHandler = toNodeHandler(auth);
// const app = express();
// const port = 3005;

// BetterAuth handler with additional debugging
// app.all('/api/auth/*splat', (req, res) => {
//   console.log(`🔐 BetterAuth handling: ${req.method} ${req.url}`);
//   console.log('🔐 Request body:', req.body);

//   authHandler(req, res).catch(err => {
//     console.error('BetterAuth handler error:', err);
//     res.status(500).json({ error: 'Internal auth error' });
//   });
// });

// // Mount express json middleware after Better Auth handler
// // or only apply it to routes that don't interact with Better Auth
// app.use(express.json());

// app.listen(port, () => {
// 	console.log(`Example app listening on port ${port}`);
// });



import { createConfig } from "express-zod-api";

const config = createConfig({
  logger,
  http: { listen: 8090 }, // port, UNIX socket or Net::ListenOptions
  cors: false, // decide whether to enable CORS
  beforeRouting: ({ app, getLogger }) => {
    const logger = getLogger();
    app.all('/api/auth/*splat', (req, res) => {
      logger.info(`🔐 BetterAuth handling: ${req.method} ${req.url}`);
      logger.info('🔐 Request body: ', req.body);

      authHandler(req, res).catch(err => {
        logger.error('BetterAuth handler error:', err);
        res.status(500).json({ error: 'Internal auth error' });
      });
    })
  },
});

import { createServer } from "express-zod-api";


createServer(config, routing);
