import { env } from "@/env";

export function isAdminEmail(email: string) {
  return email.toLowerCase() === env.ADMIN_EMAIL.toLowerCase();
}
