import { notFound } from "next/navigation";

import { env } from "@/env";
import { isAuthEnabled } from "@/server/auth/access";

import LoginForm from "./login-form";

export default function LoginPage() {
  if (!isAuthEnabled()) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6 py-12">
      <LoginForm
        googleEnabled={Boolean(
          env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET,
        )}
      />
    </main>
  );
}
