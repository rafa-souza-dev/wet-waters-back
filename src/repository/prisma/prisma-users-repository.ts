import { EnumRole, Prisma } from "@prisma/client";
import { IUsersRepository } from "../i-users-repository";
import { prisma } from "../../prisma";

export class PrismaUsersRepository implements IUsersRepository {
    async update(userId: number, data: Prisma.UserUncheckedUpdateInput) {
        const user = await prisma.user.update({
            data,
            where: {
                id: userId
            }
        })

        return user;
    }

    async create(userDTO: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data: {
                github_id: userDTO.github_id,
                role: EnumRole.USER,
                username: userDTO.username,
                avatar_url: userDTO.avatar_url,
                point: 0
            }
        })

        return user;
    }

    async findByGithubId(github_id: string) {
        const user = await prisma.user.findUnique({
            where: {
                github_id
            }
    })

    return user;
}

    async findById(userId: number) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        return user;
    }
}
