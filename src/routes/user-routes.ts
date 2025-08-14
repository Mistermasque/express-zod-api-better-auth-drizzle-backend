import { userGetCurrentEndpoint } from "@endpoints/user/user-get-current-endpoint";
import { Routing } from "express-zod-api";


const routes: Routing = {
  'current': userGetCurrentEndpoint
};

export default routes;
