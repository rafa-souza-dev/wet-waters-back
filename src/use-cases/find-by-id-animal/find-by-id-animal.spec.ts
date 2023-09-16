import {
    describe, 
    it,
    expect,
    beforeEach 
} from "vitest";
import { FindByIdAnimalUseCase } from "../../use-cases/find-by-id-animal/find-by-id-animal";
import { IAnimalsRepository } from "../../repository/i-animals-repository";
import { InMemoryData } from "../../@types/in-memory-data";
import { AnimalsInMemoryRepository } from "../../repository/in-memory/animals-in-memory-repository";
import { ErrorAnimalNotExists } from "./erros";

let data: InMemoryData
let useCase: FindByIdAnimalUseCase
let animalsRepository: IAnimalsRepository

beforeEach(() => {
    data = {
        animals: [
            {
                id: 1,
                conservation_status: "CRITICAL_ENDANGERED",
                ecological_function: "this is good...",
                name: "tubarão martelo",
                size: 700,
                specie_name: "tubarales marteles",
                url_image: "https://imagem-mockada.png"
            },
            {
                id: 2,
                conservation_status: "VULNERABLE",
                ecological_function: "this is good...",
                name: "arara azul",
                size: 100,
                specie_name: "araras azules",
                url_image: "https://imagem-mockada.png"
            },
            {
                id: 3,
                conservation_status: "NOT_AVALUATED",
                ecological_function: "this is good...",
                name: "mico-leao azulzinho",
                size: 100,
                specie_name: "micos leones",
                url_image: "https://imagem-mockada.png"
            },
        ],
        threat_causes: [],
        likes: [],
        posts: [],
        users: []
    }

    animalsRepository = new AnimalsInMemoryRepository(data)
    useCase = new FindByIdAnimalUseCase(animalsRepository)
})

describe("Find Animal by ID", () => {
    it("should be able to find animal", async () => {
        const { animal } = await useCase.handle({ animalId: 1 })

        expect(animal.id).toBe(1)
    })

    it("should not be able to find nonexistent animal", async () => {
        await expect(() =>
            useCase.handle({ animalId: 4 }),
        ).rejects.toBeInstanceOf(ErrorAnimalNotExists)
    })
})
