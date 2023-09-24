import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaThreatCausesRepository } from "../../../repository/prisma/prisma-threat-causes-repository";
import { FindAllThreatCausesUseCase } from "../../../use-cases/find-all-threat-causes/find-all-threat-causes-use-case";

export async function findAllThreatCausesController(_: FastifyRequest, res: FastifyReply) {
    const threatCausesRepository = new PrismaThreatCausesRepository()
    const findAllThreatCausesUseCase = new FindAllThreatCausesUseCase(threatCausesRepository)

    const { threat_causes } = await findAllThreatCausesUseCase.handle()

    return res.send({ threat_causes }).status(200)
}
