import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaPostsRepository } from "../../../repository/prisma/prisma-posts-repository";
import { PrismaUsersRepository } from "../../../repository/prisma/prisma-users-repository";
import { ValidatePostUseCase } from "../../../use-cases/validate-post/validate-post-use-case";

export async function validatePostController(request: FastifyRequest, response: FastifyReply) {
    const validatePostValidationSchema = z.object({
        post_id: z.number().int(),
        is_valid: z.boolean(),
        points: z.number()
    });

    const {
        is_valid,
        points,
        post_id
    } = validatePostValidationSchema.parse(request.body);

    try {
        const usersRepository = new PrismaUsersRepository();
        const postsRepository = new PrismaPostsRepository();
        const validatePostUseCase = new ValidatePostUseCase(
            postsRepository,
            usersRepository
        )

        await validatePostUseCase.handle({
            postId: post_id, 
            isValid: is_valid, 
            points
        })

        return response.send({
            message: 'Ok!'
        })
    } catch (error) {
        if (error instanceof Error) {
            return response.code(404).send({
                message: error.message
            });
        }
    }
}
