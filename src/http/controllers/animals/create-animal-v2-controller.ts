import { ConservationStatus } from "@prisma/client"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { PrismaAnimalsRepository } from "../../../repository/prisma/prisma-animals-repository";
import { CreateAnimalUseCase } from "../../../use-cases/create-animal/create-animal-use-case";
import { ErrorAnimalAlreadyExists } from "../../../use-cases/create-animal/errors";

export async function createAnimalV2Controller(request: FastifyRequest, response: FastifyReply) {
    const createAnimalValidationSchema = z.object({
        name: z.string(),
        threat_causes: z.string().transform(threat_causes => threat_causes.trim().split(",")),
        specie_name: z.string(),
        size: z.coerce.number().int(),
        conservation_status: z.nativeEnum(ConservationStatus),
        ecological_function: z.string(),
        image: z.string()
    })

    const {
        conservation_status,
        ecological_function,
        image,
        name,
        size,
        specie_name,
        threat_causes
    } = createAnimalValidationSchema.parse(request.body);

    try {
        const animalRepository = new PrismaAnimalsRepository();
        const createAnimalUseCase = new CreateAnimalUseCase(animalRepository);

        const { animal } = await createAnimalUseCase.handle({
            name,
            conservation_status,
            ecological_function,
            size,
            specie_name,
            fileData: image,
            threat_causes
        })

        return response.code(201).send(animal);
    } catch (error) {
        if (error instanceof ErrorAnimalAlreadyExists) {
            return response.code(404).send({
                message: error.message
            });
        }
    }
}
