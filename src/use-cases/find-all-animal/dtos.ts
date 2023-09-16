import { Animal } from "@prisma/client";

export interface FindAllAnimalUseCaseResponse {
    animals: Animal[]  
}