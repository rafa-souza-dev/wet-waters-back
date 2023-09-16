import { Post, Prisma } from "@prisma/client";

export interface IPostsRepository {
    create: (postDto: Prisma.PostUncheckedCreateInput) => Promise<Post>;
    findAll: () => Promise<Post[]>;
    findById: (postId: number) => Promise<Post | null>;
    delete: (postId: number) => Promise<void>;
    filterManyByTitle: (title: string) => Promise<Post[]>;
}
