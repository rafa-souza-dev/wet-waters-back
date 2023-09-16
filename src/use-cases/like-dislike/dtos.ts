export interface LikeDislikeUseCaseRequest {
    userId: number
    postId: number
}

export interface LikeDislikeUseCaseResponse {
    isLiked: boolean
}
