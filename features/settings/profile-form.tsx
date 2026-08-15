"use client"

import { Loader2 } from "lucide-react"
import { useActionState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { updateProfileName } from "@/lib/auth/actions"

type ProfileFormProps = {
  displayName: string
  email: string
}

export function ProfileForm({ displayName, email }: ProfileFormProps) {
  const [state, formAction, pending] = useActionState(updateProfileName, {})

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="settings-email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="settings-email"
          value={email}
          readOnly
          aria-describedby="settings-email-help"
        />
        <p id="settings-email-help" className="text-xs text-muted-foreground">
          O email da conta não pode ser alterado.
        </p>
      </div>

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
          <label htmlFor="settings-name" className="text-sm font-medium">
            Nome
          </label>
          <Input
            id="settings-name"
            name="displayName"
            type="text"
            defaultValue={displayName}
            autoComplete="name"
            maxLength={60}
            required
          />
        </div>

        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
          {pending ? (
            <>
              <Loader2 className="animate-spin" />
              Salvando...
            </>
          ) : (
            "Salvar alterações"
          )}
        </Button>
      </form>
    </div>
  )
}
