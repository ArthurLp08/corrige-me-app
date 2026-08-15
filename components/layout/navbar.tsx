"use client"

import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { BrandLogo } from "@/components/common/brand-logo"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#demonstracao", label: "Demonstração" },
  { href: "#beneficios", label: "Benefícios" },
]

const focusRing = "rounded-md focus-visible:ring-2 focus-visible:ring-ring/50"

type NavbarProps = {
  isAuthenticated: boolean
}

export function Navbar({ isAuthenticated }: NavbarProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav
        className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6"
        aria-label="Navegação principal"
      >
        <Link
          href={isAuthenticated ? "/dashboard" : "/"}
          className="flex items-center gap-2 rounded-lg font-heading text-base font-semibold tracking-tight focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <BrandLogo className="size-8 rounded-lg" />
          Corrige-Me
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium text-muted-foreground transition-colors hover:text-foreground ${focusRing}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button asChild>
                <Link href="/redacao/nova">Nova redação</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/entrar">Entrar</Link>
              </Button>
              <Button asChild>
                <Link href="/cadastro">Começar agora</Link>
              </Button>
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </nav>

      {open && (
        <div className="border-t border-border/60 bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${focusRing}`}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard" onClick={() => setOpen(false)}>
                      Dashboard
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href="/redacao/nova" onClick={() => setOpen(false)}>
                      Nova redação
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link href="/entrar" onClick={() => setOpen(false)}>
                      Entrar
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href="/cadastro" onClick={() => setOpen(false)}>
                      Começar agora
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
