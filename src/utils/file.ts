import { randomBytes } from "crypto";

export function generateFileNameWithExtension(mimetype: string) {
    return randomBytes(10).toString('hex') + "." + mimetype.slice(6)
}

export function generateRandomFileName() {
    return randomBytes(10).toString('hex') + "." + "jpeg"
}
