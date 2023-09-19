import { CreateAnimalUseCaseRequest, CreateAnimalUseCaseResponse } from "./dtos";
import { ErrorAnimalAlreadyExists } from "./errors";
import { IAnimalsRepository } from "../../repository/i-animals-repository";
import { persistBase64Image, persistMultipartImage } from "../../infra/supabase/upload";

export class CreateAnimalUseCase {
    constructor(private animalRepository: IAnimalsRepository) { }

    async handle({
        conservation_status,
        ecological_function,
        name,
        size,
        specie_name,
        fileData,
        threat_causes
    }: CreateAnimalUseCaseRequest): Promise<CreateAnimalUseCaseResponse> {
        const animalAlreadyExists = !!(await this.animalRepository.findBySpecie(specie_name));

        if (animalAlreadyExists) {
            throw new ErrorAnimalAlreadyExists();
        }

        const url_image = typeof fileData === "string" ? 
            await persistBase64Image('animals', fileData) :
            await persistMultipartImage('animals', fileData)

        const connectCauses = threat_causes.map(cause => ({
            where: {
                description: cause
            },
            create: {
                description: cause
            }
        }))

        const animal = await this.animalRepository.create({
            name,
            conservation_status,
            ecological_function,
            size,
            specie_name,
            url_image,
            threat_causes: {
                connectOrCreate: connectCauses
            }
        });

        return { animal };
    }
}
