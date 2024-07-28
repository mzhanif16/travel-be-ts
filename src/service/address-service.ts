import {AddressResponse, CreateAddressRequest, toAddressResponse, toAddressUserResponse} from "../model/address-model";
import {Validation} from "../validation/validation";
import {AddressValidation} from "../validation/address-validation";
import {prismaClient} from "../application/database";
import {User} from "@prisma/client";
import {ResponseError} from "../error/response-error";
import {v4 as uuid} from "uuid";

export class AddressService {
    static async createAddress(request: CreateAddressRequest): Promise<AddressResponse>{
        const createRequest = Validation.validate(AddressValidation.CREATE,request)
        await this.checkUserMustExists(createRequest.userId)
        const id = uuid()
        const record = {
            ...createRequest,
            ...{id: id}
        }
        const address = await prismaClient.address.create({
            data : record
        })
        return toAddressResponse(address)
    }
    static async checkUserMustExists(userId: string): Promise<User> {
        const contact = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        })
        if (!contact) {
            throw new ResponseError(404, "Could not find user")
        }

        return contact
    }
    static async getAddress(user: User): Promise<AddressResponse>{
        await this.checkUserMustExists(user.id)
        const address = await prismaClient.address.findFirst({
            where : {
                userId: user.id
            },
            include: {
                user: true
            }
        })
        if (!address){
            throw new ResponseError(404,"Address not found")
        }
        return toAddressUserResponse(address)
    }
}