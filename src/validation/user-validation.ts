import {z,ZodType} from "zod";

export class UserValidation {
    static readonly REGISTER : ZodType = z.object({
        username: z.string().min(1).max(100),
        email: z.string().email().min(1).max(100),
        password: z.string().min(1).max(100),
    })
    static readonly LOGIN : ZodType = z.object({
        email: z.string().email().min(1).max(100),
        password: z.string().min(1).max(100),
    })
    static readonly RESET_PASSWORD : ZodType = z.object({
        email: z.string().email().min(1).max(100)
    })
    static readonly PASS_RESET : ZodType = z.object({
        token: z.string().min(1).max(100),
        newPassword: z.string().min(1).max(100)
    })
    static readonly VERIFY_OTP : ZodType = z.object({
        email: z.string().email().min(1).max(100),
        otp: z.string().min(1).max(4)
    })
}