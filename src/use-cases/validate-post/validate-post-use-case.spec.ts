import {
    it,
    describe,
    beforeEach,
    expect
} from 'vitest'
import { InMemoryData } from '../../@types/in-memory-data'
import { ValidatePostUseCase } from './validate-post-use-case'
import { PostsInMemoryRepository } from '../../repository/in-memory/posts-in-memory-repository'
import { UsersInMemoryRepository } from '../../repository/in-memory/users-in-memory-repository'
import { IPostsRepository } from '../../repository/i-posts-repository'
import { IUsersRepository } from '../../repository/i-users-repository'

let data: InMemoryData
let useCase: ValidatePostUseCase
let postsRepository: IPostsRepository
let usersRepository: IUsersRepository

beforeEach(() => {
    data = {
        animals: [],
        likes: [],
        threat_causes: [],
        users: [
            {
                id: 1,
                avatar_url: '',
                github_id: '',
                point: 100,
                role: 'USER',
                username: 'juvenal'
            },
        ],
        posts: [
            {
                id: 1,
                description: '',
                published_at: null,
                title: 'Post 1',
                url_image: '',
                user_id: 1
            }
        ],
    }

    usersRepository = new UsersInMemoryRepository(data)
    postsRepository = new PostsInMemoryRepository(data)
    useCase = new ValidatePostUseCase(postsRepository, usersRepository)
})

describe('Validate Post Use Case', () => {
    it('should be able to validate a post', async () => {
        const user = data.users[0]
        const post = data.posts[0]

        expect(user.point).toBe(100)
        expect(post.published_at).toBe(null)

        await useCase.handle({ postId: 1, isValid: true, points: 150 })

        expect(user.point).toBe(250)
        expect(post.published_at).toBeInstanceOf(Date)
    })

    it('should be able to reprove a post', async () => {
        const user = data.users[0]

        expect(user.point).toBe(100)

        await useCase.handle({ postId: 1, isValid: false, points: 0 })

        expect(user.point).toBe(100)
        expect(data.posts).empty
    })
})
