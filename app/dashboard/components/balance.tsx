import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { unstable_noStore as noStore } from "next/cache";

interface Calculated {
  data: any;
  className?: string;
}

export async function Calculated({ data, className }: Calculated) {
  noStore();

  return (
    <Card className="flex flex-col align-middle">
      <CardHeader className="flex flex-row items-center justify-between pb-0 pt-4 space-y-0">
        <CardTitle className="text-md font-medium">{data.title}</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent className="pb-4">
        <p className={cn(data.className, "text-xl font-black")}>
          {currencyFormatter(data.value)}
        </p>
        <p className="text-xs text-muted-foreground">{data.info}</p>
      </CardContent>
    </Card>
  );
}

export const currencyFormatter = (value: number) => {
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);

  return formatted;
};
