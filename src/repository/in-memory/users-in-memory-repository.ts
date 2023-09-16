import { $Enums, Prisma } from "@prisma/client";
import { InMemoryData } from "../../@types/in-memory-data";
import { IUsersRepository } from "../i-users-repository";
import { IInMemoryRepository } from "../i-in-memory-repository";

export class UsersInMemoryRepository implements IUsersRepository, IInMemoryRepository {
    constructor(
        readonly data: InMemoryData
    ) {}

    async findByGithubId(github_id: string) {
        return this.data.users.find(user => user.github_id === github_id) || null
    }

    async create(user: Prisma.UserCreateInput) {
        this.data.users.push({
            id: this.data.users.length + 1,
            avatar_url: "",
            github_id: "",
            point: 0,
            role: user.role,
            username: user.username
        })

        return this.data.users[this.data.users.length - 1]
    }
        
    async findById(userId: number) {
        return this.data.users.find(user => user.id === userId) || null
    }

    async update(userId: number, data: Prisma.UserUncheckedUpdateInput) {
        const user = this.data.users.find(user => user.id === userId)!

        const validDataPoints = Number(data.point) >= 0

        user.avatar_url = data.avatar_url ? String(data.avatar_url) : user.avatar_url
        user.github_id = data.github_id ? String(data.github_id) : user.github_id
        user.point = validDataPoints ? Number(data.point) : user.point
        user.username = data.username ? String(data.username) : user.username

        this.data.users[user.id - 1] = user

        return user
    }
}
