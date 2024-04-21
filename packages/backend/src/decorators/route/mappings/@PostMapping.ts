import type { RouteHandler } from "@internal";
import { Route } from "@internal";
import type { SwaggerPath } from "@types";

export function PostMapping<This, Fn extends RouteHandler>(
  path: string = "",
  swagger?: SwaggerPath,
) {
  return Route<This, Fn>({
    method: "post",
    path,
    swagger,
  });
}
