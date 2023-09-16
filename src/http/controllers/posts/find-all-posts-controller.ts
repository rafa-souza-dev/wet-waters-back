import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaPostsRepository } from "../../../repository/prisma/prisma-posts-repository";
import { FindAllPostsUseCase } from "../../../use-cases/find-all-posts/find-all-posts-use-case";


export async function findAllPostsController(request: FastifyRequest, response: FastifyReply) {
    const prismaPostsRepository = new PrismaPostsRepository();
    const findAllPostsUseCase = new FindAllPostsUseCase(prismaPostsRepository);

    const { posts } = await findAllPostsUseCase.handle();

    const postsSchema = z.array(
        z.object({
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
        }));

    const treatiesPosts = postsSchema.parse(posts);

    const retrievedPosts = treatiesPosts.map(({ _count, ...rest }) => ({
        likes: _count, ...rest
    }));

    return response.send({ posts: retrievedPosts });
}