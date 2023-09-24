import {
    it,
    describe,
    expect
} from 'vitest'
import { InMemoryData } from '../../@types/in-memory-data'
import { PostsInMemoryRepository } from '../../repository/in-memory/posts-in-memory-repository'
import { FindAllPostsUseCase } from './find-all-posts-use-case'

describe('Find All Posts Use Case', () => {
    it('should be able to find all posts', async () => {
        const data: InMemoryData = {
            animals: [],
            likes: [],
            threat_causes: [],
            users: [],
            posts: [
                {
                    id: 1,
                    description: '',
                    published_at: new Date(),
                    title: 'Post 1',
                    url_image: '',
                    user_id: 1
                },
                {
                    id: 2,
                    description: '',
                    published_at: new Date(),
                    title: 'Post 2',
                    url_image: '',
                    user_id: 1
                },
            ],
        }

        const postsRepository = new PostsInMemoryRepository(data)
        const useCase = new FindAllPostsUseCase(postsRepository)

        const { posts } = await useCase.handle()

        expect(posts.length).toBe(2)
        expect(posts[0].title).toBe('Post 1')
        expect(posts[1].title).toBe('Post 2')
    })
})
