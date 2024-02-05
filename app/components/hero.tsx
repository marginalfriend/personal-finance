import { auth } from "@/auth";
import { LoginButton } from "@/components/login-button";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "./section";

export default async function Hero() {
  const session = await auth();

  return (
    <Section>
      <article className="col-span-1 p-8 align-middle justify-center my-auto mx-0">
        <h1
          className="align-middle text-6xl font-bold text-gray
        dark:text-white mb-6"
        >
          Selffin: A Tool to Forge a Prosperous Financial Future
        </h1>
        <article className="flex flex-col min-w-full lg:flex-row gap-4 max-w-min">
          {/* <LoginButton provider="google" /> */}
          {session ? (
            <>
              <h2 className="text-3xl">Hello {session.user.name}!</h2>
              <Link href={"/dashboard"}>
                <Button>Go to dashboard</Button>
              </Link>
            </>
          ) : (
            <LoginButton provider="github" />
          )}
        </article>
      </article>
      <article className="col-span-1 relative h-full">
        <Image
          src={
            "https://www.worldhistory.org/uploads/images/6123.jpg?v=1706169006"
          }
          alt="tower of babel"
          fill
          objectFit="cover"
        />
      </article>
    </Section>
  );
}
