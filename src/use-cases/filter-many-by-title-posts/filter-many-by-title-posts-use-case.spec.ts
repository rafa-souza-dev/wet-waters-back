import {
    it,
    describe,
    expect,
    beforeEach
} from 'vitest'
import { IPostsRepository } from '../../repository/i-posts-repository'
import { InMemoryData } from '../../@types/in-memory-data'
import { FilterManyByTitlePostsUseCase } from './filter-many-by-title-posts-use-case'
import { PostsInMemoryRepository } from '../../repository/in-memory/posts-in-memory-repository'

let postsRepository: IPostsRepository
let data: InMemoryData
let useCase: FilterManyByTitlePostsUseCase

beforeEach(() => {
    data = {
        users: [],
        animals: [],
        likes: [],
        threat_causes: [],
        posts: [
            {
                id: 1,
                description: '',
                published_at: new Date(),
                title: 'Post de teste 1',
                url_image: '',
                user_id: 1
            },
            {
                id: 2,
                description: '',
                published_at: new Date(),
                title: 'Post de teste 2',
                url_image: '',
                user_id: 1
            },
        ]
    }

    postsRepository = new PostsInMemoryRepository(data)
    useCase = new FilterManyByTitlePostsUseCase(postsRepository)
})

describe('Filter Many By Title Posts Use Case', () => {
    it('should be able to filter many by title posts', async () => {
        const { posts } = await useCase.handle({ title: 'teste' })

        expect(posts.length).toBe(2)
    })

    it('should be able to filter many by case insensitive title posts', async () => {
        const { posts } = await useCase.handle({ title: 'TESTE' })

        expect(posts.length).toBe(2)
    })

    it('should not be able to filter many by unused title posts', async () => {
        const { posts } = await useCase.handle({ title: 'rafira' })

        expect(posts.length).toBe(0)
    })
})
