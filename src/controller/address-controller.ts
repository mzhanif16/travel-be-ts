
import {Response,NextFunction} from "express";
import {UserRequest} from "../type/user-request";
import {ResponseFormatter} from "../helpers/response-formatter";
import {AddressService} from "../service/address-service";
import {CreateAddressRequest} from "../model/address-model";

export class AddressController {
    static async createAddress(req: UserRequest,res: Response, next: NextFunction) {
        try {
            const request: CreateAddressRequest = req.body as CreateAddressRequest;
            request.userId = req.params.userId
            const response = await AddressService.createAddress(request)
            ResponseFormatter.success(res,response,'Successfully Create Address',201)
        }catch (e){
            next(e)
        }
    }
    static async getAddress(req: UserRequest,res: Response, next: NextFunction) {
        try {
            const response = await AddressService.getAddress(req.user!)
            ResponseFormatter.success(res,response,'Successfully Get Address',200)
        }catch (e){
            next(e)
        }
    }
}