"use client"

import { Loader2, LogOut } from "lucide-react"
import { useTransition } from "react"

import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/auth/actions"

export function LogoutButton() {
  const [pending, startTransition] = useTransition()

  return (
    <Button
      variant="outline"
      disabled={pending}
      onClick={() => startTransition(() => signOut())}
    >
      {pending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <LogOut />
      )}
      {pending ? "Saindo..." : "Sair"}
    </Button>
  )
}
