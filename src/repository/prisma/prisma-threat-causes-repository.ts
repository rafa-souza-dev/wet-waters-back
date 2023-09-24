import { prisma } from "../../prisma";
import { IThreatCausesRepository } from "../i-threat-causes-repository";

export class PrismaThreatCausesRepository implements IThreatCausesRepository {
    async findAll() {
        const threatCauses = await prisma.threat_cause.findMany()

        return threatCauses
    }
}
