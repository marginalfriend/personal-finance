import Link from "next/link";
import { Button } from "./ui/button";
import { auth, authConfig } from "@/auth";
import { signIn, signOut, useSession } from "next-auth/react";


export function LoginButton() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <Button onClick={() => signOut()}>Logout</Button>
    )
  };

  return (
    <Link href={'/api/auth/signin'}>
      <Button>Login</Button>
    </Link>
  )
}