import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

import { EssayEditor } from "@/features/essays/essay-editor"
import { UsageCard } from "@/features/dashboard/usage-card"
import { createClient } from "@/lib/supabase/server"
import { getUsage } from "@/lib/usage/usage-store"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Nova redação",
  description: "Escreva e envie sua redação para correção.",
}

export default async function NewEssayPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/entrar")
  }

  const usage = await getUsage(user.id)

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
      <div>
        <Button asChild variant="ghost" size="sm" className="-ml-2 text-muted-foreground">
          <Link href="/dashboard">
            <ArrowLeft className="size-4" />
            Voltar ao dashboard
          </Link>
        </Button>
        <div className="mt-4 flex flex-col gap-1">
          <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            Nova redação
          </h1>
          <p className="text-muted-foreground">
            Escreva sobre o tema e envie para correção.
          </p>
        </div>
      </div>
      <UsageCard used={usage.used} limit={usage.limit} resetsAt={usage.resetsAt} />
      <EssayEditor usage={usage} />
    </main>
  )
}
