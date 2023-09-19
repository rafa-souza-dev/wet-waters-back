import { MultipartFile } from "@fastify/multipart"
import { generateFileNameWithExtension, generateRandomFileName } from "../../utils/file"
import { supabase } from "./client"

export async function persistMultipartImage(bucketName: string, dirName: string, fileData: MultipartFile) {
    const fileName = generateFileNameWithExtension(fileData.mimetype)

    await supabase.storage.from(bucketName).upload(`${dirName}/${fileName}`, fileData.file, {
        duplex: 'half',
        contentType: fileData.mimetype
    })
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })

    const imageBasePath = `https://ypohusdowusoohwgyplu.supabase.co/storage/v1/object/public/${bucketName}/${dirName}/`

    return imageBasePath + fileName
}

export async function persistBase64Image(bucketName: string, dirName: string, fileBase64Data: string) {
    const imageData = Buffer.from(fileBase64Data, "base64")
    const fileName = generateRandomFileName()

    await supabase.storage.from(bucketName).upload(`${dirName}/${fileName}`, imageData, {
        duplex: 'half',
        contentType: "jpeg"
    })
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })

    const imageBasePath = `https://ypohusdowusoohwgyplu.supabase.co/storage/v1/object/public/${bucketName}/${dirName}/`

    return imageBasePath + fileName
}
