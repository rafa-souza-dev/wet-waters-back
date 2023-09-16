import { IAnimalsRepository } from "../../repository/i-animals-repository";
import { FindByIdAnimalUseCaseRequest, FindByIdAnimalUseCaseResponse } from "./dtos";
import { ErrorAnimalNotExists } from "./erros";

export class FindByIdAnimalUseCase {
    constructor(private animalRepository: IAnimalsRepository) { }

    async handle({ animalId }: FindByIdAnimalUseCaseRequest): Promise<FindByIdAnimalUseCaseResponse> {

        const animal = await this.animalRepository.findById(animalId);

        if (animal == null) {
            throw new ErrorAnimalNotExists();
        }

        return { animal };

    }
}