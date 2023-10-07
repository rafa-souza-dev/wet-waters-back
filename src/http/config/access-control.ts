import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../repository/prisma/prisma-users-repository";
import { $Enums, EnumRole } from "@prisma/client";

type MethodHTTP =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE";
const METHODS: MethodHTTP[] = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "CONNECT",
  "OPTIONS",
  "TRACE",
];

export async function accessControl(
  request: FastifyRequest,
  response: FastifyReply
) {
  let user: { id: number; username: string; github_id: string; role: $Enums.EnumRole; point: number; avatar_url: string | null; } | null;
  if (request.routerPath !== "/api/auth/register") {
    await request.jwtVerify();
    const repository = new PrismaUsersRepository();
    user = await repository.findById(Number(request.user.sub));

    if (!user) {
      return response.send({ message: "User not found." }).status(401);
    }

    permission("/api/v1/animals", ["ADMIN"], ["POST"]);
    permission("/api/v2/animals", ["ADMIN"], ["POST"]);
    permission("/api/v1/posts/analysis", ["ADMIN"], ["GET"]);
    permission("/api/v1/posts/**/validate", ["ADMIN"], ["PUT"]);
  }
  
  function permission(
    route: string,
    roles: EnumRole[],
    _methods: MethodHTTP[] = METHODS
  ) {
    const routeRegExp = new RegExp("^" + route.replaceAll("/**", "(/w)?"));

    if (
      routeRegExp.test(request.routerPath) &&
      _methods.includes(request.routerMethod as MethodHTTP) &&
      !roles.includes(user!.role)
    ) {
      return response.send({ message: "User not authorized." }).status(403);
    }
  }
};
