import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaPostsRepository } from "../../../repository/prisma/prisma-posts-repository";
import { FindByIdPostUseCase } from "../../../use-cases/find-by-id-post/find-by-id-post-use-case";
import { ErrorPostNotExists } from "../../../use-cases/find-by-id-post/erros";

export async function findByIdPostController(request: FastifyRequest, response: FastifyReply) {
    const findByIdPostValidationSchema = z.object({
        id: z.coerce.number().int()
    });

    const { id } = findByIdPostValidationSchema.parse(request.params);

    try {
        const prismaPostRepository = new PrismaPostsRepository();
        const findByIdPostUseCase = new FindByIdPostUseCase(prismaPostRepository);

        const { post } = await findByIdPostUseCase.handle({ postId: id });

        const postSchema = z.object({
            id: z.number(),
            title: z.string(),
            description: z.string(),
            url_image: z.string().or(z.null()),
            published_at: z.date().or(z.null()),
            user: z.object({
                username: z.string(),
            }).transform(user => user.username),
            _count: z.object({
                likes: z.number(),
            }).transform(count => count.likes),
        });

        const { _count: likes, ...rest } = postSchema.parse(post);

        return response.send({
            post: {
                likes,
                ...rest
            }
        });

    } catch (error) {
        if (error instanceof ErrorPostNotExists) {
            return response.code(404).send({
                message: error.message
            });
        }
    }
}