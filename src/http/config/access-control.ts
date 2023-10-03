import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "../../repository/prisma/prisma-users-repository";
import { EnumRole } from "@prisma/client";

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

  permissionAll("/api/auth/register");
  permission("/api/v1/animals", ["ADMIN"], ["POST"]);
  permission("/api/v2/animals", ["ADMIN"], ["POST"]);

  function permission(
    route: string,
    roles: EnumRole[],
    _methods: MethodHTTP[] = METHODS
  ) {
    const routeRegExp = new RegExp("^" + route.replaceAll("/**", "(/w)?"));

    if (
      routeRegExp.test(request.routerPath) &&
      _methods.includes(request.routerMethod as MethodHTTP) &&
      !roles.includes(request.user.role)
    ) {
      return response.send({ message: "User not authorized." }).status(403);
    }
  }

  async function permissionAll(route: string) {
    const routeRegExp = new RegExp("^" + route.replaceAll("/**", "(/w)?"));
    if (!routeRegExp.test(request.routerPath)) {
      await request.jwtVerify();
      const repository = new PrismaUsersRepository();
      const user = await repository.findById(Number(request.user.sub));

      if (!user) {
        return response.send({ message: "User not found." }).status(401);
      }
    }
  }
};
