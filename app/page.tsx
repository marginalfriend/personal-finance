import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";

export default async function Page() {
  const session = await auth();

  if (session) {
    redirect("/cashflow-tables");
  }
  return (
    <main className="h-[60vh] items-center">
      <div className="flex flex-col gap-4 items-center justify-center h-[100%]">
        <h1
          className="text-5xl font-bold mb-4 text-gray
        dark:text-white"
        >
          Simply manage your personal finance.
        </h1>
        <Link href={"/cashflow-tables"}>
          <Button>Get Started</Button>
        </Link>
      </div>
    </main>
  );
}
