import {NextFunction, Request, Response, Router} from 'express';
import {ScrapeApi} from '../index';
import {authorize} from "../middlewares/authorise";

const router = Router();

router.post("/", authorize, (req: Request, res: Response, next: NextFunction) => {
    ScrapeApi.scrape(req.body.userId)
        .then((result: any) => res.status(200).send(result))
        .catch(next);
})

export default router;