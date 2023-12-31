import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaLikesRepository } from "../../../repository/prisma/prisma-likes-repository";
import { PrismaPostsRepository } from "../../../repository/prisma/prisma-posts-repository";
import { LikeDislikeUseCase } from "../../../use-cases/like-dislike/like-dislike-use-case";
import { PrismaUsersRepository } from "../../../repository/prisma/prisma-users-repository";
import { PostNotFoundError } from "../../../use-cases/global-errors";

export async function likeDislikeController(req: FastifyRequest, res: FastifyReply) {
    const likeDislikeValidationSchema = z.object({
        id: z.coerce.number().int()
    })

    const { id } = likeDislikeValidationSchema.parse(req.params)

    try {
        const likesRepository = new PrismaLikesRepository()
        const postsRepository = new PrismaPostsRepository()
        const usersRepository = new PrismaUsersRepository()
        const likeDislikeUseCase = new LikeDislikeUseCase(usersRepository, postsRepository, likesRepository)

        const userId = Number(req.user.sub)

        const { isLiked } = await likeDislikeUseCase.handle({ postId: id, userId })

        return res.status(201).send({ isLiked })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).send({ message: error.message })
        }
    }
}
