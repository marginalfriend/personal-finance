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

export function Calculated({ data, className }: Calculated) {
  noStore();

  return (
    <Card
      className={cn(
        "flex flex-col align-middle border-0 ",
        data.className,
        className,
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-0 pt-4 space-y-0">
        <CardTitle className="text-sm font-medium">{data.title}</CardTitle>
        {/* <svg
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
        </svg> */}
      </CardHeader>
      <CardContent className="pb-4">
        <p className={cn(data.text, " text-lg font-bold")}>
          {currencyFormatter(data.value)}
        </p>
        {data.info && data.info !== Infinity && data.info !== -Infinity ? (
          data.info > 0 ? (
            data.href === "/expenses" ? (
              <p className="text-xs text-muted-foreground">
                Increased{" "}
                <span className="text-rose-500">{data.info + "%"}</span> from last month
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Increased{" "}
                <span className="text-lime-500">{data.info + "%"}</span> from last month
              </p>
            )
          ) : data.href === "/expenses" ? (
            <p className="text-xs text-muted-foreground">
              Increased <span className="text-lime-500">{data.info + "%"}</span> from last month
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Increased <span className="text-rose-500">{data.info + "%"}</span> from last month
            </p>
          )
        ) : (
          <p className="text-xs text-muted-foreground">
            No information available yet...
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export const currencyFormatter = (value: number) => {
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

  return formatted;
};
