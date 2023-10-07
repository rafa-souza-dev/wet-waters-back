import { IPostsRepository } from "../../repository/i-posts-repository";
import { IUsersRepository } from "../../repository/i-users-repository";
import { PostNotFoundError, UserNotFoundError } from "../global-errors";
import { ValidatePostUseCaseRequest, ValidatePostUseCaseResponse } from "./dtos";

export class ValidatePostUseCase {
    constructor(
        private postsRepository: IPostsRepository,
        private usersRepository: IUsersRepository
    ) {}

    async handle({
        postId,
        isValid,
        points=0
    }: ValidatePostUseCaseRequest): Promise<ValidatePostUseCaseResponse> {
        const post = await this.postsRepository.findById(postId)

        if (!post) {
            throw new PostNotFoundError()
        }

        const user = await this.usersRepository.findById(post.user_id)

        if (!user) {
            throw new UserNotFoundError()
        }

        if (isValid) {
            await this.postsRepository.update(postId, { published_at: new Date() })
            await this.usersRepository.update(user.id, {
                point: user.point + points
            })

            return;
        }

        await this.postsRepository.delete(postId)
    }
}
