import {Transaction, User} from "@prisma/client";
import {toUserResponse, UserResponse} from "./user-model";
import {ResponseError} from "../error/response-error";
import {AddressResponse} from "./address-model";

export type TransactionResponse = {
    id: string
    user: UserResponse
    address?: AddressResponse
    total_price_item: number | null
    status: string | null
    created_at: string
    updated_at: string
}

export type CreateTransactionRequest = {
    id: string
    status: string
    total_price?: number
}

export type CreateTransactionItemRequest = {
    wisataId: string
    qty: number
}

export function toTransactionAddressWisataResponse(transaction: Transaction & {
    user: User | null;
}): TransactionResponse {
    if (!transaction.user) {
        throw new ResponseError(404, "Transaction details are incomplete");
    }

    return {
        id: transaction.id,
        total_price_item:transaction.total_price_item,
        user: toUserResponse(transaction.user),
        status: transaction.status,
        created_at: transaction.created_at,
        updated_at: transaction.updated_at,
    }
}
