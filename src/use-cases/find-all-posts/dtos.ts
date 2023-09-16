import {  Post } from "@prisma/client";

export interface FindAllPostsUseCaseResponse {
    posts: Post[]
}