import { IPostsRepository } from "../../repository/i-posts-repository";
import { FindAllPostsUseCaseResponse } from "./dtos";

export class FindAllPostsUseCase {
    constructor(private postRepository: IPostsRepository) { }

    async handle(): Promise<FindAllPostsUseCaseResponse> {
        const posts = await this.postRepository.findAll();

        return { posts };
    }
}