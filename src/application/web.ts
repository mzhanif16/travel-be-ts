import express from "express";
import {router} from "../route/public-api";
import {errorMiddleware} from "../middleware/error-middleware";
import {authApiRouter} from "../route/auth-api";
import path from "path";
import {loggerMiddleware} from "../middleware/logger-middleware";
import {setupSwagger} from "../swagger";

export const web = express()
web.use(loggerMiddleware);
web.use('/uploads', express.static(path.join(__dirname, 'uploads')));
setupSwagger(web);
web.use(express.json())
web.use(router)
web.use(authApiRouter)
web.use(errorMiddleware)