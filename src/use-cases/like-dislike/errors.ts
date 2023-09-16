export class AuthorCannotLikeYourPostError extends Error {
    constructor() {
        super('Author cannot like your post.')
    }
}
