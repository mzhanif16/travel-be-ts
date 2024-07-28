

import { Request, Response, NextFunction } from 'express';

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log(`route API : ${req.method} ${req.originalUrl}`);
    next();
}
