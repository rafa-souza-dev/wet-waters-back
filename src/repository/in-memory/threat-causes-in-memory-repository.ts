import { InMemoryData } from "../../@types/in-memory-data";
import { IInMemoryRepository } from "../i-in-memory-repository";
import { IThreatCausesRepository } from "../i-threat-causes-repository";

export class ThreatCausesInMemoryRepository implements IThreatCausesRepository, IInMemoryRepository {
    constructor(
        readonly data: InMemoryData
    ) {}

    async findAll() {
        return this.data.threat_causes
    }
}
