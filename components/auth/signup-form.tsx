"use client"

import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useActionState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signUp } from "@/lib/auth/actions"

export function SignupForm() {
  const [state, formAction, pending] = useActionState(signUp, {})

  if (state.success) {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-2 py-4 text-center"
      >
        <p className="rounded-lg bg-success/10 px-3 py-2.5 text-sm text-success">
          {state.success}
        </p>
        <p className="text-sm text-muted-foreground">
          Após confirmar, você poderá{" "}
          <Link
            href="/entrar"
            className="font-medium text-primary hover:underline"
          >
            entrar na sua conta
          </Link>
          .
        </p>
      </div>
    )
  }

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

      <div className="flex flex-col gap-1.5">
        <label htmlFor="signup-email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="signup-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="voce@exemplo.com"
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="signup-password" className="text-sm font-medium">
          Senha
        </label>
        <Input
          id="signup-password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
        />
        <p className="text-xs text-muted-foreground">
          Use pelo menos 8 caracteres.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="signup-confirm" className="text-sm font-medium">
          Confirmar senha
        </label>
        <Input
          id="signup-confirm"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
        />
      </div>

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? (
          <>
            <Loader2 className="animate-spin" />
            Criando conta...
          </>
        ) : (
          "Criar conta"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Já tem uma conta?{" "}
        <Link
          href="/entrar"
          className="font-medium text-primary hover:underline"
        >
          Entrar
        </Link>
      </p>
    </form>
  )
}
