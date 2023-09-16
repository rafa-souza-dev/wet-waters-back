import { Prisma } from "@prisma/client";
import { InMemoryData } from "../../@types/in-memory-data";
import { IAnimalsRepository } from "../i-animals-repository";
import { IInMemoryRepository } from "../i-in-memory-repository";

export class AnimalsInMemoryRepository implements IAnimalsRepository, IInMemoryRepository {
    constructor(readonly data: InMemoryData) {}

    async findAll() {
        return this.data.animals
    }

    async create({
        conservation_status,
        ecological_function,
        name,
        size,
        specie_name,
        url_image
    }: Prisma.AnimalUncheckedCreateInput) {
        const id = this.data.animals.length + 1
        
        this.data.animals.push({
            conservation_status,
            ecological_function,
            id,
            name,
            size,
            specie_name,
            url_image
        })

        return this.data.animals[id]
    }

    async findById(animalId: number) {
        const animal = this.data.animals.find(animal => animal.id === animalId)

        return animal || null
    }

    async findBySpecie(specie: string) {
        const animal = this.data.animals.find(animal => animal.specie_name === specie)

        return animal || null
    }
}
