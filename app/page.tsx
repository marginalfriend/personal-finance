import { CashInTable } from "@/components/ui/tables/cash-in"
import { CashOutTable } from "@/components/ui/tables/cash-out"

export default function Home() {
  return (
    <main>
      <h1>Personal Finance</h1>

      <section className="col col-span-2 flex gap-8">
        <CashInTable />
        <CashOutTable />
      </section>
    </main>
  )
}
