import {User} from "@prisma/client";
import {
    CreateWisataRequest,
    toWisataResponse,
    UpdateWisataRateRequest,
    UpdateWisataRequest,
    WisataResponse
} from "../model/wisata-model";
import {Validation} from "../validation/validation";
import {WisataValidation} from "../validation/wisata-validation";
import {v4 as uuid} from "uuid";
import {AddressService} from "./address-service";
import {prismaClient} from "../application/database";
import {ResponseError} from "../error/response-error";
import {Request} from "express";

export class WisataService {
    static async create(user: User, request: CreateWisataRequest, imgFile: Express.Multer.File, req: Request): Promise<WisataResponse> {
        const createWisataRequest = Validation.validate(WisataValidation.CREATE, request)
        const isUserExist = await AddressService.checkUserMustExists(user.id)
        if (isUserExist) {
            const id = uuid()
            const record = {
                ...createWisataRequest,
                ...{id: id, img_wisata: `${req.protocol}://${req.get('host')}/${imgFile.path.replace(/\\/g, '/')}`}
            }
                const wisata = await prismaClient.wisata.create({
                    data: record
                })
                console.log(record)
                return {
                    ...toWisataResponse(wisata, req),
                    img_wisata: wisata.img_wisata
                };
        } else {
            throw new ResponseError(401, "Unauthorized")
        }
    }

    static async update(user: User, request: UpdateWisataRequest, req: Request): Promise<WisataResponse> {
        const updateWisataRequest = Validation.validate(WisataValidation.UPDATE, request)
        const isUserExist = await AddressService.checkUserMustExists(user.id)
        if (isUserExist) {
            const currentWisata = await prismaClient.wisata.findUnique({
                where: {id: updateWisataRequest.id}
            });

            if (!currentWisata) {
                throw new ResponseError(404, "Wisata not found");
            }
            const newIsFavourite = !currentWisata.is_favourite;

            const updatedWisata = await prismaClient.wisata.update({
                where: {id: updateWisataRequest.id},
                data: {is_favourite: newIsFavourite}
            });

            return toWisataResponse(updatedWisata, req);
        } else {
            throw new ResponseError(401, "Unauthorized");
        }
    }

    static async updateRate(user: User, request: UpdateWisataRateRequest, req: Request): Promise<WisataResponse> {
        const updateWisataRateRequest = Validation.validate(WisataValidation.UPDATE_RATE, request)
        const isUserExist = await AddressService.checkUserMustExists(user.id)
        if (isUserExist) {
            const currentWisata = await prismaClient.wisata.findUnique({
                where: {id: updateWisataRateRequest.id}
            });

            if (!currentWisata) {
                throw new ResponseError(404, "Wisata not found");
            }

            const updatedWisata = await prismaClient.wisata.update({
                where: {id: updateWisataRateRequest.id},
                data: updateWisataRateRequest
            });

            return toWisataResponse(updatedWisata, req);
        } else {
            throw new ResponseError(401, "Unauthorized");
        }
    }

    static async get(user: User, req: Request): Promise<Array<WisataResponse>> {
        const isUserExist = await AddressService.checkUserMustExists(user.id)
        if (isUserExist) {
            const wisata = await prismaClient.wisata.findMany({})
            if (!wisata) {
                throw new ResponseError(401, "No Wisata found")
            }
            return wisata.map(wisata => toWisataResponse(wisata, req))
        } else {
            throw new ResponseError(401, "Unauthorized")
        }
    }


}