import {NextFunction, Request, Response, Router} from 'express';
import {UrlsApi} from '../index';
import {authorize} from "../middlewares/authorise";

const router = Router();

router.post("/", authorize, (req: Request, res: Response, next: NextFunction) => {
    UrlsApi.getUserDoc(req.body.userId)
        .then((result: any) => res.status(200).send(result))
        .catch(next);
})

router.post("/update", authorize, (req: Request, res: Response, next: NextFunction) => {
    UrlsApi.submitLink(req.body.userId, req.body.url, req.body.name, req.body.reference, req.body.cookie, req.body.priceOriginal)
        .then((result: any) => res.status(200).send(result))
        .catch(next);
})

router.post("/delete", authorize, (req: Request, res: Response, next: NextFunction) => {
    UrlsApi.deleteUserLink(req.body.userId, req.body.name)
        .then((result: any) => res.status(200).send(result))
        .catch(next);
})

export default router;