/*
  Warnings:

  - The primary key for the `BudgetPlanner` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `BudgetPlanner` table. All the data in the column will be lost.
  - You are about to drop the column `budgetPlannerId` on the `Cashflow` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tag]` on the table `BudgetPlanner` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Cashflow" DROP CONSTRAINT "Cashflow_budgetPlannerId_fkey";

-- AlterTable
ALTER TABLE "BudgetPlanner" DROP CONSTRAINT "BudgetPlanner_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "Cashflow" DROP COLUMN "budgetPlannerId",
ADD COLUMN     "budgetPlannerTag" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "BudgetPlanner_tag_key" ON "BudgetPlanner"("tag");

-- AddForeignKey
ALTER TABLE "Cashflow" ADD CONSTRAINT "Cashflow_budgetPlannerTag_fkey" FOREIGN KEY ("budgetPlannerTag") REFERENCES "BudgetPlanner"("tag") ON DELETE SET NULL ON UPDATE CASCADE;
