import { cashflowTable } from "../actions";
import { DataTable } from "../components/cashflow-data-table";
import { columns } from "../components/columns";

export default async function Page() {
  const data = await cashflowTable("in");

  return data && <DataTable columns={columns} data={data} />;
}
