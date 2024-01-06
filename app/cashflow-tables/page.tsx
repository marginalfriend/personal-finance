'use client'

import {
  CashInTable,
  CashOutTable,
} from "@/app/cashflow-tables/components/cash-flow-table";
import { useFetch } from "./data";

export default function Home() {
  const { data: cashflow, isPending, isError } = useFetch('http://localhost:8000/cashflow')

  return (
    <main>
      <h1>Cashflow Tables</h1>

        { isError && <h1>Failed loading table</h1> }
        { isPending && <h1>Loading table</h1> }
        { cashflow && 
          <section className="col col-span-2 flex gap-8">
            <CashInTable cashflows={cashflow}/>
            <CashOutTable cashflows={cashflow}/>
          </section>
        }
    </main>
  );
}
