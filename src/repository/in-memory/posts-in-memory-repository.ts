import { Prisma } from "@prisma/client";
import { InMemoryData } from "../../@types/in-memory-data";
import { IPostsRepository } from "../i-posts-repository";
import { IInMemoryRepository } from "../i-in-memory-repository";

export class PostsInMemoryRepository implements IPostsRepository, IInMemoryRepository {
    constructor(
        readonly data: InMemoryData
    ) {}

    async create(postDto: Prisma.PostUncheckedCreateInput) {
        const id = this.data.posts.length + 1

        this.data.posts.push({
            id: id,
            description: postDto.description,
            published_at: postDto.published_at === undefined ? null : new Date(postDto.published_at!),
            title: postDto.title,
            url_image: postDto.url_image === undefined ? null : postDto.url_image,
            user_id: postDto.user_id
        })
        
        return this.data.posts[id - 1]
    }

    async delete(postId: number) {
        this.data.posts = this.data.posts.filter(post => post.id !== postId)
    }

    async filterManyByTitle(title: string) {
        return this.data.posts.filter(post => post.title.toUpperCase().includes(title.toUpperCase()))
    }

    async findAll() {
        return this.data.posts
    }

    async findById(postId: number) {
        return this.data.posts.find(post => post.id === postId) || null
    }

    async update(postId: number, data: Prisma.PostUncheckedUpdateInput) {
        const posts = this.data.posts
        const post = posts[postId - 1]

        post.description = data.description ? String(data.description) : post.description
        post.published_at = data.published_at ? new Date(String(data.published_at)) : post.published_at
        post.title = data.title ? String(data.title) : post.title
        post.url_image = data.url_image ? String(data.url_image) : post.url_image

        this.data.posts[postId - 1] = post

        return post
    }

    async findAllPostInAnalysis() {
        return this.data.posts.filter(post => post.published_at === null)
    }
}
