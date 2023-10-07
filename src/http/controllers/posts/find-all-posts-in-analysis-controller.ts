import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPostsRepository } from "../../../repository/prisma/prisma-posts-repository";
import { FindAllPostsInAnalysisUseCase } from "../../../use-cases/find-all-posts-in-analysis/find-all-posts-in-analysis-use-case";
import { z } from "zod";

export async function findAllPostsInAnalysisController(request: FastifyRequest, response: FastifyReply) {
    const prismaPostsRepository = new PrismaPostsRepository();
    const findAllPostsInAnalysisUseCase = new FindAllPostsInAnalysisUseCase(prismaPostsRepository);

    const { posts } = await findAllPostsInAnalysisUseCase.handle();

    return response.send({ posts });

}