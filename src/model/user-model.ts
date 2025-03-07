import {User} from "@prisma/client";

export type UserResponse = {
    id: string
    username: string
    email: string
    token?: string
    created_at: string
    updated_at: string
}

export type CreateUserRequest = {
    username: string
    email: string
    password: string
}

export type VerifyOTPRequest = {
    email: string
    otp: string
}

export type LoginUserRequest = {
    email: string
    password: string
}

export type SendEmailPasswordRequest = {
    email: string
}

export type ResetPasswordRequest = {
    token: string
    newPassword: string
}


export function toUserResponse(user: User): UserResponse{
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
    }
}