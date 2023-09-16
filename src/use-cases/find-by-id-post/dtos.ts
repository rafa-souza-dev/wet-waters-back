import { Post } from "@prisma/client";

export interface FindByIdPostUseCaseRequest {
    postId: number;
}

export interface FindByIdPostUseCaseResponse {
    post: Post;
}