import { IPostsRepository } from "../../repository/i-posts-repository";
import { CreatePostUseCaseRequest, CreatePostUseCaseResponse } from "./dto";
import { ErrorUserNotFound } from "./erros";
import { IUsersRepository } from "../../repository/i-users-repository";
import { persistBase64Image } from "../../infra/supabase/upload";

export class CreatePostUseCase {
    constructor(private postRepository: IPostsRepository, private usersRepository: IUsersRepository) {}

    async handle({ description, image, title, userId }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
        const userExists = !!(await this.usersRepository.findById(userId));

        if (!userExists) {
            throw new ErrorUserNotFound();
        }

        const url_image = await persistBase64Image('posts', image)

        const post = await this.postRepository.create({description, url_image, title, user_id: userId });

        return { post }
    }
}