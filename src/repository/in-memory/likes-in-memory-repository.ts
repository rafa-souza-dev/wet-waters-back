import { Prisma } from "@prisma/client";
import { InMemoryData } from "../../@types/in-memory-data";
import { ILikesRepository } from "../i-likes-repository";
import { IInMemoryRepository } from "../i-in-memory-repository";

export class LikesInMemoryRepository implements ILikesRepository, IInMemoryRepository {
    constructor(
        readonly data: InMemoryData
    ) {}

    async create({ post_id, user_id }: Prisma.LikeUncheckedCreateInput) {
        this.data.likes.push({
            post_id,
            user_id
        })

        return this.data.likes[this.data.likes.length - 1]
    }

    async delete(userId: number, postId: number) {
        this.data.likes = this.data.likes.filter(like => (
            like.post_id !== postId && like.user_id !== userId
        ))
    }

    async find(userId: number, postId: number) {
        return this.data.likes.find(like => (
            like.post_id === postId && like.user_id === userId
        )) || null
    }
}
