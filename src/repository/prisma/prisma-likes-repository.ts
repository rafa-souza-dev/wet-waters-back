import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma";
import { ILikesRepository } from "../i-likes-repository";

export class PrismaLikesRepository implements ILikesRepository {
    async create(data: Prisma.LikeUncheckedCreateInput) {
        const like = await prisma.like.create({
            data
        })

        return like
    }

    async delete(userId: number, postId: number) {
        await prisma.like.delete({
            where: {
                user_id_post_id: {
                    post_id: postId,
                    user_id: userId
                }
            }
        })
    }

    async find(userId: number, postId: number) {
        const like = await prisma.like.findFirst({
            where: {
                post_id: postId,
                user_id: userId
            }
        })

        return like
    }
}
