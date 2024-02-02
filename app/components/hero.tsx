import { LoginButton } from "@/components/login-button";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="flex flex-col h-[90vh] w-full justify-center m-0 p-0 sm:grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
      <article className="col-span-1 p-8 align-middle justify-center my-auto mx-0">
        <h1
          className="align-middle text-5xl font-bold text-gray
        dark:text-white mb-6"
        >
          Selffin: A Tool to Forge a Prosperous Financial Future
        </h1>
        <article className="flex flex-col min-w-full lg:flex-row gap-4 max-w-min">
          <LoginButton provider="google" />
          <LoginButton provider="github" />
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
    </section>
  );
}
