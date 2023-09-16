import { IPostsRepository } from "../../repository/i-posts-repository";
import { FindByIdPostUseCaseRequest, FindByIdPostUseCaseResponse } from "./dtos";
import { ErrorPostNotExists } from "./erros";

export class FindByIdPostUseCase {
    constructor(private postsRepository: IPostsRepository) { }

    async handle({ postId }: FindByIdPostUseCaseRequest): Promise<FindByIdPostUseCaseResponse> {
        const post = await this.postsRepository.findById(postId);

        if (!post) {
            throw new ErrorPostNotExists();
        }

        return { post };
    }
}