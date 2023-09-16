import fastify from "fastify";
import { animalsRouter } from "./http/animals-router";
import { ZodError } from "zod";
import jwt from '@fastify/jwt';
import cors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import { env } from "./env";
import { postsRouter } from "./http/posts-routes";
import { authRoutes } from "./http/auth-router";
import WebSocket, { WebSocketServer } from 'ws';

const app = fastify()
const wss = new WebSocketServer({ host: '0.0.0.0', port: 9000 });

app.register(fastifyMultipart, {
    limits: {
        fileSize: 100 ** 10
    }
})

app.register(jwt, {
    secret: "26452948404D635166546A576D5A7134743777217A25432A462D4A614E645267",
});

app.addHook('preHandler', async (request) => {
    if (request.routerPath !== "/api/auth/register") {
        await request.jwtVerify();
    }
});

app.register(authRoutes, {
    prefix: "api/"
})

app.register(animalsRouter, {
    prefix: "api/"
})

app.register(postsRouter, {
    prefix: "api/"
})

app.register(cors, { origin: true });

app.setErrorHandler((error, _, res) => {
    if (error instanceof ZodError) {
      return res
        .status(422)
        .send({ message: 'Validation error.', issues: error.format() })
    }

    if (error.code === "FST_JWT_NO_AUTHORIZATION_IN_HEADER") {
        return res.status(401).send({ message: 'Please, send a valid token.' })
    }

    if (error.code === "FST_INVALID_MULTIPART_CONTENT_TYPE") {
        return res.status(406).send({ message: 'Please, use a form-data multipart.' })
    }

    return res.status(500).send({ message: 'Internal server error.' })
});

app.listen({
    host: "0.0.0.0",
    port: env.PORT
}).then(server => { 
    wss.on('connection', function connection(ws) {
        console.log("oi")
        
        ws.on('error', console.error);
        
        ws.on('message', function message(data, isBinary) {
            wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
            });
        });
    });

    console.log(`HTTP server running at ${server}`)
    console.log(`WS server running at ${server}`)
});
