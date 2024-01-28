import { cashflowTable } from "../actions";
import { DataTable } from "../components/cashflow-data-table";
import { columns } from "../components/columns";
import { unstable_noStore as noStore } from "next/cache";

export default async function Page() {
  noStore();
  const data = await cashflowTable("in");

  return data && <DataTable columns={columns} data={data} />;
}
