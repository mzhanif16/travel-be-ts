import {Request,Response,NextFunction} from "express";
import {ZodError} from "zod";
import {ResponseError} from "../error/response-error";
import {ResponseFormatter} from "../helpers/response-formatter";

export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ZodError){
        ResponseFormatter.error(res,null,error.message,400)
    } else if(error instanceof ResponseError){
        ResponseFormatter.error(res,null,error.message,error.statusCode)
    } else {
        ResponseFormatter.error(res,null,error.message,500)
    }
}