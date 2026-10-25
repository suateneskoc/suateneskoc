import "server-only";

import { headers } from "next/headers";

import { isNonProductionEnvironment } from "@/server/environment";

import { auth } from "./auth";
import { isAdminEmail } from "./policy";

export function isAuthEnabled() {
  return isNonProductionEnvironment();
}

export async function isAdminRequest(requestHeaders?: Headers) {
  const session = await auth.api.getSession({
    headers: requestHeaders ?? (await headers()),
  });

  return session ? isAdminEmail(session.user.email) : false;
}
