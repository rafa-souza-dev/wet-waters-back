import { FastifyReply, FastifyRequest } from "fastify";

import { z } from "zod";
import { PrismaPostsRepository } from "../../../repository/prisma/prisma-posts-repository";
import { FilterManyByTitlePostsUseCase } from "../../../use-cases/filter-many-by-title-posts/filter-many-by-title-posts-use-case";

export async function filterManyByTitleController(request: FastifyRequest, response: FastifyReply) {
    const filterManyByTitleValidationSchema = z.object({
        title: z.string()
    });

    const { title } = filterManyByTitleValidationSchema.parse(request.query);

    const prismaPostsRepository = new PrismaPostsRepository();
    const filterManyByTItlePostsUsecase = new FilterManyByTitlePostsUseCase(prismaPostsRepository);

    const { posts } = await filterManyByTItlePostsUsecase.handle({ title });

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