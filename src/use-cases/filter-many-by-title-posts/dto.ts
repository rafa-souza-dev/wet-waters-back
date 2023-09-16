import { Post } from "@prisma/client";

export interface FilterManyByTitleUseCaseRequest {
    title: string;
}

export interface FilterManyByTitleUseCaseResponse {
    posts: Post[];
}