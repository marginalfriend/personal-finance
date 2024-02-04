import { createColumnHelper } from "@tanstack/react-table";

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
  }),

  columnHelper.accessor("basis", {
    header: () => {
      return <h1>Basis</h1>;
    },
  }),

  columnHelper.display({
    id: "remaining",
    header: () => {
      return <h1>Remaining</h1>;
    },
  }),
];
