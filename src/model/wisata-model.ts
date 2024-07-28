import {Wisata} from "@prisma/client";
import {Request} from "express";


export type WisataResponse = {
    id: string
    title: string
    description?: string | null
    rate?: number | null
    img_wisata?: string | null
    is_favourite?: boolean | null
    price: string | null
    created_at: string
    updated_at: string
}

export type CreateWisataRequest = {
    id: string
    title: string
    description?: string
    rate?: number
    img_wisata?: string
    price: string
    category: string
}

export type UpdateWisataRequest = {
    id: string
}

export type UpdateWisataRateRequest = {
    id: string
    rate: number
}

export function toWisataResponse(wisata: Wisata, req: Request): WisataResponse {
    const imageUrl = wisata.img_wisata ? `${req.protocol}://${req.get('host')}/${wisata.img_wisata.replace(/\\/g, '/')}` : null;
    return {
        id: wisata.id,
        title: wisata.title,
        description: wisata.description ?? null,
        rate: wisata.rate ?? null,
        img_wisata: imageUrl,
        is_favourite: wisata.is_favourite ?? null,
        price: wisata.price,
        created_at: wisata.created_at,
        updated_at: wisata.updated_at,
    }
}