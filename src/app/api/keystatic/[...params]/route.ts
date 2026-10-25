import { makeRouteHandler } from "@keystatic/next/route-handler";

import { isKeystaticEnabled } from "@/server/keystatic/access";

import config from "../../../../../keystatic.config";

const handlers = makeRouteHandler({ config });

function notFoundResponse() {
  return new Response(null, { status: 404 });
}

export function GET(request: Request) {
  return isKeystaticEnabled()
    ? handlers.GET(request)
    : Promise.resolve(notFoundResponse());
}

export function POST(request: Request) {
  return isKeystaticEnabled()
    ? handlers.POST(request)
    : Promise.resolve(notFoundResponse());
}
