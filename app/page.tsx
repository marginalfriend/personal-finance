import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";

const session = await auth();
export default function Page() {
  if (session) {
    redirect("/dashboard");
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
        <Link href={"/api/auth/signin"}>
          <Button>Get Started</Button>
        </Link>
      </div>
    </main>
  );
}
