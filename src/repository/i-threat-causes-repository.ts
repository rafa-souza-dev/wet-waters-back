import { Threat_cause } from "@prisma/client";

export interface IThreatCausesRepository {
    findAll: () => Promise<Threat_cause[]>
}
