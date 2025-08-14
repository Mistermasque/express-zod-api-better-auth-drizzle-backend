import 'dotenv/config';
import path from 'path';

const debug = process.env.DEBUG === 'true' ? true : false;
const docFile = path.join(path.dirname(__filename), '..', 'doc', 'api-documentation.yaml');
const clientFile = path.join(path.dirname(__filename), '..', 'types', 'api.d.ts');


export const appConfig = {
  debug,
  docFile,
  clientFile
};
