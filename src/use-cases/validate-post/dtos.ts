export interface ValidatePostUseCaseRequest {
    postId: number
    isValid: boolean
    points?: 0 | 100 | 150 | 200
}

export type ValidatePostUseCaseResponse = void
