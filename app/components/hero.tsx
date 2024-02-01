import { LoginButton } from "@/components/login-button";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="grid grid-cols-1 h-[100vh] sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
      <div className="col-span-1 p-8 align-middle justify-center m-auto">
        <h1
          className="align-middle text-5xl font-bold mb-4 text-gray
        dark:text-white"
        >
          Selffin: A tool to Forge a Prosperous Financial Future
        </h1>
        <div className="flex flex-row gap-4 max-w-min">
          <LoginButton provider="google" />
          <LoginButton provider="github" />
        </div>
      </div>
      <div className="col-span-1 relative h-full">
        <Image
          src={
            "https://www.worldhistory.org/uploads/images/6123.jpg?v=1706169006"
          }
          alt="tower of babel"
          fill
          objectFit="cover"
        />
      </div>
    </section>
  );
}
