import express from "express";
import {NextFunction, Request, Response} from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import admin from "firebase-admin";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import * as fireorm from "fireorm";
import cors from "cors";
import routes from "./routes";
require('dotenv').config();

if (!process.env.FIREBASE_CONFIG || !process.env.SERVICE_ACCOUNT) {
    throw new Error("Can't initialise without config!")
}
/**
 * Initialise firebase
 */
const fbAdmin = admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(Buffer.from(process.env.SERVICE_ACCOUNT, "base64").toString("ascii")) as admin.ServiceAccount),
        storageBucket: process.env.STORAGE_BUCKET
    });
const fbApp = initializeApp(JSON.parse(Buffer.from(process.env.FIREBASE_CONFIG!, "base64").toString("ascii")));
export {fbAdmin, fbApp}
fireorm.initialize(admin.firestore());
export const auth = getAuth(fbApp)

const app = express();
const PORT = process.env.PORT || 5000

const whitelist = [
    "http://localhost:3000",
    "http://localhost:3000/login",
    "chrome-extension://fgmcnecpacfefkoojccpplobhahjmhfd"
];

const corsOptions = {
    origin(origin: any, callback: any) {
        console.log({origin})
        if (!origin || whitelist.filter((url) => origin.includes(url)).length) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
};

app.use(morgan(morgan.compile("[:date[web]] :method :url :status (millis :response-time) :remote-addr :referrer")));
app.use(cors(corsOptions));
app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use('/', routes);
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || 'Internal Server Error'
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
