import { User } from "@prisma/client"

export interface FindUserByIdUseCaseRequest {
    userId: number
}

export interface FindUserByIdUseCaseResponse {
    user: User
}
