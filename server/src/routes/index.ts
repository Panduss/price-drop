import {Router} from "express";
import auth from "./auth";
import urls from "./urls";
import scrape from "./scrape";

const routes = Router();

routes.use("/login", auth);
routes.use("/links", urls);
routes.use("/scrape", scrape);

export default routes;
