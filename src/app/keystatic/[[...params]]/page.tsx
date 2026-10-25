import { Suspense } from "react";
import { notFound } from "next/navigation";

import { isAdminRequest } from "@/server/auth/access";
import { isNonProductionEnvironment } from "@/server/environment";

import KeystaticApp from "../keystatic";

export default function KeystaticPage() {
  if (!isNonProductionEnvironment()) {
    notFound();
  }

  return (
    <Suspense>
      <ProtectedKeystatic />
    </Suspense>
  );
}

async function ProtectedKeystatic() {
  if (!(await isAdminRequest())) {
    notFound();
  }

  return <KeystaticApp />;
}
