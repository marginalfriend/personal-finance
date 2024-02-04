import { createColumnHelper } from "@tanstack/react-table";
import { currencyFormatter } from "../../components/balance";

export type BudgetPlanner = {
  id: string;
  tag: string;
  amount: number;
  basis: string;
};

const columnHelper = createColumnHelper<BudgetPlanner>();

export const columns = [
  columnHelper.accessor("tag", {
    header: () => {
      return <h1>Budget Tag</h1>;
    },
  }),

  columnHelper.accessor("amount", {
    header: () => {
      return <h1>Amount</h1>;
    },
    cell: ({ row }) => {
      return currencyFormatter(row.getValue("amount"));
    },
  }),

  columnHelper.display({
    id: "remaining",
    header: () => {
      return <h1>Remaining</h1>;
    },
  }),

  columnHelper.accessor("basis", {
    header: () => {
      return <h1>Basis</h1>;
    },
  }),
];
