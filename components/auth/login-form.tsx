"use client"

import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useActionState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signIn } from "@/lib/auth/actions"

type LoginFormProps = {
  next?: string
}

export function LoginForm({ next }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(signIn, {})

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.error && (
        <p
          role="alert"
          className="rounded-lg bg-destructive/10 px-3 py-2.5 text-sm text-destructive"
        >
          {state.error}
        </p>
      )}
      <input type="hidden" name="next" value={next ?? "/dashboard"} />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="login-email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="voce@exemplo.com"
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="login-password" className="text-sm font-medium">
            Senha
          </label>
          <Link
            href="/recuperar-senha"
            className="text-xs font-medium text-primary hover:underline"
          >
            Esqueceu a senha?
          </Link>
        </div>
        <Input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? (
          <>
            <Loader2 className="animate-spin" />
            Entrando...
          </>
        ) : (
          "Entrar"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Ainda não tem conta?{" "}
        <Link
          href="/cadastro"
          className="font-medium text-primary hover:underline"
        >
          Criar conta
        </Link>
      </p>
    </form>
  )
}
