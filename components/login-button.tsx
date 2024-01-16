import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export function LoginButton() {
  const { data: session } = useSession();

  if (session?.user) {
    return <Button onClick={() => signOut()}>Logout</Button>;
  }

  return <Button onClick={() => signIn()}>Login</Button>;
}
