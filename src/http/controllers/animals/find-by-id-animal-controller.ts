import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaAnimalsRepository } from "../../../repository/prisma/prisma-animals-repository";
import { FindByIdAnimalUseCase } from "../../../use-cases/find-by-id-animal/find-by-id-animal";
import { ErrorAnimalNotExists } from "../../../use-cases/find-by-id-animal/erros";

export async function findByIdAnimalController(request: FastifyRequest, response: FastifyReply) {
    const findByIdAnimalValidationSchema = z.object({
        id: z.coerce.number().int()
    })

    const { id } = findByIdAnimalValidationSchema.parse(request.params);

    try {
        const prismaAnimalsRepository = new PrismaAnimalsRepository();
        const findByidAnimalUseCase = new FindByIdAnimalUseCase(prismaAnimalsRepository);
        const animal = await findByidAnimalUseCase.handle({ animalId: id });

        const animalSchema = z.object({
            id: z.number(),
            size: z.number(),
            name: z.string(),
            specie_name: z.string(),
            conservation_status: z.string(),
            ecological_function: z.string(),
            url_image: z.string(),
            threat_causes: z.array(z.object({
                description: z.string()
            })).transform(threat_causes => threat_causes.map(cause => cause.description))
        })

        const retrievedAnimal = animalSchema.parse(animal.animal)

        return response.send({ animal: retrievedAnimal });
    } catch (error) {
        if (error instanceof ErrorAnimalNotExists) {
            return response.code(404).send({
                message: error.message
            });
        }
    }

}