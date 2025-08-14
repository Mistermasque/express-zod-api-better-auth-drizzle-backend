import { Routing } from "express-zod-api";
import userRoutes from './user-routes';



const routes: Routing = {
  api: {
    user: userRoutes
  }
};


export default routes;
