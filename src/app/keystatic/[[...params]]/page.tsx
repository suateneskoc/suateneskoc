import { notFound } from "next/navigation";

import { isKeystaticEnabled } from "@/server/keystatic/access";

import KeystaticApp from "../keystatic";

export default function KeystaticPage() {
  if (!isKeystaticEnabled()) {
    notFound();
  }

  return <KeystaticApp />;
}
