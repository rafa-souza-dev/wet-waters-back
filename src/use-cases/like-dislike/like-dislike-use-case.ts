import { ILikesRepository } from "../../repository/i-likes-repository";
import { IPostsRepository } from "../../repository/i-posts-repository";
import { IUsersRepository } from "../../repository/i-users-repository";
import { PostNotFoundError, UserNotFoundError } from "../global-errors";
import { LikeDislikeUseCaseRequest, LikeDislikeUseCaseResponse } from "./dtos";
import { AuthorCannotLikeYourPostError } from "./errors";
import { ws } from "../../infra/ws"

export class LikeDislikeUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private postsRepository: IPostsRepository,
        private likesRepository: ILikesRepository
    ) {}

    async handle({
        postId,
        userId
    }: LikeDislikeUseCaseRequest): Promise<LikeDislikeUseCaseResponse> {
        console.log("caso de uso")

        const post = await this.postsRepository.findById(postId)

        if (!post) {
            throw new PostNotFoundError()
        }

        if (userId === post.user_id) {
            throw new AuthorCannotLikeYourPostError()
        }

        const user = await this.usersRepository.findById(userId)

        if (!user) {
            throw new UserNotFoundError()
        }

        const userFishCoins = user.point ?? 0

        const isLiked = !!(await this.likesRepository.find(userId, postId))

        if (isLiked) {
            ws.send(JSON.stringify({
                userId: post.user_id!,
                points: -5
            }), (error) => { console.log(error) })

            await this.usersRepository.update(post.user_id!, {
                point: userFishCoins - 5
            })

            await this.likesRepository.delete(userId, postId)

            return { isLiked }
        }

        await this.likesRepository.create({
            post_id: postId,
            user_id: userId
        })

        ws.send(JSON.stringify({
            userId: post.user_id!,
            points: 5
        }), (error) => { console.log(error) })

        await this.usersRepository.update(post.user_id!, {
            point: userFishCoins + 5
        })

        return { isLiked }
    }
}
