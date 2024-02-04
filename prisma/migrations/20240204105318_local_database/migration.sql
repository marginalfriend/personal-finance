-- AlterTable
ALTER TABLE "Cashflow" ADD COLUMN     "budgetPlannerId" TEXT,
ALTER COLUMN "value" SET DATA TYPE BIGINT;

-- CreateTable
CREATE TABLE "BudgetPlanner" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "basis" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "BudgetPlanner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cashflow" ADD CONSTRAINT "Cashflow_budgetPlannerId_fkey" FOREIGN KEY ("budgetPlannerId") REFERENCES "BudgetPlanner"("id") ON DELETE SET NULL ON UPDATE CASCADE;
