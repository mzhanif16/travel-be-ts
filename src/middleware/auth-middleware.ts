import {UserRequest} from "../type/user-request";
import {Response,NextFunction} from "express";
import jwt from "jsonwebtoken";
import {ResponseFormatter} from "../helpers/response-formatter";
import {prismaClient} from "../application/database";

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(`token : ${token}`)
    if (token) {
        jwt.verify(token, '155155', async (err, decoded) => {
            if (err){
                return ResponseFormatter.error(res,null,"Invalid Token",401)
            }
            try {
                const user = await prismaClient.user.findFirst({
                    where : {
                        token: token
                    }
                })
                if (user){
                    req.user = user
                    next()
                    return
                }else {
                    ResponseFormatter.error(res,null,"User Not Found",401)
                }
            }catch (e){
                ResponseFormatter.error(res,null,"Internal Server Error",500)
            }
        })
    }else {
        ResponseFormatter.error(res,null,"No Token Provided",401)
    }
}