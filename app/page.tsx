import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import { LoginButton } from "@/components/login-button";
import Hero from "./components/hero";

export default async function Page() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }
  return (
    <main className="p-0 m-0">
      <Hero />
    </main>
  );
}
