import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaUsersRepository } from "../../../repository/prisma/prisma-users-repository";
import { SignUseCase } from "../../../use-cases/sign/sign-use-case";

export async function signController(request: FastifyRequest, response: FastifyReply) {
        const bodyShema = z.object({
            code: z.string()
        });

        const { code } = bodyShema.parse(request.body);

        const prismaUsersRepository = new PrismaUsersRepository();
        const signUseCase = new SignUseCase(prismaUsersRepository);

        const { user } = await signUseCase.handle({ code });

        return { user };
    }