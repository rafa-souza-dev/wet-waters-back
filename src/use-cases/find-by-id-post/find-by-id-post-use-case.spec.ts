import {
    describe, 
    it,
    expect,
    beforeEach 
} from "vitest";
import { InMemoryData } from "../../@types/in-memory-data";
import { IPostsRepository } from "../../repository/i-posts-repository";
import { FindByIdPostUseCase } from "./find-by-id-post-use-case";
import { PostsInMemoryRepository } from "../../repository/in-memory/posts-in-memory-repository";
import { ErrorPostNotExists } from "./erros";

let data: InMemoryData
let postsRepository: IPostsRepository
let useCase: FindByIdPostUseCase

beforeEach(() => {
    data = {
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

    postsRepository = new PostsInMemoryRepository(data)
    useCase = new FindByIdPostUseCase(postsRepository)
})

describe('Find By ID Post Use Case', () => {
    it('should be able to find a post by id', async () => {
        const { post } = await useCase.handle({ postId: 1 })

        expect(post.id).toBe(1)
        expect(post.title).toBe('Post 1')
    })

    it('should not be able to find nonexistent post by id', async () => {
        await expect(() => (
            useCase.handle({ postId: 3 })
        )).rejects.toBeInstanceOf(ErrorPostNotExists)
    })
})
