import { FastifyInstance } from "fastify";
import { testRoute } from "./controllers/test-route";
import { findAllAnimalsController } from "./controllers/animals/find-all-animals-controller";
import { findByIdAnimalController } from "./controllers/animals/find-by-id-animal-controller";
import { createAnimalController } from "./controllers/animals/create-animal-controller";
import { createAnimalV2Controller } from "./controllers/animals/create-animal-v2-controller";

export async function animalsRouter(app: FastifyInstance) {
    app.get('/', testRoute);

    app.get('/v1/animals', findAllAnimalsController);

    app.get('/v1/animals/:id', findByIdAnimalController);

    app.post('/v1/animals', createAnimalController);

    app.post('/v2/animals', createAnimalV2Controller);
}
