export class PostNotFoundError extends Error {
    constructor() {
        super('Post not found.')
    }
}

export class UserNotFoundError extends Error {
    constructor() {
        super('User not found.')
    }
}
