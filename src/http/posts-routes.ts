import { FastifyInstance } from "fastify";
import { createPostController } from "./controllers/posts/create-post-controller";
import { findAllPostsController } from "./controllers/posts/find-all-posts-controller";
import { findByIdPostController } from "./controllers/posts/find-by-id-post-controller";
import { filterManyByTitleController } from "./controllers/posts/filter-many-by-title-controller";
import { likeDislikeController } from "./controllers/posts/like-dislike-controller";
import { findAllPostsInAnalysisController } from "./controllers/posts/find-all-posts-in-analysis-controller";
import { validatePostController } from "./controllers/posts/validate-post-controller";

export async function postsRouter(app: FastifyInstance) {
    app.get('/v1/posts', findAllPostsController);

    app.get('/v1/posts/analysis', findAllPostsInAnalysisController)

    app.get('/v1/posts/:id', findByIdPostController);

    app.get<{Querystring: {title: string}}>('/v1/posts/search', filterManyByTitleController);

    app.post('/v1/posts', createPostController)

    app.post('/v1/posts/:id/likes', likeDislikeController)

    app.put('/v1/posts/:id/validate', validatePostController)
}
