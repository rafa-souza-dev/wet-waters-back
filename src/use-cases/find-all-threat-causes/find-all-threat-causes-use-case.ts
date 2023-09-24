import { IThreatCausesRepository } from "../../repository/i-threat-causes-repository";
import { FindAllThreatCausesUseCaseResponse } from "./dtos";

export class FindAllThreatCausesUseCase {
    constructor(
        private threatCausesRepository: IThreatCausesRepository
    ) {}

    async handle(): Promise<FindAllThreatCausesUseCaseResponse> {
        const threat_causes = await this.threatCausesRepository.findAll()

        return { threat_causes }
    }
}
