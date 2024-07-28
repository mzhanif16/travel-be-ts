import {NextFunction, Request, Response} from "express";
import {
    CreateUserRequest,
    LoginUserRequest,
    ResetPasswordRequest,
    SendEmailPasswordRequest,
    VerifyOTPRequest
} from "../model/user-model";
import {UserService} from "../service/user-service";
import {ResponseFormatter} from "../helpers/response-formatter";
import {UserRequest} from "../type/user-request";

export class UserController {
    static async register(req: Request, res: Response,next: NextFunction){
        try {
            const request: CreateUserRequest = req.body as CreateUserRequest;
            const response = await UserService.register(request)
            ResponseFormatter.success(res,response,'Success sent otp to your email!',201)
        }catch (e){
            next(e)
        }
    }
    static async verifyOTP(req: Request, res: Response,next: NextFunction){
        try {
            const request: VerifyOTPRequest = req.body as VerifyOTPRequest;
            const response = await UserService.verifyOTP(request)
            ResponseFormatter.success(res,response,'Success Verify OTP!',200)
        }catch (e){
            next(e)
        }
    }
    static async login(req: Request, res: Response,next: NextFunction){
        try {
            const request: LoginUserRequest = req.body as LoginUserRequest;
            const response = await UserService.login(request)
            ResponseFormatter.success(res,response,'Successfully login',200)
        }catch (e){
            next(e)
        }
    }

    static async requestPasswordReset(req: Request, res: Response, next: NextFunction){
        try {
            const request: SendEmailPasswordRequest = req.body as SendEmailPasswordRequest;
            const response = await UserService.requestPasswordReset(request)
            ResponseFormatter.success(res,response,'Success Check Your Email Now',200)
        }catch (e){
            next(e)
        }
    }

    static async resetPassword(req: Request, res: Response, next: NextFunction){
        try {
            const request: ResetPasswordRequest = req.body as ResetPasswordRequest;
            const response = await UserService.resetPassword(request)
            ResponseFormatter.success(res,response,'Success Reset Password',200)
        }catch (e){
            next(e)
        }
    }
    static async get(req: UserRequest, res: Response,next: NextFunction){
        try {
            const response = await UserService.get(req.user!)
            ResponseFormatter.success(res,response,'Successfully Get User Data',200)
        }catch (e){
            next(e)
        }
    }
    static async logout(req: UserRequest, res: Response,next: NextFunction){
        try {
            const response = await UserService.logout(req.user!)
            ResponseFormatter.success(res,response,'Successfully Logout',200)
        }catch (e){
            next(e)
        }
    }
    static async update(req: UserRequest, res: Response,next: NextFunction){
        try {
            const request: CreateUserRequest = req.body as CreateUserRequest;
            const response = await UserService.update(req.user!,request)
            ResponseFormatter.success(res,response,'Successfully Update User',201)
        }catch (e){
            next(e)
        }
    }
}