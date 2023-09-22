import {
    it,
    describe,
    vi,
    expect,
    beforeEach,
    afterEach
} from 'vitest'
import { InMemoryData } from '../../@types/in-memory-data'
import { AnimalsInMemoryRepository } from '../../repository/in-memory/animals-in-memory-repository'
import { IAnimalsRepository } from '../../repository/i-animals-repository'
import { CreatePostUseCase } from './create-post-use-case'
import { IPostsRepository } from '../../repository/i-posts-repository'
import { PostsInMemoryRepository } from '../../repository/in-memory/posts-in-memory-repository'
import { IUsersRepository } from '../../repository/i-users-repository'
import { UsersInMemoryRepository } from '../../repository/in-memory/users-in-memory-repository'
import { UserNotFoundError } from '../global-errors'

const { mockedPersistBase64Image } = vi.hoisted(() => {
    return { mockedPersistBase64Image: vi.fn() }
})
  
vi.mock('../../infra/supabase/upload', () => {
    return {
        persistBase64Image: mockedPersistBase64Image,
    }
})

let data: InMemoryData
let postsRepository: IPostsRepository
let usersRepository: IUsersRepository
let useCase: CreatePostUseCase

beforeEach(() => {
    data = {
        animals: [],
        likes: [],
        posts: [],
        threat_causes: [],
        users: [
            {
                id: 1,
                avatar_url: '',
                github_id: '',
                point: 500,
                role: 'USER',
                username: 'juvenal'
            }
        ]
    }

    usersRepository = new UsersInMemoryRepository(data)
    postsRepository = new PostsInMemoryRepository(data)
    useCase = new CreatePostUseCase(postsRepository, usersRepository)

    mockedPersistBase64Image.mockReturnValue("https://github.com/rafa-souza-dev.png")
})

afterEach(() => {
    vi.restoreAllMocks()
})

describe('Create Post Use Case', () => {
    it('should be able to create a post', async () => {
        const { post } = await useCase.handle({
            userId: 1,
            description: 'unbelievable content',
            title: 'As Aventuras de Juvenal',
            image: ''
        })

        expect(post.id).toBe(1)
        expect(post.description).toBe('unbelievable content')
        expect(post.title).toBe('As Aventuras de Juvenal')
        expect(post.url_image).toBe("https://github.com/rafa-souza-dev.png")
        expect(post.user_id).toBe(1)
    })

    it('should not be able to create a post with nonexist user', async () => {
        await expect(() => (
            useCase.handle({
                userId: 2,
                title: 'As Aventuras de Pi',
                description: 'filme bom!',
                image: 'dqsokdqoksdqsopdqso'
            })
        )).rejects.toBeInstanceOf(UserNotFoundError)
    })
})
