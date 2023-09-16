export class ErrorUploadImage extends Error {
    constructor() {
        super("Error upload image!")
    }
}

export class ErrorUserNotFound extends Error {
    constructor() {
        super("User not found!")
    }
}