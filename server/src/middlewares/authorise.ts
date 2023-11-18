import { Request, Response, NextFunction } from 'express';
import {fbAdmin} from "../server";

export async function authorize(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).send({ message: 'No token provided!' });
    }

    fbAdmin.auth().verifyIdToken(token, true).then((claims) => {
        req.body ? req.body.claims = claims : req.body = { claims: claims };
        return next();
    }).catch((error) => {
        return res.status(401).json({ error: error.message });
    })
}
