"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-switch";

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
    <aside className="hidden md:flex flex-col w-[20%] gap-4">
      <ModeToggle className="w-[2.5em] h-[2.5em]" />
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
    </aside>
  );
}
