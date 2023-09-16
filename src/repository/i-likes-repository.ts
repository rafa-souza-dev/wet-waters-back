import { Like, Prisma } from "@prisma/client";

export interface ILikesRepository {
    create: (data: Prisma.LikeUncheckedCreateInput) => Promise<Like>
    find: (userId: number, postId: number) => Promise<Like | null>
    delete: (userId: number, postId: number) => Promise<void>
}
