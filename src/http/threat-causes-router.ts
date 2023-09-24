import { FastifyInstance } from "fastify";
import { findAllThreatCausesController } from "./controllers/threat-causes/find-all-threat-causes-controller";

export async function threatCausesRouter(app: FastifyInstance) {
    app.get('/v1/threat-causes', findAllThreatCausesController);
}
