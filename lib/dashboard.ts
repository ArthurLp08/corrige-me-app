export type DashboardUsage = {
  used: number
  limit: number
  resetsAt: string
}

export type RecentEssay = {
  id: string
  theme: string
  score: number | null
  correctedAt: string
}

export type DashboardData = {
  usage: DashboardUsage
  lastScore: number | null
  averageScore: number | null
  bestScore: number | null
  evolution: number | null
  essays: RecentEssay[]
}

function getNextMonthLabel(): string {
  const now = new Date()
  const next = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  return next.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  })
}

export async function getDashboardData(): Promise<DashboardData> {
  return {
    usage: {
      used: 0,
      limit: 5,
      resetsAt: getNextMonthLabel(),
    },
    lastScore: null,
    averageScore: null,
    bestScore: null,
    evolution: null,
    essays: [],
  }
}
