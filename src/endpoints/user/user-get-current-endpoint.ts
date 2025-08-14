import { z } from 'zod';
// import createHttpError from 'http-errors';
import { defaultEndpointsFactory } from 'express-zod-api';

export const userGetCurrentEndpoint = defaultEndpointsFactory
.build({
  method: 'get',
  tag: 'users',
  shortDescription: 'Retrieve current user',
  description: 'Retrieve a user according to id input or current user in cookie if no id provided',
  input: z.object({}),
  output: z.object({}),
  handler: async () => {
    // const id = options.user.id;

    // logger.info(`Current user requested id = '${id}'`);

    // const user = await getUser({ id });
    // logger.debug(`User = ${JSON.stringify(user)}`);
    // if (!user) {
    //   logger.error(`User with id '${id}' not found`);
    //   throw createHttpError(404, 'User not found');
    // }
    return {};
  },
});
