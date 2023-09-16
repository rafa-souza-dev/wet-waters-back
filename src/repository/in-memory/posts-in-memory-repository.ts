import { Prisma } from "@prisma/client";
import { InMemoryData } from "../../@types/in-memory-data";
import { IPostsRepository } from "../i-posts-repository";
import { IInMemoryRepository } from "../i-in-memory-repository";

export class PostsInMemoryRepository implements IPostsRepository, IInMemoryRepository {
    constructor(
        readonly data: InMemoryData
    ) {}

    async create(postDto: Prisma.PostUncheckedCreateInput) {
        this.data.posts.push({
            id: this.data.posts.length + 1,
            description: postDto.description,
            published_at: postDto.published_at === undefined ? null : new Date(postDto.published_at!),
            title: postDto.title,
            url_image: postDto.url_image === undefined ? null : postDto.url_image,
            user_id: postDto.user_id === undefined ? null : postDto.user_id
        })
        
        return this.data.posts[this.data.posts.length]
    }

    async delete(postId: number) {
        this.data.posts = this.data.posts.filter(post => post.id !== postId)
    }

    async filterManyByTitle(title: string) {
        return this.data.posts.filter(post => post.title.includes(title))
    }

    async findAll() {
        return this.data.posts
    }

    async findById(postId: number) {
        return this.data.posts.find(post => post.id === postId) || null
    }
}
