import { BsGoogle } from "react-icons/bs";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export function LoginButton() {
  return (
    <Button onClick={() => signIn("google")}>
      <BsGoogle />
    </Button>
  );
}
