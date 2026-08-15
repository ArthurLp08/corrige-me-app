"use client"

import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useActionState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { resetPasswordForEmail } from "@/lib/auth/actions"

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(resetPasswordForEmail, {})

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
          Voltar para{" "}
          <Link
            href="/entrar"
            className="font-medium text-primary hover:underline"
          >
            entrar
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
        <label htmlFor="forgot-email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="forgot-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="voce@exemplo.com"
          required
        />
      </div>

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? (
          <>
            <Loader2 className="animate-spin" />
            Enviando link...
          </>
        ) : (
          "Enviar link de recuperação"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Lembrou a senha?{" "}
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
