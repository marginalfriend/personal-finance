"use client";

import * as React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { BsLayoutSidebar } from "react-icons/bs";
import { ModeToggle } from "@/components/theme-switch";
import { LogOutButton } from "./sidenav";

export function MobileNav({ items }: { items: any[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <BsLayoutSidebar />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col align-center justify-between"
      >
        <div>
          <ModeToggle className="w-[2.5em] h-[2.5em]" />
          {items.map((item) => (
            <MobileLink
              key={item.href}
              href={item.href}
              onOpenChange={setOpen}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.href
                  ? "bg-muted hover:bg-muted"
                  : "hover:bg-transparent hover:underline",
                "justify-between w-full",
              )}
            >
              {item.title}
              {item.icon}
            </MobileLink>
          ))}
        </div>
        <LogOutButton />
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
