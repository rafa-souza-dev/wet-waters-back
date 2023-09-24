import { Threat_cause } from "@prisma/client";

export interface FindAllThreatCausesUseCaseResponse {
    threat_causes: Threat_cause[]
}
