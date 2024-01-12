import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="h-[60vh] items-center">
      <div className="flex flex-col items-center justify-center h-[100%]">
        <h1 className="text-5xl font-bold mb-4 text-gray
        dark:text-white">Simply manage your personal finance.
        </h1>
        <Button>Get Started</Button>
      </div>
    </main>
  )
}