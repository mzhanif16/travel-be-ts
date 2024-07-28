import {User} from "@prisma/client";
import {
    CreateTransactionItemRequest,
    CreateTransactionRequest,
    toTransactionAddressWisataResponse,
    TransactionResponse
} from "../model/transaction-model";
import {Validation} from "../validation/validation";
import {TransactionValidation} from "../validation/transaction-validation";
import {AddressService} from "./address-service";
import {v4 as uuid} from "uuid";
import {prismaClient} from "../application/database";
import {ResponseError} from "../error/response-error";
import {toAddressResponse} from "../model/address-model";

export class TransactionService {
    static async create(user: User, request: CreateTransactionRequest,requestData: { data: CreateTransactionItemRequest[] }): Promise<TransactionResponse> {
        const createTransactionRequest = Validation.validate(TransactionValidation.CREATE, request)
        const isUserExist = await AddressService.checkUserMustExists(user.id)
        if (isUserExist) {
            const id = uuid()
            let totalPrice = 0;

            const record = {
                ...{status: createTransactionRequest.status, id: id, userId: user.id}
            }
            const transaction = await prismaClient.transaction.create({data: record})
            const updatedTransaction = await prismaClient.transaction.findFirst({
                where: {
                    id: transaction.id,
                    userId: user.id
                },
                include: {
                    user: true
                }
            });

            const address = await prismaClient.address.findUnique({
                where: {
                    userId: user.id
                }
            })
            if (!address) {
                throw new ResponseError(404, "Address not found")
            }

            if (!updatedTransaction) {
                throw new ResponseError(404, "Transaction not found");
            }

            const data = requestData.data;
            if (!Array.isArray(data)) {
                throw new ResponseError(400, "Format data tidak valid. Data harus berupa array.");
            }
            for (const req of data) {
                const wisataList = await prismaClient.wisata.findMany({
                    where: {
                        id: req.wisataId
                    }
                });

                if (wisataList.length > 0) {
                    const price = Number(wisataList[0].price);
                    const qty = Number(req.qty);
                    const itemTotalPrice = price * qty;
                    totalPrice += itemTotalPrice;
                    const transactionItemId = uuid()
                    const itemRequest = {
                        id: transactionItemId,
                        transactionId: id,
                        wisataId: req.wisataId,
                        qty: qty,
                        total_price: itemTotalPrice
                    };
                    console.log(`item: ${itemRequest}`);
                    await prismaClient.transactionItem.create({
                        data: itemRequest,
                    })
                } else {
                    console.error(`Wisata dengan ID ${req.wisataId} tidak ditemukan.`);
                }
            }
            await prismaClient.transaction.update({
                where: { id: id },
                data: { total_price_item: totalPrice }
            });

            return {
                ...toTransactionAddressWisataResponse(updatedTransaction),
                address: toAddressResponse(address)
            };
        } else {
            throw new ResponseError(401, "Unauthorized")
        }
    }

    static async getListTransaction(user: User): Promise<Array<TransactionResponse>> {
        const isUserExist = await AddressService.checkUserMustExists(user.id)
        if (isUserExist) {
            const transaction = await prismaClient.transaction.findMany({
                where: {
                    userId: user.id
                },
                include: {
                    user: true
                }
            })
            const address = await prismaClient.address.findUnique({
                where: {
                    userId: user.id
                }
            })

            if (!address) {
                throw new ResponseError(404, "Address not found")
            }
            if (!transaction) {
                throw new ResponseError(404, "No Transaction found")
            }

            return await Promise.all(transaction.map(async (transaction) => {
                const items = await prismaClient.transactionItem.findMany({
                    where: {
                        transactionId: transaction.id
                    },
                    include: {
                        wisata: true
                    }
                });
                return {
                    ...toTransactionAddressWisataResponse(transaction),
                    address: toAddressResponse(address),
                    items: items
                };
            }));
        } else {
            throw new ResponseError(404, "Unauthorized")
        }
    }
}