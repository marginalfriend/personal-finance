"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-switch";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: JSX.Element;
  }[];
}

export function SidebarNav({ className, items }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden sticky top-0 md:flex flex-col justify-between h-[100vh] w-[20%] gap-4 border-r p-3">
      <div>
        <ModeToggle className="w-[2.5em] h-[2.5em] ml-3" />
        <nav>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.href
                  ? "bg-muted hover:bg-muted"
                  : "hover:bg-transparent hover:underline",
                "justify-between w-full",
                className,
              )}
            >
              {item.title}
              {item.icon}
            </Link>
          ))}
        </nav>
      </div>
      <LogOutButton />
    </aside>
  );
}

export function LogOutButton() {
  return (
    <Button
      className="flex flex-ro justify-between"
      variant={"ghost"}
      onClick={() => signOut()}
    >
      <pre className="sr-only">Logout / Signout Button</pre>
      <LogOut className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
}
