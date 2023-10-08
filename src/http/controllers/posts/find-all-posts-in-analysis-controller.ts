import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPostsRepository } from "../../../repository/prisma/prisma-posts-repository";
import { FindAllPostsInAnalysisUseCase } from "../../../use-cases/find-all-posts-in-analysis/find-all-posts-in-analysis-use-case";
import { z } from "zod";

export async function findAllPostsInAnalysisController(request: FastifyRequest, response: FastifyReply) {
    const prismaPostsRepository = new PrismaPostsRepository();
    const findAllPostsInAnalysisUseCase = new FindAllPostsInAnalysisUseCase(prismaPostsRepository);

    const { posts } = await findAllPostsInAnalysisUseCase.handle();

    const postsSchema = z.array(
        z.object({
            id: z.number(),
            title: z.string(),
            description: z.string().transform(description => description.substring(0, 50)),
            url_image: z.string().or(z.null()),
            published_at: z.date().or(z.null())
        }));

    const treatiesPosts = postsSchema.parse(posts);

    return response.send({ posts: treatiesPosts });

}