import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaPostsRepository } from "../../../repository/prisma/prisma-posts-repository";
import { CreatePostUseCase } from "../../../use-cases/create-post/create-post-use-case";
import { PrismaUsersRepository } from "../../../repository/prisma/prisma-users-repository";
import { ErrorUserNotFound } from "../../../use-cases/create-post/erros";

export async function createPostController(request: FastifyRequest, response: FastifyReply) {
    const createPostValidationSchema = z.object({
        title: z.string(),
        description: z.string(),
        image: z.string()
    });

    const { title, description, image } = createPostValidationSchema.parse(request.body);


    try {
        const prismaPostsRepository = new PrismaPostsRepository();
        const prismaUsersRepository = new PrismaUsersRepository();
        const createPostUseCase = new CreatePostUseCase(prismaPostsRepository, prismaUsersRepository);


        const { post } = await createPostUseCase.handle({ description, image, title, userId: Number(request.user.sub) });

        const postSchema = z.object({
            id: z.number(),
            title: z.string(),
            description: z.string().transform(description => description.substring(0, 50)),
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
        console.log({
            post: {
                likes,
                ...rest
            }
        });
        return response.status(201).send({
            post: {
                likes,
                ...rest
            }
        });
    } catch (error) {
        if (error instanceof ErrorUserNotFound) {
            return response.code(404).send({
                message: error.message
            });
        }
    }

}