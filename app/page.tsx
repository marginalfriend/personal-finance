import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import { LoginButton } from "@/components/login-button";

export default async function Page() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }
  return (
    <main className="h-[60vh] items-center">
      <div className="flex flex-col gap-4 items-center align-center justify-center h-[100%]">
        <h1
          className="text-5xl font-bold mb-4 text-gray
        dark:text-white"
        >
          Simply manage your personal finance.
        </h1>
        <div className="flex flex-col gap-2">
          <LoginButton provider="google" />
          <LoginButton provider="github" />
        </div>
      </div>
    </main>
  );
}
