import Link from "next/link"
import type { ReactNode } from "react"

import { BrandLogo } from "@/components/common/brand-logo"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="flex w-full max-w-sm flex-col gap-8">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 font-heading text-lg font-semibold tracking-tight"
        >
          <BrandLogo className="size-9 rounded-lg" />
          Corrige-Me
        </Link>
        {children}
      </div>
    </main>
  )
}
