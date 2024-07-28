import {logger} from "./logging";
import {PrismaClient} from "@prisma/client";

export const prismaClient = new PrismaClient({
    log: [
        {
            emit: "event",
            level: "error"
        },
        {
            emit: "event",
            level: "info"
        },
        {
            emit: "event",
            level: "warn"
        }
    ]
})

prismaClient.$use(async (params, next) => {
    const currentDate = new Date().toISOString();

    if (params.action === 'create' || params.action === 'createMany') {
        if (params.args.data) {
            params.args.data['created_at'] = currentDate;
            params.args.data['updated_at'] = currentDate;
        } else {
            params.args['data'] = {
                created_at: currentDate,
                updated_at: currentDate
            };
        }
    }

    if (params.action === 'update' || params.action === 'updateMany') {
        if (params.args.data) {
            params.args.data['updated_at'] = currentDate;
        } else {
            params.args['data'] = { updated_at: currentDate };
        }
    }

    return next(params);
});

prismaClient.$on("error", (e) => {
    logger.error(e)
})

prismaClient.$on("warn", (e) => {
    logger.warn(e)
})

prismaClient.$on("info", (e) => {
    logger.info(e)
})
