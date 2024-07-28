import { Response } from 'express';

export class ResponseFormatter {
    static success(res: Response, data: any = null, message: string, code: number) {
        return res.status(code).json({
            meta: {
                code,
                status: 'success',
                message,
            },
            data,
        });
    }

    static error(res: Response, data: any = null, message: string, code: number) {
        return res.status(code).json({
            meta: {
                code,
                status: 'error',
                message,
            },
            data,
        });
    }
}