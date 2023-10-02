import { IUsersRepository } from "../../repository/i-users-repository";
import { SignUseCaseRequest, SignUseCaseResponse } from "./dtos";
import { getAccessToken } from "../../infra/github/access-token";
import { getProfile } from "../../infra/github/profile";

export class SignUseCase {
    constructor(private userRepository: IUsersRepository) {}

    async handle({ code }: SignUseCaseRequest): Promise<SignUseCaseResponse> {
        const access_token = await getAccessToken(code)
        const userInfo = await getProfile(access_token)

        let user = await this.userRepository.findByGithubId(userInfo.id.toString());

        if(!user) {
            user = await this.userRepository.create({
                username: userInfo.login, github_id: userInfo.id.toString(), avatar_url: userInfo.avatar_url,
                point: 0,
                role: "USER",
            })
        }

        return { user };
    }
}
