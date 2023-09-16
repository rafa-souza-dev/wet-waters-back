import { ConservationStatus } from "@prisma/client"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { PrismaAnimalsRepository } from "../../../repository/prisma/prisma-animals-repository";
import { CreateAnimalUseCase } from "../../../use-cases/create-animal/create-animal-use-case";
import { ErrorAnimalAlreadyExists } from "../../../use-cases/create-animal/errors";

export async function createAnimalController(request: FastifyRequest, response: FastifyReply) {
    const data = await request.file()

    if (!data) return response.status(400).send({
        message: "Please, submit a file"
    })

    const createAnimalValidationFieldsSchema = z.object({
        name: z.object({
            mimetype: z.string().refine(mimetype => mimetype === "text/plain"),
            value: z.string()
        }),
        threat_causes: z.object({
            mimetype: z.string().refine(mimetype => mimetype === "text/plain"),
            value: z.string().transform(threat_causes => threat_causes.trim().split(","))
        }),
        specie_name: z.object({
            mimetype: z.string().refine(mimetype => mimetype === "text/plain"),
            value: z.string()
        }),
        size: z.object({
            mimetype: z.string().refine(mimetype => mimetype === "text/plain"),
            value: z.coerce.number().int()
        }),
        conservation_status: z.object({
            mimetype: z.string().refine(mimetype => mimetype === "text/plain"),
            value: z.nativeEnum(ConservationStatus)
        }),
        ecological_function: z.object({
            mimetype: z.string().refine(mimetype => mimetype === "text/plain"),
            value: z.string()
        })
    })

    const {
        name: { value: nameValue },
        specie_name: { value: specieNameValue },
        size: { value: sizeValue },
        conservation_status: { value: conservationStatusValue },
        ecological_function: { value: ecologicalFunctionValue },
        threat_causes: { value: causesArray }
    } = createAnimalValidationFieldsSchema.parse(data.fields);

    z.enum(["image/png", "image/jpeg"]).parse(data.mimetype)

    try {
        const prismaAnimalsRepository = new PrismaAnimalsRepository();
        const createAnimalUseCase = new CreateAnimalUseCase(prismaAnimalsRepository);

        const animal = await createAnimalUseCase.handle({
            name: nameValue,
            conservation_status: conservationStatusValue,
            ecological_function: ecologicalFunctionValue,
            size: sizeValue,
            specie_name: specieNameValue,
            fileData: data,
            threat_causes: causesArray
        })

        return response.code(201).send({ animal });
    } catch (error) {
        if (error instanceof ErrorAnimalAlreadyExists) {
            return response.code(404).send({
                message: error.message
            });
        }
    }
}
