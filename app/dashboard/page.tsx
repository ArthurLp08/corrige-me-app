import type { Metadata } from "next"
import { Plus } from "lucide-react"
import { redirect } from "next/navigation"

import { LogoutButton } from "@/components/auth/logout-button"
import { Button } from "@/components/ui/button"
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

  const data = await getDashboardData()

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <WelcomeHeader userName={getDisplayName(user.email)} />
        <div className="flex items-center gap-2">
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

      <RecentEssays essays={data.essays} />
    </main>
  )
}
