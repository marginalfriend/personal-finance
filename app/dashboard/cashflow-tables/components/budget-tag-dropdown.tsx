"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { unstable_noStore as noStore } from "next/cache";
import { BudgetPlanner } from "@prisma/client";
import { useEffect, useState } from "react";
import { fetchBudgetRow } from "../../budget-planner/actions";

export function BudgetTagDropdown({
  data,
  sendData,
  onOpenChange,
}: {
  data: string;
  sendData: Function;
  onOpenChange?: () => void;
}) {
  noStore();

  const [budgets, setBudgets] = useState<BudgetPlanner[]>();
  useEffect(() => {
    fetchBudgetRow().then((result) => {
      setBudgets(result);
    });
  }, [budgets, data]);

  const handleSelect = (e: string) => {
    if (budgets) {
      sendData(e);
    }
  };

  const foundBudget = budgets?.find((budget) => {
    budget.tag === data;
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-autos justify-start text-left font-normal",
            !data && "text-muted-foreground",
          )}
        >
          {foundBudget
            ? foundBudget.tag.charAt(0).toUpperCase() + foundBudget.tag.slice(1)
            : "+ Tag"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onCloseAutoFocus={onOpenChange}>
        {budgets ? (
          budgets.map((budget) => (
            <DropdownMenuItem
              key={budget.tag}
              onSelect={() => {
                handleSelect(budget.tag);
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  data === budget.tag ? "opacity-100" : "opacity-0",
                )}
              />
              {budget.tag}
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem>Loading...</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
