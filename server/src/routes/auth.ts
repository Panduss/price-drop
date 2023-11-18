import {NextFunction, Request, Response, Router} from 'express';
import {AuthApi} from '../index';
import {AuthUser} from "../models/auth";

const router = Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {
    AuthApi.login(req.body.email, req.body.password)
        .then((result: AuthUser) => res.status(200).send(result))
        .catch(next);
})

export default router;