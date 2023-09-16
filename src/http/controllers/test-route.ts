import { FastifyReply, FastifyRequest } from "fastify";

export async function testRoute(_: FastifyRequest, res: FastifyReply) {
    return res.send({
        message: "Hello World!"
    }).status(200)
}
