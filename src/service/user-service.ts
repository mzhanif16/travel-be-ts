import {
    CreateUserRequest,
    LoginUserRequest, ResetPasswordRequest,
    SendEmailPasswordRequest,
    toUserResponse,
    UserResponse, VerifyOTPRequest
} from "../model/user-model";
import {Validation} from "../validation/validation";
import {UserValidation} from "../validation/user-validation";
import {prismaClient} from "../application/database";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";
import {ResponseError} from "../error/response-error";
import jwt from 'jsonwebtoken';
import {User} from "@prisma/client";
import nodemailer from 'nodemailer';

export class UserService {
    static async register(request: CreateUserRequest): Promise<void> {
        const registerRequest = Validation.validate(UserValidation.REGISTER, request)
        const totalUserWithSameEmail = await prismaClient.user.count({
            where: {
                email: registerRequest.email
            }
        })
        if (totalUserWithSameEmail != 0) {
            throw new ResponseError(400, "Email already exist")
        }
        const id = uuid()
        registerRequest.password = await bcrypt.hash(registerRequest.password, 10)
        const record = {
            ...registerRequest,
            ...{id: id}
        }
        const user = await prismaClient.user.create({data: record})
        const createdUser = await prismaClient.user.findFirst({
            where : {
                email: user.email
            }
        })
        if (!createdUser) {
            throw new ResponseError(404, "User not found")
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        await prismaClient.oTP.create({
            data: {
                id: uuid(),
                user_id: createdUser.id,
                otp: otp
            }
        });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        console.log("transporter", transporter);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'OTP Travel',
            text: `Here is your OTP :${otp} `
        };

        await transporter.sendMail(mailOptions);
    }

    static async verifyOTP(req: VerifyOTPRequest): Promise<UserResponse>{
        const verifyOTPRequest = Validation.validate(UserValidation.VERIFY_OTP,req)
        const otpRecord = await prismaClient.oTP.findFirst({
            where : {
                otp: verifyOTPRequest.otp,
                user:{
                    email: verifyOTPRequest.email
                }
            },
            include: {
                user : true
            }
        })
        if (!otpRecord || !otpRecord.user) {
            throw new ResponseError(400, "OTP is invalid");
        }
        const user = otpRecord.user;

        const payload = {
            id: user.id,
            email: user.email
        };

        const secretKey = '155155'; // Use a more secure key in production
        const options = {
            expiresIn: '1d', // Token expiration time
        };
        const token = jwt.sign(payload, secretKey, options);

        const updatedUser = await prismaClient.user.update({
            where: {
                id: user.id,
            },
            data: {
                token: token,
                is_verified: true
            }
        });

        const response = toUserResponse(updatedUser);
        response.token = updatedUser.token!;
        return response;
    }

    static async login(request: LoginUserRequest): Promise<UserResponse> {
        const loginUserRequest = Validation.validate(UserValidation.LOGIN, request)
        let user = await prismaClient.user.findUnique({
            where: {
                email: loginUserRequest.email
            }
        })

        if (!user) {
            throw new ResponseError(404, "User does not exist")
        }

        const isPasswordValid = await bcrypt.compare(loginUserRequest.password, user.password)
        if (!isPasswordValid) {
            throw new ResponseError(404, "Email or Password is wrong!")
        }
        const payload = {
            id: user.id,
            email: user.email
        };

        const secretKey = '155155';
        const options = {
            expiresIn: '1d',
        };
        const token = jwt.sign(payload, secretKey, options)

        user = await prismaClient.user.update({
            where: {
                email: loginUserRequest.email,
            },
            data: {
                token: token
            }
        })
        const response = toUserResponse(user)
        response.token = user.token!
        return response
    }
    static async update(user:User,request:CreateUserRequest): Promise<UserResponse> {
        const updateRequest = Validation.validate(UserValidation.REGISTER, request)

        if (updateRequest.email){
            user.email = updateRequest.email
        }
        if (updateRequest.username){
            user.username = updateRequest.username
        }
        if (updateRequest.password){
            user.password = await bcrypt.hash(updateRequest.password, 10)
        }
        const result = await prismaClient.user.update({
            where: {
                id: user.id,
            },
            data: user
        })
        return toUserResponse(result)
    }

    static async requestPasswordReset(req:SendEmailPasswordRequest): Promise<void> {
        const resetPasswordRequest = Validation.validate(UserValidation.RESET_PASSWORD, req)
        const user = await prismaClient.user.findUnique({
            where: { email: resetPasswordRequest.email }
        });

        if (!user) {
            throw new ResponseError(404, "User does not exist");
        }

        const resetToken = uuid();
        const resetTokenExpiration = new Date(Date.now() + 3600000);

        await prismaClient.user.update({
            where: { email: resetPasswordRequest.email },
            data: {
                resetToken,
                resetTokenExpiration
            }
        });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        console.log("transporter", transporter);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset',
            text: `You requested a password reset. Here is your reset token to reset your password: ${resetToken}`
        };

        await transporter.sendMail(mailOptions);
    }
    static async resetPassword(req:ResetPasswordRequest): Promise<void>{
    const resetPasswordRequest = Validation.validate(UserValidation.PASS_RESET, req)
        const user = await prismaClient.user.findFirst({
            where: {
                resetToken: resetPasswordRequest.token,
                resetTokenExpiration: {
                    gt: new Date()
                }
            }
        });

        if (!user) {
            throw new ResponseError(400, "Invalid or expired reset token");
        }

        const hashedPassword = await bcrypt.hash(resetPasswordRequest.newPassword, 10);

        await prismaClient.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiration: null
            }
        });
    }

    static async get(user: User): Promise<UserResponse> {
        return toUserResponse(user)
    }

    static async logout(user: User): Promise<UserResponse> {
        const response = await prismaClient.user.update({
            where : {
                id: user.id
            },
            data: {
                token: null
            }
        })
        return toUserResponse(response)
    }
}