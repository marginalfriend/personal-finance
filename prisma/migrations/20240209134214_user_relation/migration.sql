/*
  Warnings:

  - Added the required column `userId` to the `BudgetPlanner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BudgetPlanner" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "BudgetPlanner" ADD CONSTRAINT "BudgetPlanner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
