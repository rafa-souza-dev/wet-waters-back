import { IAnimalsRepository } from "../../repository/i-animals-repository";
import { FindAllAnimalUseCaseResponse } from "./dtos";

export class FindAllAnimalUseCase {
    constructor(private animalRepository: IAnimalsRepository) {}

    async handle(): Promise<FindAllAnimalUseCaseResponse> {
        const animals = await this.animalRepository.findAll();

        return {animals};
    }
}