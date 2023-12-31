import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../prisma";
import { IPostsRepository } from "../i-posts-repository";
import { isDate } from "util/types";

export class PrismaPostsRepository implements IPostsRepository {

    async findAll(): Promise<Post[]> {
        const posts = await prisma.post.findMany({
            where: {
                NOT: {
                    published_at: null
                }
            },
            include: {
                user: true,
                likes: true,
                _count: {
                    select: {
                        likes: true
                    }
                }
            }
        });

        return posts;
    }

    async findAllPostInAnalysis(): Promise<Post[]> {
        const posts = await prisma.post.findMany({
            where: {
                published_at: null
            }
        })

        return posts;
    }

    async findById(postId: number): Promise<Post | null> {
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                user: true,
                _count: {
                    select: {
                        likes: true
                    }
                }
            }
        });

        return post;
    }

    async filterManyByTitle(title: string): Promise<Post[]> {
        const posts = await prisma.post.findMany({
            where: {
                title: {
                    contains: title,
                    mode: "insensitive"
                }
            }, include: {
                user: true,
                _count: {
                    select: {
                        likes: true
                    }
                }
            }
        });

        return posts;
    }

    async create(postDto: Prisma.PostUncheckedCreateInput): Promise<Post> {
        const post = await prisma.post.create({
            data: postDto,
            include: {
                user: true,
                _count: {
                    select: {
                        likes: true
                    }
                }
            }
        });

        return post;
    }

    async delete(postId: number): Promise<void> {
        await prisma.post.delete({
            where: {
                id: postId
            }
        });
    }

    async update(postId: number, data: Prisma.PostUncheckedUpdateInput) {
        const post = await prisma.post.update({
            where: {
                id: postId
            },
            data
        })

        return post
    }
}
