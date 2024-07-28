import {z,ZodType} from "zod";

export class TransactionValidation {
    static readonly CREATE : ZodType = z.object({
        status: z.string().min(1).max(100)
    })
    static readonly createTransactionItemRequestSchema: ZodType = z.object({
        wisataId: z.string(),
        qty: z.number()
    });
    static readonly CREATE_ITEM : ZodType = z.object({
        data: z.array(this.createTransactionItemRequestSchema)
    })
}