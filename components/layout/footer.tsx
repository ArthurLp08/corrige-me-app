import { PenLine } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-base font-semibold tracking-tight"
          >
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <PenLine className="size-4" />
            </span>
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
