import {
    it,
    describe,
    expect,
    vi,
    beforeEach,
    afterEach
} from 'vitest'
import { InMemoryData } from '../../@types/in-memory-data'
import { IAnimalsRepository } from '../../repository/i-animals-repository'
import { CreateAnimalUseCase } from './create-animal-use-case'
import { AnimalsInMemoryRepository } from '../../repository/in-memory/animals-in-memory-repository'
import { persistBase64Image, persistMultipartImage } from '../../infra/supabase/upload'
import { ErrorAnimalAlreadyExists } from './errors'
import { BusboyFileStream } from "@fastify/busboy"

let data: InMemoryData
let animalsRepository: IAnimalsRepository
let useCase: CreateAnimalUseCase

const { mockedPersistBase64Image, mockedPersistMultipartImage } = vi.hoisted(() => {
    return { mockedPersistBase64Image: vi.fn(), mockedPersistMultipartImage: vi.fn() }
})
  
vi.mock('../../infra/supabase/upload', () => {
    return {
        persistBase64Image: mockedPersistBase64Image,
        persistMultipartImage: mockedPersistMultipartImage
    }
})

describe('Create Animal Use Case', () => {
    beforeEach(() => {
        data = {
            animals: [],
            likes: [],
            posts: [],
            threat_causes: [],
            users: []
        }

        animalsRepository = new AnimalsInMemoryRepository(data)
        useCase = new CreateAnimalUseCase(animalsRepository)

        mockedPersistBase64Image.mockReturnValue("https://github.com/rafa-souza-dev.png")
        mockedPersistMultipartImage.mockReturnValue("https://github.com/rafa-souza-dev.png")
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('should be able to create a animal using base64 image', async () => {
        const { animal } = await useCase.handle({
            conservation_status: 'VULNERABLE',
            ecological_function: '',
            fileData: '',
            name: 'Tubarão Martelo',
            size: 250,
            specie_name: 'Tubaralis Martelis',
            threat_causes: ['poluição', 'alterações climáticas']
        })

        expect(animal.id).toBe(1)
        expect(animal.name).toBe('Tubarão Martelo')
        expect(animal.size).toBe(250)
        expect(animal.specie_name).toBe('Tubaralis Martelis')
        expect(animal.url_image).toBe('https://github.com/rafa-souza-dev.png')
        expect(persistBase64Image).toHaveBeenCalledTimes(1)
    })

    it('should be able to create a animal using multipart image', async () => {
        const { animal } = await useCase.handle({
            conservation_status: 'VULNERABLE',
            ecological_function: '',
            fileData: {
                type: 'file',
                encoding: '',
                fieldname: '',
                fields: {},
                file: {} as BusboyFileStream,
                filename: '',
                mimetype: '',
                toBuffer: async () => Buffer.from('')
            },
            name: 'Tubarão Martelo',
            size: 250,
            specie_name: 'Tubaralis Martelis',
            threat_causes: ['poluição', 'alterações climáticas']
        })

        expect(animal.id).toBe(1)
        expect(animal.name).toBe('Tubarão Martelo')
        expect(animal.size).toBe(250)
        expect(animal.specie_name).toBe('Tubaralis Martelis')
        expect(animal.url_image).toBe('https://github.com/rafa-souza-dev.png')
        expect(persistMultipartImage).toHaveBeenCalledTimes(1)
    })

    it('should not be able to create a animal with exists specie', async () => {
        await useCase.handle({
            conservation_status: 'VULNERABLE',
            ecological_function: '',
            fileData: '',
            name: 'Tubarão Martelo',
            size: 250,
            specie_name: 'Tubaralis Martelis',
            threat_causes: ['poluição', 'alterações climáticas']
        })

        await expect(() =>
            useCase.handle({
                conservation_status: 'VULNERABLE',
                ecological_function: '',
                fileData: '',
                name: 'Gato de Ouro',
                size: 80,
                specie_name: 'Tubaralis Martelis',
                threat_causes: ['poluição', 'alterações climáticas']
            }),
        ).rejects.toBeInstanceOf(ErrorAnimalAlreadyExists)
    })
})
