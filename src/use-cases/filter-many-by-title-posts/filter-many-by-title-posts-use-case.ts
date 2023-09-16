import { IPostsRepository } from "../../repository/i-posts-repository";
import { FilterManyByTitleUseCaseRequest, FilterManyByTitleUseCaseResponse } from "./dto";

export class FilterManyByTitlePostsUseCase {
    constructor(private postsRepository: IPostsRepository) {}

    async handle({ title }: FilterManyByTitleUseCaseRequest): Promise<FilterManyByTitleUseCaseResponse> {
        const posts = await this.postsRepository.filterManyByTitle(title);
        
        return { posts };

        
    }
}