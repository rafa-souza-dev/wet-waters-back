import { MultipartFile } from "@fastify/multipart";
import { Animal, ConservationStatus } from "@prisma/client";

export interface CreateAnimalUseCaseRequest {
    name: string
    specie_name: string
    size: number
    conservation_status: ConservationStatus
    ecological_function: string
    fileData: MultipartFile | string
    threat_causes: string[]
}

export interface CreateAnimalUseCaseResponse {
    animal: Animal
}