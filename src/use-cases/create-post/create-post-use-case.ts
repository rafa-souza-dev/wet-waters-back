import { IPostsRepository } from "../../repository/i-posts-repository";
import { CreatePostUseCaseRequest, CreatePostUseCaseResponse } from "./dto";
import { ErrorUserNotFound } from "./erros";
import { supabase } from "../../infra/supabase";
import { generateFileName, generateRandomFileName } from "../../utils/file";
import { IUsersRepository } from "../../repository/i-users-repository";

export class CreatePostUseCase {
    constructor(private postRepository: IPostsRepository, private usersRepository: IUsersRepository) {}

    async handle({ description, image, title, userId }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {

        const userExists = !!(await this.usersRepository.findById(userId));

        if (!userExists) {
            throw new ErrorUserNotFound();
        }

        const url_image = await this.persistBase64Image(image)


        const post = await this.postRepository.create({description, url_image, title, user_id: userId });
        return {
            post
        }
    }

    private async persistBase64Image(fileBase64Data: string) {
        const imageData = Buffer.from(fileBase64Data, "base64")
        const fileName = generateRandomFileName()

        await supabase.storage.from("balde-de-agua").upload(`posts/${fileName}`, imageData, {
            duplex: 'half',
            contentType: "jpeg"
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })

        const imageBasePath = "https://ypohusdowusoohwgyplu.supabase.co/storage/v1/object/public/balde-de-agua/posts/"

        return imageBasePath + fileName
    }
}