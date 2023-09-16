import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaAnimalsRepository } from "../../../repository/prisma/prisma-animals-repository";
import { FindAllAnimalUseCase } from "../../../use-cases/find-all-animal/find-all-animal-use-case";

export async function findAllAnimalsController(request: FastifyRequest, response: FastifyReply) {

    const prismaAnimalsRepository = new PrismaAnimalsRepository();
    const findAllAnimalUseCase = new FindAllAnimalUseCase(prismaAnimalsRepository);

    const animals  = await findAllAnimalUseCase.handle();

    return response.send(animals);

}