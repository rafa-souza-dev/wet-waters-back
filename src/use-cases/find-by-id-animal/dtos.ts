import { Animal } from "@prisma/client";

export interface FindByIdAnimalUseCaseRequest {
    animalId: number
}

export interface FindByIdAnimalUseCaseResponse {
    animal: Animal
}