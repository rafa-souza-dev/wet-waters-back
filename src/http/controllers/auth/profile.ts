import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../../repository/prisma/prisma-users-repository";
import { UserNotFoundError } from "../../../use-cases/global-errors";
import { FindUserByIdUseCase } from "../../../use-cases/find-user-by-id/find-user-by-id-use-case";

export async function profile(request: FastifyRequest, response: FastifyReply) {
    try {
        const usersRepository = new PrismaUsersRepository()
        const findUserByIdUseCase = new FindUserByIdUseCase(usersRepository)

        const { user } = await findUserByIdUseCase.handle({ userId: Number(request.user.sub) })

        return response.send({user})
    } catch (error) {
        if (error instanceof UserNotFoundError) {
            return response.send({ message: error.message }).status(401)
        }
    }
}
