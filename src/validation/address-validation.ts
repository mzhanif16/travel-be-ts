import {z,ZodType} from "zod";

export class AddressValidation {
    static readonly CREATE : ZodType = z.object({
        userId: z.string().min(1).max(100),
        street: z.string().min(1).max(100).optional(),
        city: z.string().min(1).max(100).optional(),
        province: z.string().min(1).max(100).optional(),
        country: z.string().min(1).max(100),
        postal_code: z.string().min(1).max(100),
    })
}