import {z,ZodType} from "zod";

export class WisataValidation {
    static readonly CREATE : ZodType = z.object({
        title: z.string().min(1).max(100),
        description: z.string().min(1).max(100).optional(),
        rate: z.number().min(1).max(100).optional(),
        img_wisata: z.string().min(1).max(100).optional(),
        price: z.string().min(1).max(100).optional(),
    })
    static readonly UPDATE : ZodType = z.object({
        id: z.string(),
    })
    static readonly UPDATE_RATE : ZodType = z.object({
        id: z.string(),
        rate: z.number().positive(),
    })
}