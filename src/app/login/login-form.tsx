"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { authClient } from "@/auth/client";
import { getAuthErrorMessage } from "@/auth/errors";

type LoginFormProps = {
  googleEnabled: boolean;
};

export default function LoginForm({ googleEnabled }: LoginFormProps) {
  const router = useRouter();
  const { data: session, isPending: isSessionPending } =
    authClient.useSession();
  const [email, setEmail] = useState("");
  const [googleLinked, setGoogleLinked] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function runAuthAction(
    action: () => Promise<{
      error?: Parameters<typeof getAuthErrorMessage>[0] | null;
    }>,
    fallback: string,
  ) {
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await action();

      if (result.error) {
        setError(getAuthErrorMessage(result.error, fallback));
        return false;
      }

      return true;
    } catch {
      setError(fallback);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    if (!session || !googleEnabled) {
      return;
    }

    void authClient.listAccounts().then((result) => {
      if (cancelled) {
        return;
      }

      if (result.error) {
        setError(
          getAuthErrorMessage(result.error, "Could not load linked accounts."),
        );
        setGoogleLinked(null);
        return;
      }

      setGoogleLinked(
        result.data?.some((account) => account.providerId === "google") ??
          false,
      );
    });

    return () => {
      cancelled = true;
    };
  }, [googleEnabled, session]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const succeeded = await runAuthAction(
      () => authClient.signIn.email({ email, password }),
      "Authentication failed.",
    );

    if (succeeded) {
      router.replace("/keystatic");
      router.refresh();
    }
  }

  async function handleGoogleSignIn() {
    await runAuthAction(
      () =>
        authClient.signIn.social({
          callbackURL: "/keystatic",
          provider: "google",
        }),
      "Google sign-in failed.",
    );
  }

  async function handleGoogleLink() {
    await runAuthAction(
      () =>
        authClient.linkSocial({
          callbackURL: "/login",
          provider: "google",
        }),
      "Google linking failed.",
    );
  }

  async function handleSignOut() {
    const succeeded = await runAuthAction(
      () => authClient.signOut(),
      "Sign-out failed.",
    );

    if (!succeeded) {
      return;
    }

    router.refresh();
  }

  if (isSessionPending) {
    return <p>Checking your session…</p>;
  }

  if (session) {
    return (
      <section className="w-full space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">You are signed in</h1>
          <p className="text-gray-600">{session.user.email}</p>
        </div>
        <div className="flex gap-3">
          <Link
            className="rounded-md bg-black px-4 py-2 text-white"
            href="/keystatic"
          >
            Open Keystatic
          </Link>
          <button
            className="rounded-md border border-gray-300 px-4 py-2"
            disabled={isSubmitting}
            onClick={handleSignOut}
            type="button"
          >
            Sign out
          </button>
        </div>
        {googleEnabled && googleLinked === false ? (
          <button
            className="rounded-md border border-gray-300 px-4 py-2 disabled:opacity-50"
            disabled={isSubmitting}
            onClick={handleGoogleLink}
            type="button"
          >
            Connect Google
          </button>
        ) : null}
        {error ? <p className="text-red-600">{error}</p> : null}
      </section>
    );
  }

  return (
    <section className="w-full space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Sign in</h1>
        <p className="text-gray-600">Sign in to access Keystatic.</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block space-y-1">
          <span className="text-sm font-medium">Email</span>
          <input
            autoComplete="email"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            value={email}
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium">Password</span>
          <input
            autoComplete="current-password"
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            minLength={8}
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
        </label>
        <button
          className="w-full rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Working…" : "Sign in"}
        </button>
      </form>

      {googleEnabled ? (
        <button
          className="w-full rounded-md border border-gray-300 px-4 py-2 disabled:opacity-50"
          disabled={isSubmitting}
          onClick={handleGoogleSignIn}
          type="button"
        >
          Continue with Google
        </button>
      ) : null}

      {error ? <p className="text-red-600">{error}</p> : null}
    </section>
  );
}
