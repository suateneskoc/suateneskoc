// Keep this module free of `server-only`: the Better Auth migration CLI imports
// the configuration directly when creating or updating the database schema.
import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";

import { env } from "@/env";
import { database } from "@/server/database/client";

import { isAdminEmail } from "./policy";

const googleCredentials =
  env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
    ? {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
      }
    : null;

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  account: {
    accountLinking: {
      enabled: true,
      requireLocalEmailVerified: false,
      trustedProviders: ["google"],
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (!isAdminEmail(user.email)) {
            throw new APIError("FORBIDDEN", {
              message: "Only the configured admin email can create an account.",
            });
          }

          return { data: user };
        },
      },
    },
  },
  database,
  emailAndPassword: {
    disableSignUp: true,
    enabled: true,
  },
  secret: env.BETTER_AUTH_SECRET,
  ...(googleCredentials
    ? { socialProviders: { google: googleCredentials } }
    : {}),
});
