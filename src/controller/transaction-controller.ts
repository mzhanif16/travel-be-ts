import {UserRequest} from "../type/user-request";
import {Response,NextFunction} from "express";
import {ResponseFormatter} from "../helpers/response-formatter";
import {CreateTransactionItemRequest, CreateTransactionRequest} from "../model/transaction-model";
import {TransactionService} from "../service/transaction-service";

export class TransactionController {
    static async create(req: UserRequest,res: Response,next: NextFunction){
        try {
            const request: CreateTransactionRequest = req.body as CreateTransactionRequest;
            const itemRequest: {data: CreateTransactionItemRequest[]} = req.body as {data: CreateTransactionItemRequest[]};
            const response = await TransactionService.create(req.user!,request,itemRequest)
            ResponseFormatter.success(res,response,'Successfully Create Transaction',201)
        }catch (e){
            next(e)
        }
    }
    static async get(req: UserRequest,res: Response,next: NextFunction){
        try {
            const response = await TransactionService.getListTransaction(req.user!)
            ResponseFormatter.success(res,response,'Successfully Get List Transaction',200)
        }catch (e){
            next(e)
        }
    }
}