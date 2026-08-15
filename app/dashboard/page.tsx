import type { Metadata } from "next"
import { Plus, Settings } from "lucide-react"
import { redirect } from "next/navigation"

import { LogoutButton } from "@/components/auth/logout-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CompetencyEvolution } from "@/features/dashboard/competency-evolution"
import { EvolutionChart } from "@/features/dashboard/evolution-chart"
import { RecentEssays } from "@/features/dashboard/recent-essays"
import { ScoreMetrics } from "@/features/dashboard/score-metrics"
import { UsageCard } from "@/features/dashboard/usage-card"
import { WelcomeHeader } from "@/features/dashboard/welcome-header"
import { getDashboardData } from "@/lib/dashboard"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Acompanhe seu desempenho nas redações do Corrige-Me.",
}

function getDisplayName(email?: string | null): string {
  if (!email) {
    return "estudante"
  }
  const local = email.split("@")[0]
  return local.charAt(0).toUpperCase() + local.slice(1)
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/entrar")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", user.id)
    .maybeSingle()

  const data = await getDashboardData(user.id)

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <WelcomeHeader
          userName={profile?.display_name || getDisplayName(user.email)}
        />
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="icon" aria-label="Configurações">
            <a href="/configuracoes">
              <Settings />
            </a>
          </Button>
          <LogoutButton />
          <Button asChild>
            <a href="/redacao/nova">
              <Plus />
              Nova redação
            </a>
          </Button>
        </div>
      </div>

      <UsageCard
        used={data.usage.used}
        limit={data.usage.limit}
        resetsAt={data.usage.resetsAt}
      />

      <ScoreMetrics
        lastScore={data.lastScore}
        averageScore={data.averageScore}
        bestScore={data.bestScore}
        evolution={data.evolution}
      />

      {data.evolutionPoints.length >= 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Evolução da nota</CardTitle>
          </CardHeader>
          <CardContent>
            <EvolutionChart points={data.evolutionPoints} />
          </CardContent>
        </Card>
      )}

      {data.competencyEvolution && (
        <CompetencyEvolution items={data.competencyEvolution} />
      )}

      <RecentEssays essays={data.essays} />
    </main>
  )
}
