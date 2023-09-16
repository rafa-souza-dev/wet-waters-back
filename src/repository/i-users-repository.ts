import { Prisma, User } from "@prisma/client";

export interface IUsersRepository {
    findById: (userId: number) => Promise<User | null>
    findByGithubId: (google_id: string) => Promise<User | null>
    create: (user: Prisma.UserCreateInput) => Promise<User>
    update: (userId: number, data: Prisma.UserUncheckedUpdateInput) => Promise<User>
}
