export class ErrorAnimalAlreadyExists extends Error {
    constructor() {
        super("Animal already exists!")
    }
}