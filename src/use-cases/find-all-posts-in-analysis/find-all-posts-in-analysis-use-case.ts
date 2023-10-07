import { IPostsRepository } from "../../repository/i-posts-repository";
import { FindAllPostsInAnalysisUseCaseResponse } from "./dtos";

export class FindAllPostsInAnalysisUseCase {
    constructor(private postsRepository: IPostsRepository) {}

    async handle(): Promise<FindAllPostsInAnalysisUseCaseResponse> {
        const posts = await this.postsRepository.findAllPostInAnalysis();

        return {posts};
    }
}