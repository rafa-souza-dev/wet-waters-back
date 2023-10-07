export interface ValidatePostUseCaseRequest {
    postId: number
    isValid: boolean
    points?: number
}

export type ValidatePostUseCaseResponse = void
