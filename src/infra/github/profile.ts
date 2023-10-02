import axios from "axios";
import { z } from "zod";

export async function getProfile(access_token: string) {
    const userResponse = await axios.get('https://api.github.com/user', {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });

    const userSchema = z.object({
        id: z.number(),
        login: z.string(),
        name: z.string(),
        avatar_url: z.string().url()
    });

    const userInfo = userSchema.parse(userResponse.data);

    return userInfo
}
