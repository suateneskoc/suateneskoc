import { toNextJsHandler } from "better-auth/next-js";

import { isAuthEnabled } from "@/server/auth/access";
import { auth } from "@/server/auth/auth";

const handlers = toNextJsHandler(auth);

function notFoundResponse() {
  return new Response(null, { status: 404 });
}

export async function GET(request: Request) {
  return isAuthEnabled() ? handlers.GET(request) : notFoundResponse();
}

export async function POST(request: Request) {
  return isAuthEnabled() ? handlers.POST(request) : notFoundResponse();
}
