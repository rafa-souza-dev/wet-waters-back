import { User } from "@prisma/client";

export interface SignUseCaseRequest {
    code: string;
}

export interface SignUseCaseResponse {
    user: User;
}