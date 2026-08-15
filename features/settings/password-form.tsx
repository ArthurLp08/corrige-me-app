"use client"

import { Loader2 } from "lucide-react"
import { useActionState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { updateAccountPassword } from "@/lib/auth/actions"

export function PasswordForm() {
  const [state, formAction, pending] = useActionState(
    updateAccountPassword,
    {}
  )

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
      {state.success && (
        <p
          role="status"
          className="rounded-lg bg-success/10 px-3 py-2.5 text-sm text-success"
        >
          {state.success}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="settings-password" className="text-sm font-medium">
          Nova senha
        </label>
        <Input
          id="settings-password"
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
        <label htmlFor="settings-confirm-password" className="text-sm font-medium">
          Confirmar nova senha
        </label>
        <Input
          id="settings-confirm-password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
        />
      </div>

      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? (
          <>
            <Loader2 className="animate-spin" />
            Alterando senha...
          </>
        ) : (
          "Alterar senha"
        )}
      </Button>
    </form>
  )
}
