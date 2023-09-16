import { FastifyInstance } from "fastify";
import { signController } from "./controllers/auth/sign-controller";
import { profile } from "./controllers/auth/profile";

export async function authRoutes(app: FastifyInstance) {
    app.post("/auth/register", async (register, response) => {
        const { user } = await signController(register, response);

        const token = app.jwt.sign({
            name: user.username,
            avatarUrl: user.avatar_url,
            role: user.role,
        }, {
            sub: user.id.toString(),
            expiresIn: "30 days",
        });

        return response.send({ token });
    });

    app.get("/auth/me", profile)
}
