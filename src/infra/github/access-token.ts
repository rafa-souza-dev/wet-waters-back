import axios from "axios";
import { env } from "../../env";

export async function getAccessToken(code: string) {
    const accessTokenResponse = await axios.post(
        "https://github.com/login/oauth/access_token",
        null,
        {
            params: {
                client_id: env.GITHUB_CLIENT_ID,
                client_secret: env.GITHUB_CLIENT_SECRET,
                code
            },
            headers: {
                Accept: "application/json"
            }
        }
    );

    const { access_token } = accessTokenResponse.data;
    
    return access_token
}
