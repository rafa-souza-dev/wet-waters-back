import { Post } from "@prisma/client";

export interface FindAllPostsInAnalysisUseCaseResponse {
    posts: Post[]
}