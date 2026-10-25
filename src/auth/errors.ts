type AuthError = {
  code?: string | undefined;
};

const errorMessages: Record<string, string> = {
  ACCOUNT_NOT_LINKED:
    "Sign in with your existing method first, then connect Google from your account.",
  FORBIDDEN: "You are not authorized to perform this action.",
  INVALID_EMAIL_OR_PASSWORD: "The email or password is incorrect.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  USER_ALREADY_EXISTS: "An account with this email already exists.",
};

export function getAuthErrorMessage(
  error: AuthError | null | undefined,
  fallback: string,
) {
  return (error?.code && errorMessages[error.code]) || fallback;
}
