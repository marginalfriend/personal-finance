import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "flex flex-col h-[90vh] w-full justify-center m-0 p-0 sm:grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2",
        className,
      )}
    >
      {children}
    </section>
  );
}
