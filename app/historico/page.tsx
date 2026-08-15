import type { Metadata } from "next"
import { ArrowLeft, History } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

import { EmptyState } from "@/components/common/empty-state"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HistoryList } from "@/features/history/history-list"
import { listCorrections } from "@/lib/corrections/correction-store"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Histórico",
  description: "Consulte suas correções anteriores.",
}

export default async function HistoryPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/entrar")
  }

  const corrections = await listCorrections(user.id)

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
            Histórico
          </h1>
          <p className="text-muted-foreground">
            Consulte suas correções anteriores.
          </p>
        </div>
      </div>

      {corrections.length === 0 ? (
        <Card>
          <CardContent>
            <EmptyState
              icon={<History className="size-5 text-muted-foreground" />}
              title="Nenhuma redação ainda"
              description="Quando você enviar uma redação, ela aparecerá aqui com a correção completa."
              action={
                <Button asChild>
                  <a href="/redacao/nova">Nova redação</a>
                </Button>
              }
            />
          </CardContent>
        </Card>
      ) : (
        <HistoryList corrections={corrections} />
      )}
    </main>
  )
}
