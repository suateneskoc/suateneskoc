import { makeRouteHandler } from "@keystatic/next/route-handler";

import { isAdminRequest } from "@/server/auth/access";
import { isNonProductionEnvironment } from "@/server/environment";

import config from "../../../../../keystatic.config";

const handlers = makeRouteHandler({ config });

function notFoundResponse() {
  return new Response(null, { status: 404 });
}

async function isAuthorized(request: Request) {
  return (
    isNonProductionEnvironment() && (await isAdminRequest(request.headers))
  );
}

export async function GET(request: Request) {
  return (await isAuthorized(request))
    ? handlers.GET(request)
    : notFoundResponse();
}

export async function POST(request: Request) {
  return (await isAuthorized(request))
    ? handlers.POST(request)
    : notFoundResponse();
}
