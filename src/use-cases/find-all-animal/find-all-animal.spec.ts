import { describe, expect, it } from "vitest";
import { AnimalsInMemoryRepository } from "../../repository/in-memory/animals-in-memory-repository";
import { InMemoryData } from "../../@types/in-memory-data";
import { FindAllAnimalUseCase } from "../../use-cases/find-all-animal/find-all-animal-use-case";

describe("List all Animals", () => {
    it("should be able to all animals", async () => {
        const data: InMemoryData = {
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
                    conservation_status: "CRITICAL_ENDANGERED",
                    ecological_function: "this is good...",
                    name: "arara azul",
                    size: 100,
                    specie_name: "araras azules",
                    url_image: "https://imagem-mockada.png"
                }
            ],
            threat_causes: [],
            likes: [],
            posts: [],
            users: []
        }

        const animalsRepository = new AnimalsInMemoryRepository(data)
        const findAllAnimalsUseCase = new FindAllAnimalUseCase(animalsRepository)

        const { animals } = await findAllAnimalsUseCase.handle()

        expect(animals.length).toBe(2)
        expect(animals[0].id).toBe(1)
        expect(animals[1].id).toBe(2)
    })
})
