import {UserRequest} from "../type/user-request";
import {NextFunction, Response} from "express";
import {CreateWisataRequest, UpdateWisataRateRequest, UpdateWisataRequest} from "../model/wisata-model";
import {ResponseFormatter} from "../helpers/response-formatter";
import {WisataService} from "../service/wisata-service";

export class WisataController {
    static async create(req: UserRequest,res: Response, next: NextFunction){
        try {
            const request: CreateWisataRequest = req.body as CreateWisataRequest
            const imgFile = req.file;
            const response = await WisataService.create(req.user!,request,imgFile!,req)
            ResponseFormatter.success(res,response,'Successfully Create Wisata',201)
        }catch (e){
            next(e)
        }
    }

    static async get(req: UserRequest,res: Response, next: NextFunction){
        try {
            const response = await WisataService.get(req.user!,req)
            ResponseFormatter.success(res,response,'Successfully Get Wisata',200)
        }catch (e){
            next(e)
        }
    }

    static async update(req: UserRequest,res: Response, next: NextFunction){
        try {
            const request: UpdateWisataRequest = req.body as UpdateWisataRequest
            request.id = req.params.wisataId
            const response = await WisataService.update(req.user!,request,req)
            ResponseFormatter.success(res,response,'Successfully Update Favourite',201)
        }catch (e){
            next(e)
        }
    }

    static async updateRate(req: UserRequest,res: Response, next: NextFunction){
        try {
            const request: UpdateWisataRateRequest = req.body as UpdateWisataRateRequest
            request.id = req.params.wisataId
            const response = await WisataService.updateRate(req.user!,request,req)
            ResponseFormatter.success(res,response,'Successfully Update Rate',201)
        }catch (e){
            next(e)
        }
    }
}