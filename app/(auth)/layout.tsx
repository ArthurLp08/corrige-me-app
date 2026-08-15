import { PenLine } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="flex w-full max-w-sm flex-col gap-8">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 font-heading text-lg font-semibold tracking-tight"
        >
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <PenLine className="size-5" />
          </span>
          Corrige-Me
        </Link>
        {children}
      </div>
    </main>
  )
}
