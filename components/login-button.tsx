"use client";

import { BsGithub, BsGoogle } from "react-icons/bs";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export function LoginButton({ provider }: { provider: string }) {
  return (
    <Button
      variant={"secondary"}
      onClick={() => signIn(provider)}
      className="flex flex-row justify-between gap-5"
    >
      {provider === "google" ? (
        <>
          Continue with Google <BsGoogle />
        </>
      ) : (
        <>
          Continue with Github <BsGithub />
        </>
      )}
    </Button>
  );
}
