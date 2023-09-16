import {
    expect,
    it,
    describe,
    beforeEach
} from 'vitest'
import { InMemoryData } from '../../@types/in-memory-data'
import { UsersInMemoryRepository } from '../../repository/in-memory/users-in-memory-repository'
import { PostsInMemoryRepository } from '../../repository/in-memory/posts-in-memory-repository'
import { LikesInMemoryRepository } from '../../repository/in-memory/likes-in-memory-repository'
import { LikeDislikeUseCase } from './like-dislike-use-case'
import { AuthorCannotLikeYourPostError } from './errors'
import { PostNotFoundError, UserNotFoundError } from '../global-errors'

let data: InMemoryData
let useCase: LikeDislikeUseCase
let usersRepository: UsersInMemoryRepository
let postsRepository: PostsInMemoryRepository
let likesRepository: LikesInMemoryRepository

beforeEach(() => {
    data = {
        animals: [],
        threat_causes: [],
        users: [
            {
                id: 1,
                avatar_url: "",
                email: "juvenal@gmail.com",
                google_id: "",
                point: 0,
                username: "juvenal"
            },
            {
                id: 2,
                avatar_url: "",
                email: "joao@gmail.com",
                google_id: "",
                point: 0,
                username: "joao"
            },
        ],
        likes: [],
        posts: [
            {
               id: 1,
               description: "",
               published_at: new Date(),
               title: "Post de Teste",
               url_image: "",
               user_id: 2
            }
        ],
    }

    usersRepository = new UsersInMemoryRepository(data)
    postsRepository = new PostsInMemoryRepository(data)
    likesRepository = new LikesInMemoryRepository(data)
    useCase = new LikeDislikeUseCase(
        usersRepository,
        postsRepository,
        likesRepository
    )
})

describe("Like or dislike Use Case", () => {
    it("should be able to like a post", async () => {
        const { isLiked } = await useCase.handle({ postId: 1, userId: 1 })

        expect(isLiked).toBe(false)
        expect(data.likes.length).toBe(1)
    })

    it("should be able to add 5 points for publisher after gain a like", async () => {
        const { isLiked } = await useCase.handle({ postId: 1, userId: 1 })

        expect(isLiked).toBe(false)
        expect(data.likes.length).toBe(1)
        expect(data.users[0].point).toBe(5)
    })

    it("should be able to remove 5 points for publisher after delete a like", async () => {
        await useCase.handle({ postId: 1, userId: 1 })
        await useCase.handle({ postId: 1, userId: 1 })

        expect(data.users[0].point).toBe(0)
    })

    it("should not be able to like yourself post", async () => {
        await expect(() =>
            useCase.handle({ postId: 1, userId: 2 }),
        ).rejects.toBeInstanceOf(AuthorCannotLikeYourPostError)
    })

    it("should not be able to like a nonexistent post", async () => {
        await expect(() =>
            useCase.handle({ postId: 10, userId: 2 }),
        ).rejects.toBeInstanceOf(PostNotFoundError)
    })

    it("should not be able to like post with nonexistent user", async () => {
        await expect(() =>
            useCase.handle({ postId: 1, userId: 5 }),
        ).rejects.toBeInstanceOf(UserNotFoundError)
    })
})
