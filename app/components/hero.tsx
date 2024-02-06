import { auth } from "@/auth";
import { LoginButton } from "@/components/login-button";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "./section";

export default function Hero({ name }: { name?: string | undefined | null }) {
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
          {name ? (
            <>
              <h1 className="text-2xl">Hello {name}!</h1>
              <Link href={"/dashboard"}>
                <Button>Go to dashboard?</Button>
              </Link>
            </>
          ) : (
            <>
              <LoginButton provider="google" />
              <LoginButton provider="github" />
            </>
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
