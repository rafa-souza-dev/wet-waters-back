import {
    it,
    describe,
    expect
} from 'vitest'
import { InMemoryData } from '../../@types/in-memory-data'
import { ThreatCausesInMemoryRepository } from '../../repository/in-memory/threat-causes-in-memory-repository'
import { FindAllThreatCausesUseCase } from './find-all-threat-causes-use-case'

describe('Find All Threat Causes Use Case', () => {
    it('should be able to find all threat causes', async () => {
        const data: InMemoryData = {
            animals: [],
            likes: [],
            posts: [],
            users: [],
            threat_causes: [
                {
                    id: 1,
                    description: 'Poluição'
                },
                {
                    id: 2,
                    description: 'Desmatamento'
                },
                {
                    id: 3,
                    description: 'Alterações Climáticas'
                },
            ],
        }

        const threatCausesRepository = new ThreatCausesInMemoryRepository(data)
        const useCase = new FindAllThreatCausesUseCase(threatCausesRepository)

        const { threat_causes } = await useCase.handle()

        expect(threat_causes.length).toBe(3)
        expect(threat_causes[0].id).toBe(1)
        expect(threat_causes[1].id).toBe(2)
        expect(threat_causes[2].id).toBe(3)
        expect(threat_causes[0].description).toBe('Poluição')
        expect(threat_causes[1].description).toBe('Desmatamento')
        expect(threat_causes[2].description).toBe('Alterações Climáticas')
    })
})
