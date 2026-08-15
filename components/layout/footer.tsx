import Link from "next/link"

import { BrandLogo } from "@/components/common/brand-logo"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="flex w-fit items-center gap-2 rounded-lg font-heading text-base font-semibold tracking-tight focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <BrandLogo className="size-7 rounded-lg" />
            Corrige-Me
          </Link>
          <p className="max-w-sm text-sm text-muted-foreground">
            Correção de redações do ENEM com inteligência artificial.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          © {year} Corrige-Me. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
