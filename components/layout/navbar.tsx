"use client"

import { Menu, PenLine, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#demonstracao", label: "Demonstração" },
  { href: "#beneficios", label: "Benefícios" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav
        className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6"
        aria-label="Navegação principal"
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-base font-semibold tracking-tight"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <PenLine className="size-4" />
          </span>
          Corrige-Me
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" asChild>
            <a href="#comecar">Entrar</a>
          </Button>
          <Button asChild>
            <a href="#comecar">Começar agora</a>
          </Button>
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
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Button variant="outline" asChild>
                <a href="#comecar" onClick={() => setOpen(false)}>
                  Entrar
                </a>
              </Button>
              <Button asChild>
                <a href="#comecar" onClick={() => setOpen(false)}>
                  Começar agora
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
