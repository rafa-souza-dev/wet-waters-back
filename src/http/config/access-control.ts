import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../repository/prisma/prisma-users-repository";
import { EnumRole } from "@prisma/client";

export async function accessControl(request: FastifyRequest, response: FastifyReply) {

    const ADMIN_ROUTES: string[] = []

    const repository = new PrismaUsersRepository();
    if (request.routerPath !== "/api/auth/register") {
        await request.jwtVerify();
        const user = await repository.findById(Number(request.user.sub));

        if (!user) {
            return response.send({ message: 'User not found.' }).status(401)
        }

        if (ADMIN_ROUTES.includes(request.routerPath) && user.role !== EnumRole.ADMIN) {
            return response.send({ message: 'User not authorized.' }).status(403)
        }
        
    }
}