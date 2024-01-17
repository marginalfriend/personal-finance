"use client";

import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export function LoginButton() {
  const session = useSession();

  if (session) {
    return <Button onClick={() => signOut()}>Logout</Button>;
  }

  return <Button onClick={() => signIn()}>Login</Button>;
}
