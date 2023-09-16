import { IUsersRepository } from "../../repository/i-users-repository";
import { UserNotFoundError } from "../global-errors";
import { FindUserByIdUseCaseRequest, FindUserByIdUseCaseResponse } from "./dtos";

export class FindUserByIdUseCase {
    constructor(
        private usersRepository: IUsersRepository
    ) {}

    async handle({ userId }: FindUserByIdUseCaseRequest): Promise<FindUserByIdUseCaseResponse> {
        const user = await this.usersRepository.findById(userId)

        if (!user) {
            throw new UserNotFoundError()
        }

        return { user }
    }
}
