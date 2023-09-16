import {
    expect,
    it,
    describe,
    beforeEach
} from "vitest"
import { UsersInMemoryRepository } from "../../repository/in-memory/users-in-memory-repository"
import { FindUserByIdUseCase } from "./find-user-by-id-use-case"
import { InMemoryData } from "../../@types/in-memory-data"
import { IUsersRepository } from "../../repository/i-users-repository"
import { UserNotFoundError } from "../global-errors"

let usersRepository: IUsersRepository
let useCase: FindUserByIdUseCase
let data: InMemoryData

beforeEach(() => {
    data = {
        animals: [],
        likes: [],
        posts: [],
        threat_causes: [],
        users: [
            {
                id: 1,
                avatar_url: "",
                github_id: "",
                point: 0,
                role: "USER",
                username: "testUser"
            },
            {
                id: 2,
                avatar_url: "",
                github_id: "",
                point: 0,
                role: "USER",
                username: "testUser2"
            },
        ]
    }

    usersRepository = new UsersInMemoryRepository(data)
    useCase = new FindUserByIdUseCase(usersRepository)
})

describe("Find User By ID Use Case", () => {
    it("should be able to find user by id", async () => {
        const { user } = await useCase.handle({ userId: 1 })

        expect(user.id).toBe(1)
        expect(user.username).toBe("testUser")
    })

    it("should not be able to find a nonexist user by id", async () => {
        await expect(() =>
            useCase.handle({ userId: 3 }),
        ).rejects.toBeInstanceOf(UserNotFoundError)
    })
})
